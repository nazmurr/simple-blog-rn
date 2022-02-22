import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Pressable, FlatList, Center, VStack, Spinner } from "native-base";
import Card from "./Card";

const getExcerpt = (str) => {
  if (str.length > 100) {
    str = str.substring(0, 100) + "...";
  }
  return str;
};

const PostList = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPosts = async (isPullRefresh = false) => {
    try {
      setIsRefreshing(isPullRefresh ? true : false);
      const response = await fetch(
        "https://simple-blog-rn-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
      );
      setIsRefreshing(false);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      setPosts(resData);
    } catch (err) {
      setIsRefreshing(false);
      // send to custom analytics server
      throw err;
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPosts();
      //return () => unsubscribe();
    }, [])
  );

  if (!posts.length) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="indigo.500" />
      </Center>
    );
  }

  return (
    <FlatList
      data={posts}
      onRefresh={() => getPosts(true)}
      refreshing={isRefreshing}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => navigation.navigate("Post", { postId: index })}>
          {({ isPressed }) => {
            return (
              <Center>
                <Card
                  title={item.title}
                  subtitle={item.subtitle}
                  description={getExcerpt(item.description)}
                  imageUri={item.imageUri}
                  imageCaption={item.imageCaption}
                  createdAt={item.createdAt}
                  isPressed={isPressed}
                />
              </Center>
            );
          }}
        </Pressable>
      )}
    />
  );
};

export default PostList;
