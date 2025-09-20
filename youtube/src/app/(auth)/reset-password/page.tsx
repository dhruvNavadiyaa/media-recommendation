"use client";

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
import Link from "next/link";

type ResetPasswordValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const form = useForm<ResetPasswordValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  const onSubmit = (data: ResetPasswordValues) => {
    console.log("Reset Password Data:", data);
    // TODO: call API to update password using token from URL
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto p-6 border rounded-lg shadow w-full"
      >
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>

        {/* New Password */}
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Reset Password
        </Button>

        <div className="text-center text-sm text-gray-600">
          Back to{" "}
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
