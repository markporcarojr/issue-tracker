"use client";
import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  Rectangle,
  Legend,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", count: open },
    { label: "In Progress", count: inProgress },
    { label: "Closed", count: closed },
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
          <Bar dataKey={"count"} fill="#6e56cf" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
