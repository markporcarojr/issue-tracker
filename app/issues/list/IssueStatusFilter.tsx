"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

// const statuses: { label: string; value?: Status }[] = [
//   { label: "All" },
//   { label: "Open", value: "OPEN" },
//   { label: "In Progress", value: "IN_PROGRESS" },
//   { label: "Closed", value: "CLOSED" },
// ];

interface StatusOption {
  label: string;
  value?: Status;
}

const statuses: StatusOption[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

// This component adds a query string to the url
// so we can filter based on the query
const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === "ALL" ? "" : `?status=${status}`;
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item
            key={status.value ?? `all-${index}`}
            value={status.value ?? "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
