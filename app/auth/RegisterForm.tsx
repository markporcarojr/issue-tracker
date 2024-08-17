// components/RegisterForm.tsx
"use client";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userSchema } from "../validationSchemas";
import { Button, Callout, Card, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import { z } from "zod";
import { ErrorMessage } from "../components";
import { IoIosKey } from "react-icons/io";
import { CiMail } from "react-icons/ci";

type RegisterFormData = z.infer<typeof userSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/auth/register", data);
      router.push("/");
      // Use this to refresh page after adding new data
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error has occurred.");
    }
  });

  return (
    <>
      <div className="max-w-xl ">
        {error && (
          <Callout.Root color="crimson" className="mb-3">
            <Callout.Icon>
              <FaInfoCircle />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Card size="3">
          <form className="space-y-3" onSubmit={onSubmit}>
            <TextField.Root
              placeholder="Email"
              {...register("email", { required: true })}
            >
              <TextField.Slot>
                <CiMail />
              </TextField.Slot>
            </TextField.Root>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            <TextField.Root
              type="password"
              placeholder="Password "
              {...register("password", { required: true })}
            >
              <TextField.Slot>
                <IoIosKey />
              </TextField.Slot>
            </TextField.Root>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            <TextField.Root
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
            >
              {" "}
              <TextField.Slot>
                <IoIosKey />
              </TextField.Slot>
            </TextField.Root>
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            <Flex direction="column" gap="3" align="center">
              <Button disabled={isSubmitting}>
                Submit {isSubmitting && <Spinner />}
              </Button>
            </Flex>
          </form>
        </Card>
      </div>
    </>
  );
};

export default RegisterForm;
