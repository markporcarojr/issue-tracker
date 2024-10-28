import { Flex } from "@radix-ui/themes";
import RegisterForm from "../RegisterForm";

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
