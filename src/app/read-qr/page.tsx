"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import { ReadQrcode } from ".";
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
          <ReadQrcode isSuccess={isSuccess} />
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = tw.div`
    
`;

export default Page;
