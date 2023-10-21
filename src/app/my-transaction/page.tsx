"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React, { useState } from "react";
import { MyTransaction } from ".";
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
        <Wrapper>
          <MyTransaction isSuccess={isSuccess} />
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = tw.div`
    
`;

export default Page;
