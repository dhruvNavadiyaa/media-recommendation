"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type ForgotPasswordValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log("Forgot Password Request:", data);
    // TODO: call API to send reset link
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto p-6 border rounded-lg shadow w-full"
      >
        <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>

        {/* Back to Sign In */}
        <div className="text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}
