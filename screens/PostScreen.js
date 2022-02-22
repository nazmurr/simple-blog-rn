import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  Image,
  AspectRatio,
  Stack,
  Heading,
  ScrollView,
  Spinner,
  Center
} from "native-base";

const PostScreen = (props) => {
  const postId = props.route.params.postId;
  const [post, setPost] = useState(null);
  const getPost = async () => {
    try {
      const response = await fetch(
        `https://simple-blog-rn-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${postId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      setPost(resData);
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPost();
      //return () => unsubscribe();
    }, [])
  );

  if (post === null) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="indigo.500" />
      </Center>
    );
  }

  return (
    <ScrollView>
      <AspectRatio w="100%" ratio={21 / 9}>
        <Image
          source={{
            uri: post.imageUri,
            // uri: imageUri,
          }}
          alt="image"
        />
      </AspectRatio>
      <Stack p="4" space={2}>
        <Heading size="lg">{post.title}</Heading>
        <Text
          fontSize="xs"
          _light={{
            color: "violet.500",
          }}
          _dark={{
            color: "violet.400",
          }}
          fontWeight="500"
        >
          {post.createdAt}
        </Text>
        <Text mt="4" fontWeight="400" fontSize="md">
          {post.description}
        </Text>
      </Stack>
    </ScrollView>
  );
};

export default PostScreen;
