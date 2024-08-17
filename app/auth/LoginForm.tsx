// components/RegisterForm.tsx
"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Callout, Card, Flex, TextField, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosKey } from "react-icons/io";
import { z } from "zod";
import { userSchema } from "../validationSchemas";
import { getProviders } from "next-auth/react";
import Link from "next/link";
import * as Label from "@radix-ui/react-label";

type LoginFormData = z.infer<typeof userSchema>;

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const providers = getProviders();
  console.log(providers);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
      console.error("Email and password are required");
      setError("Email and password are required");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false, // prevent automatic redirect to handle errors
      });

      if (result?.error) {
        // Handle errors
        setIsSubmitting(false);
        console.error("Failed to sign in:", result.error);
        setError("Failed to sign in");

        // Optional: Set an error state here to display an error message to the user
      } else {
        // Successful sign-in, you can redirect manually if needed
        window.location.href = result?.url || "/";
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        {error && (
          <Callout.Root color="crimson" className="mb-3">
            <Callout.Icon>
              <FaInfoCircle />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Card size="3">
          <form className="space-y-3" onSubmit={onSubmit}>
            <Text as="div" size={"7"} weight={"bold"} align="center">
              Login
            </Text>
            <div className="space-y-3">
              <Label.Root htmlFor="email">Email</Label.Root>
              <TextField.Root
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-10"
              >
                <TextField.Slot>
                  <CiMail />
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div className="space-y-3">
              <Label.Root htmlFor="password">Password</Label.Root>
              <TextField.Root
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
                <TextField.Slot>
                  <IoIosKey />
                </TextField.Slot>
              </TextField.Root>
            </div>
            <hr
              style={{
                margin: "16px 0",
                border: "none",
                borderTop: "1px solid #ccc",
              }}
            />
            <Flex direction="column" gap="3" align="center">
              <Button
                disabled={isSubmitting}
                type="submit"
                style={{ width: "100%" }}
              >
                Sign in {isSubmitting && <Spinner />}
              </Button>

              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                aria-label="Sign in with Google"
                className="flex items-center gap-3 bg-violet-600 rounded-md p-0.5 pr-3 transition-colors duration-300 hover:bg-violet-900 w-full"
              >
                <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <title>Sign in with Google</title>
                    <desc>Google G Logo</desc>
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      // className="fill-google-logo-blue"
                      fill="#4285f4"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      // className="fill-google-logo-green"
                      fill="#34a853"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      // className="fill-google-logo-yellow"
                      fill="#fbbc05"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      // className="fill-google-logo-red"
                      fill="#ea4335"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm text-white tracking-wider">
                  Sign in with Google
                </span>
              </button>
              <Text>
                Don&apos;t have an account?{" "}
                <span>
                  <Link
                    className="underline text-violet-600"
                    href={"/auth/register"}
                  >
                    Create one
                  </Link>
                </span>
              </Text>
            </Flex>
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
