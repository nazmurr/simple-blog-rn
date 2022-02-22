import React, { useState } from "react";
import { Center, KeyboardAvoidingView, Button } from "native-base";
import InputField from "../components/InputField";
import { Platform, Alert } from "react-native";

const ContactScreen = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const isInvalidInput = (
    fieldName,
    fieldValue,
    validationType = "",
    returnType = "bool"
  ) => {
    let isInvalid = false;
    let errorMessage = "";
    if (fieldValue === "") {
      isInvalid = true;
      errorMessage = `${fieldName} is required`;
    }
    if (validationType === "email" && fieldValue) {
      const regexp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
      if (!regexp.test(fieldValue)) {
        isInvalid = true;
        errorMessage = "Invalid email";
      }
    }

    if (returnType === "string") {
      return errorMessage;
    }

    return isInvalid;
  };

  const isFormValid = () => {
    return (
      !name ||
      isInvalidInput("Name", name) ||
      !email ||
      isInvalidInput("Email", email, "email") ||
      !message ||
      isInvalidInput("Message", message)
    );
  };

  const handleContactFormSubmit = async () => {
    try {
      setIsFormSubmitting(true);
      const response = await fetch(
        `https://simple-blog-rn-default-rtdb.asia-southeast1.firebasedatabase.app/contact_submissions.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // const resData = await response.json();
      setIsFormSubmitting(false);
      setName(null);
      setEmail(null);
      setMessage(null);
      Alert.alert("Success", "Contact form submitted successfully!", [
        { text: "OK" },
      ]);
    } catch (error) {
      setIsFormSubmitting(false);
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center px="4">
        <InputField
          label="Your Name"
          title="Name"
          onTextChange={setName}
          value={name}
          isInvalid={isInvalidInput("Name", name)}
          errorMessage={isInvalidInput("Name", name, "", "string")}
        />
        <InputField
          label="Your Email"
          title="Email"
          onTextChange={setEmail}
          value={email}
          isInvalid={isInvalidInput("Email", email, "email")}
          errorMessage={isInvalidInput("Email", email, "email", "string")}
        />
        <InputField
          label="Your Message"
          title="Message"
          inputType="textarea"
          onTextChange={setMessage}
          value={message}
          isInvalid={isInvalidInput("Message", message)}
          errorMessage={isInvalidInput("Message", message, "", "string")}
        />
        <Button
          px="4"
          w="100%"
          mt={4}
          isLoading={isFormSubmitting}
          isDisabled={isFormValid()}
          onPress={handleContactFormSubmit}
          bgColor="violet.500"
          _pressed={{
            bgColor: "violet.300",
          }}
        >
          Submit
        </Button>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default ContactScreen;
