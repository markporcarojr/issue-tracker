"use client";
import { Card } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", issues: open },
    { label: "In Progress", issues: inProgress },
    { label: "Closed", issues: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={310}>
        <BarChart data={data} barSize={60}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey={"issues"} fill="#6e56cf" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
