"use client";
import { useEffect, useState } from "react";
import tw, { css, styled } from "twin.macro";

import LogoImg from "~/assets/images/logo.png";

function ErrorPage() {
  return (
    <Wrapper>
      <ErrorText>{"Please use a Mobile device to access this Service."}</ErrorText>
    </Wrapper>
  );
}

export default ErrorPage;

const Wrapper = styled.div(() => [
  tw`
  w-full h-full flex-center bg-white
`,
]);

const ErrorImg = styled.img(() => [
  tw`
  absolute absolute-center w-400 h-700
    `,
  css`
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
  `,
]);

const ErrorText = tw.div`
  absolute absolute-center font-sb-28 text-black text-center
`;
