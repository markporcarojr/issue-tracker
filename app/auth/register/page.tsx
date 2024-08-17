import React from "react";
import RegisterForm from "../RegisterForm";
import { Flex, Text } from "@radix-ui/themes";

const RegisterPage = () => {
  return (
    <>
      <Flex direction="column" align="center" gap="3">
        <div style={{ width: "20rem" }}>
          <RegisterForm />
        </div>
      </Flex>
    </>
  );
};

export default RegisterPage;
