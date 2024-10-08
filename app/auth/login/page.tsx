import React from "react";
import LoginForm from "../LoginForm";
import { Flex, Text } from "@radix-ui/themes";

const LoginPage = () => {
  return (
    <Flex direction={"column"} gap={"3"} align={"center"}>
      <div style={{ width: "20rem" }}>
        <LoginForm />
      </div>
    </Flex>
  );
};

export default LoginPage;
