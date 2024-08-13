"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClentProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClentProvider client={queryClient}>
      {children}
    </ReactQueryClentProvider>
  );
};

export default QueryClientProvider;
