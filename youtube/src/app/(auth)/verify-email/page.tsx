"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmailPage() {
  const handleResendEmail = () => {
    console.log("Resend verification email clicked");
    // TODO: call API to resend verification email
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 border rounded-lg shadow text-center space-y-4">
        <h2 className="text-2xl font-semibold">Verify Your Email</h2>
        <p className="text-gray-600">
          We have sent a verification link to your email. Please check your
          inbox and click the link to activate your account.
        </p>

        <Button onClick={handleResendEmail} className="w-full">
          Resend Email
        </Button>

        <div className="text-sm text-gray-600">
          Back to{" "}
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
