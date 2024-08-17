import { Flex } from "@radix-ui/themes";
import UpdatePasswordForm from "../UpdatePasswordForm";

const ChangePasswordPage = () => {
  return (
    <>
      <Flex direction={"column"} align={"center"}>
        <div style={{ width: "20rem" }}>
          <UpdatePasswordForm />
        </div>
      </Flex>
    </>
  );
};

export default ChangePasswordPage;
