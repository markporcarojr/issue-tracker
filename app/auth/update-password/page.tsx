import { Flex } from "@radix-ui/themes";
import UpdatePasswordForm from "../UpdatePasswordForm";
import React from "react";

const ChangePasswordPage = () => {
  return (
    <>
      <Flex direction={"column"} align={"center"}>
        <h1 className="text-center m-5">Update Password</h1>
        <UpdatePasswordForm />
      </Flex>
    </>
  );
};

export default ChangePasswordPage;
