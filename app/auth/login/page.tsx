import { Flex } from "@radix-ui/themes";
import LoginForm from "../LoginForm";

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
