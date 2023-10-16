"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import { MyPage } from ".";
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
          <MyPage isSuccess={isSuccess} />
        </>
      )}
    </>
  );
}

export default Page;
