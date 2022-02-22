import React from "react";
import {
  FormControl,
  Input,
  TextArea,
  Stack,
  Text,
  Divider,
  Box,
  WarningOutlineIcon,
  Center,
  NativeBaseProvider,
  KeyboardAvoidingView,
} from "native-base";

const InputField = ({
  label,
  title,
  value,
  isInvalid,
  errorMessage,
  inputType,
  onTextChange,
}) => {
  return (
    <Stack
      //px="4"
      mt="4"
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <Box>
        <FormControl isInvalid={isInvalid}>
          <FormControl.Label>{label}</FormControl.Label>
          {inputType === "textarea" ? (
            <TextArea
              placeholder={title}
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onTextChange}
              _focus={{
                borderColor: "violet.500",
              }}
            />
          ) : (
            <Input
              placeholder={title}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onTextChange}
              value={value}
              _focus={{
                borderColor: "violet.500",
              }}
            />
          )}

          {isInvalid && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errorMessage}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      </Box>
    </Stack>
  );
};

export default InputField;
