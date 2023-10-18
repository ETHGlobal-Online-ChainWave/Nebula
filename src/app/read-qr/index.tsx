"use client";

import React, { useEffect, useRef, useState } from "react";
import FooterBar from "../components/footer/footer-bar";
import QrCodeImage from "public/qr-code.png";
import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import loading from "public/loading-circle.json";
import { QrReader } from "react-qr-reader";
import { ButtonSmall } from "../components/buttons/button-small";

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
      loop: true,
      autoplay: true,
      animationData: loading,
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isSuccess]);

  const [data, setData] = useState("");

  const videoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream: MediaStream) => {
        let video = videoRef.current;
        if (!video) return;

        (video as HTMLVideoElement).srcObject = stream;
        (video as HTMLVideoElement).play();
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
        <Title>Scan</Title>
        <>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.getText());
              }

              if (!!error) {
                console.info(error);
              }
            }}
          />

          <QrReaderVideo ref={videoRef} />
          <LoadingWrapper>
            {data == "" ? <LottieWrapper ref={warpperRef} /> : <p>{data}</p>}
          </LoadingWrapper>
          <ButtonSmall text="Place code inside the box. Tap here to help" isHighlight={true} />
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
    flex-center flex-col h-full bg-gray7 p-48 gap-24
    
`,
]);

const Title = tw.div`
    font-r-16
    `;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;

const QrReaderVideo = tw.video`
   border-2 border-white border-dotted w-300 rounded-20
`;

const LoadingWrapper = tw.div`
  w-20 h-20 flex-center 
`;

const LottieWrapper = tw.div`
  w-20 h-20 flex-center  
`;
