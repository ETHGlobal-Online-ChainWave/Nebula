"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import { SignUpPage } from ".";
import ErrorPage from "../components/error";

function Page() {
  const { isMD } = useMediaQuery();
  const isSuccess = true;

  return (
    <>
      {isMD ? (
        <ErrorPage />
      ) : (
        <>
          <SignUpPage isSuccess={isSuccess} />
        </>
      )}
    </>
  );
}

export default Page;
