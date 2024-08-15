import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next/types";

// searchParams is a convention used by Next.js
interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Validate Status
  // if logged would see [ 'OPEN', 'IN_PROGRESS', 'CLOSED' ]
  const statuses = Object.values(Status);
  // check if statuses array includes incoming params
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <>
      <Flex direction="column" gap="3">
        <IssueActions />
        <IssueTable searchParams={searchParams} issues={issues} />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
        <Text weight="bold" size="2">
          {issueCount} Issues Found
        </Text>
      </Flex>
    </>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all of the project issues",
};

// controlled revalidate
// export const revalidate = 0;

export default IssuesPage;
