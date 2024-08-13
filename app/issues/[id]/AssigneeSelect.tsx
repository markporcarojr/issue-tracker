"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <>
      <Select.Root size="2">
        <Select.Trigger placeholder="Assign.." />
        <Select.Content>
          <Select.Group>
            <Select.Item value="1">Mark Porcaro</Select.Item>
            <Select.Label>Sugesstions</Select.Label>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
