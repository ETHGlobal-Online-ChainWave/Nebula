"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import { MyCard } from ".";
import ErrorPage from "../components/error";
import tw from "twin.macro";

function Page() {
  const { isMD } = useMediaQuery();
  const isSuccess = true;

  return (
    <>
      {isMD ? (
        <ErrorPage />
      ) : (
        <>
          <MyCard isSuccess={isSuccess} />
        </>
      )}
    </>
  );
}

export default Page;
