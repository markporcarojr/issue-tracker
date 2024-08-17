"use client";
import { patchIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { z } from "zod";

const Status = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  CLOSED: "CLOSED",
};

type StatusValue = keyof typeof Status;

type StatusFormData = z.infer<typeof patchIssueSchema>;

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StatusFormData>({
    resolver: zodResolver(patchIssueSchema),
    defaultValues: {
      status: issue.status || "", // Ensure default value is set correctly
    },
  });

  const onSubmit = useCallback(
    async (data: StatusFormData) => {
      try {
        setIsSubmitting(true);
        await axios.patch("/api/issues/" + issue.id, data);
        router.push("/issues/list");
        router.refresh(); // Refresh page after adding new data
      } catch (error) {
        setError("An unexpected error has occurred.");
      } finally {
        setIsSubmitting(false); // Ensure this is set in both success and error cases
      }
    },
    [issue.id, router] // Include dependencies here
  );

  // Memoize handleValueChange to ensure it remains stable
  const handleValueChange = useCallback(
    (value: string) => {
      setValue("status", value as StatusValue);
      handleSubmit(onSubmit)(); // Trigger form submission
    },
    [handleSubmit, onSubmit, setValue] // Include dependencies here
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select.Root
          defaultValue={issue.status || ""}
          onValueChange={handleValueChange}
        >
          <Select.Trigger placeholder={issue.status || "Set Status..."} />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value={null as any}>Unassigned</Select.Item>
              {Object.entries(Status).map(([key, value]) => (
                <Select.Item key={key} value={value}>
                  {isSubmitting ? <Spinner /> : value}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </form>
      <Toaster />
    </>
  );
};

export default StatusSelect;
