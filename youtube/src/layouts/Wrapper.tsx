"use client";
import ReduxWrapper from "@/redux/ReduxWrapper";
import React from "react";

const Wrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <ReduxWrapper>{children}</ReduxWrapper>
    </>
  );
};

export default Wrapper;
