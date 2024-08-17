// components/RegisterForm.tsx
"use client";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userSchema } from "../validationSchemas";
import { Button, Callout, Card, Flex, TextField, Text } from "@radix-ui/themes";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import { z } from "zod";
import { ErrorMessage } from "../components";
import { IoIosKey } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import * as Label from "@radix-ui/react-label";

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
            <Text as="div" size={"7"} weight={"bold"} align="center">
              Sign Up
            </Text>

            <Label.Root htmlFor="email">Email</Label.Root>
            <TextField.Root
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
            >
              <TextField.Slot>
                <CiMail />
              </TextField.Slot>
            </TextField.Root>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            <div className="space-y-3">
              <Label.Root htmlFor="password">Password</Label.Root>
              <TextField.Root
                id="password"
                type="password"
                placeholder="Password "
                {...register("password", { required: true })}
              >
                <TextField.Slot>
                  <IoIosKey />
                </TextField.Slot>
              </TextField.Root>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </div>
            <div className="space-y-3">
              <Label.Root htmlFor="confirmPassword">
                Confirm Password
              </Label.Root>
              <TextField.Root
                id="confirmPassword"
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
            </div>
            <hr
              style={{
                margin: "16px 0",
                border: "none",
                borderTop: "1px solid #ccc",
              }}
            />
            <Button
              disabled={isSubmitting}
              style={{ width: "100%", marginTop: "0" }}
            >
              Submit {isSubmitting && <Spinner />}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default RegisterForm;
