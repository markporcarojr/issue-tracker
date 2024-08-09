"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// Let zod infer the type based on the schema
type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error has occurred.");
    }
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="crimson" className="mb-3">
          <Callout.Icon>
            <FaInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title", { required: true })}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* You can customize the SimpleMDE */}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description ?? undefined}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
