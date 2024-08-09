import { Table } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "../IssueActions";

const LoadingIssuesDetailsPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <>
      <div>Loading...</div>
    </>
  );
};

export default LoadingIssuesDetailsPage;
