"use client";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userSchema } from "../validationSchemas";
import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import { z } from "zod";
import { ErrorMessage } from "../components";
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
      <Flex>
        {error && (
          <Callout.Root color="crimson" className="mb-3">
            <Callout.Icon>
              <FaInfoCircle />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form onSubmit={onSubmit}>
          <TextField.Root
            placeholder="Password "
            {...register("password", { required: true })}
          >
            <IoIosKey />
          </TextField.Root>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <TextField.Root
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
          ></TextField.Root>
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          <Button disabled={isSubmitting}>
            Update Password {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Flex>
    </>
  );
};

export default UpdatePasswordForm;
