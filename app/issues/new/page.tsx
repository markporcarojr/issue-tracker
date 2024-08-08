"use client";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Callout } from "@radix-ui/themes";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

// const handleSaveIssue = async (data) => {
//   await axios.post("/api/issues", data);
// };

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
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
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error has occurred.");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title", { required: true })}
        ></TextField.Root>
        {/* You can customize the SimpleMDE */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
