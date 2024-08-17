"use client";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userSchema } from "../validationSchemas";
import { Button, Callout, Card, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import { z } from "zod";
import { ErrorMessage } from "../components";
import * as Label from "@radix-ui/react-label";
import { IoIosKey } from "react-icons/io";

type UpdatePasswordFormData = z.infer<typeof userSchema>;

const UpdatePasswordForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.patch("/api/users", data);
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
      <div>
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
              Update Password
            </Text>

            <div className="space-y-3">
              <Label.Root htmlFor="password">New Password</Label.Root>
              <TextField.Root
                placeholder="Password"
                type="password"
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
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", { required: true })}
              >
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
              style={{ marginTop: "0", width: "100%" }}
            >
              Update Password {isSubmitting && <Spinner />}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default UpdatePasswordForm;
