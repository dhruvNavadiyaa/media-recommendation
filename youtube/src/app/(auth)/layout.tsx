import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex justify-center items-center w-full p-4">
      {children}
    </div>
  );
}
