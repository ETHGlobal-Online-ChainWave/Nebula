"use client";

import React, { useEffect, useRef, useState } from "react";
import FooterBar from "../components/footer/footer-bar";
import QrCodeImage from "public/qr-code.png";
import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import congratulation from "public/congratulation.json";
import { QrReader } from "react-qr-reader";

interface Props {
  isSuccess: boolean;
}

export const ReadQrcode = ({ isSuccess }: Props) => {
  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!warpperRef.current) return;
    if (!isSuccess) return;
    lottie.loadAnimation({
      container: warpperRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: congratulation,
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isSuccess]);
  const [data, setData] = useState("No result");

  const videoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(stream => {
        let video = videoRef.current;
        if (!video) return;

        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);
  return (
    <>
      <Wrapper>
        <>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "100%" }}
          />
          <p>{data}</p>
          <QrReaderVideo ref={videoRef} />
        </>
      </Wrapper>

      <FooterBarBox>
        <FooterBar />
      </FooterBarBox>
    </>
  );
};

const Wrapper = styled.div(() => [
  tw`
    flex flex-col h-full
    items-center justify-center 
    overflow-y-auto mt-24
    bg-gray7
`,
]);

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;

const QrReaderVideo = tw.video`
   border-2 border-white w-300 rounded-20
`;
