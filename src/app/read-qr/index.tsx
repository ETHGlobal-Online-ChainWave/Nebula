"use client";

import React, { useEffect, useRef, useState } from "react";
import FooterBar from "../components/footer/footer-bar";
import QrCodeImage from "public/eth-logo.png";
import tw, { css, styled } from "twin.macro";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import loading from "public/loading-circle.json";
import { QrReader } from "react-qr-reader";
import { ButtonSmall } from "../components/buttons/button-small";
import congratulation from "public/congratulation.json";
import { Database } from "@tableland/sdk";

interface Props {
  isSuccess: boolean;
}

export const ReadQrcode = ({ isSuccess }: Props) => {
  const warpperRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [isFinishClicked, setIsFinishClicked] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

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

  const [data, setData] = useState<string>("");

  const getCurrentDate = () => {
    const today = new Date();
  const year = String(today.getFullYear()).slice(-2); 
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0"); 
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentDate(getCurrentDate());
    }
  }, [isSuccess]);

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

  const handleSaveClick = () => {
    setIsSaveClicked(true);
    setIsFinishClicked(true);
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

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

  const tableName: string = "nebula_test_80001_7883";
  const db = new Database();
  const readOnTable = async () => {
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
  };

  const amount = Number(data.substring(58, 76)) / 1e18;

  return (
    <>
    {data == "" ? (
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
      
      ) : (
      <Wrapper2>
        <button onClick={readOnTable}>read</button>
        <QrWrapper>
          <QrTitle>Transaction request</QrTitle>
          <QrImage src={QrCodeImage} alt="qr-code-image" />
        </QrWrapper>
        <BolderBox>
          <LeftCircle />
          <DotBolder />
          <RightCircle />
        </BolderBox>
        <TransactionWrapper>
          <TransactionBox>
            <TransactionContentBox>
              <TransactionTitle>Name</TransactionTitle>
              <TransactionContent>{data.substring(9, 13)}...{data.substring(47, 51)}</TransactionContent>
            </TransactionContentBox>
            <TransactionContentBox>
              <TransactionTitle>Date</TransactionTitle>
              <TransactionContent>{currentDate}</TransactionContent>
            </TransactionContentBox>
            <TransactionContentBox>
              <TransactionTitle>Token</TransactionTitle>
              <TransactionContent>Ethereum</TransactionContent>
            </TransactionContentBox>
            <TransactionContentBox>
              <TransactionTitle>Amount</TransactionTitle>
              <TransactionContent>{amount} eth</TransactionContent>
            </TransactionContentBox>
            <TransactionContentBox>
              <TransactionTitle>Gas Fee limit</TransactionTitle>
              <TransactionContent>21000</TransactionContent>
            </TransactionContentBox>
            <TransactionContentBox>
              <TransactionTitle>Validity</TransactionTitle>
              <TransactionContent>1 hour</TransactionContent>
            </TransactionContentBox>
          </TransactionBox>
          <SaveBox onClick={handleSaveClick}>
            {isFinishClicked ? (
          <SaveText>Success</SaveText>
          ) : (
          <SaveText>Send</SaveText>
          )}
          </SaveBox>
        </TransactionWrapper>
      </Wrapper2>

       )}
      <FooterBarBox>
        <FooterBar />
      </FooterBarBox>
    </>
  );
};

const Wrapper = styled.div(() => [
  tw`
    flex-center flex-col h-full bg-gray7 gap-48
`,
]);

const Title = tw.div`
    font-r-16
    `;

const FooterBarBox = tw.div`
  absolute bottom-0 w-full
`;

const QrReaderVideo = tw.video`
   border-2 border-white border-dotted w-full h-500
`;

const LoadingWrapper = tw.div`
  w-20 h-20 flex-center 
`;

const LottieWrapper = tw.div`
  w-20 h-20 flex-center  
`;

const Wrapper2 = styled.div(() => [
  tw`
    flex flex-col h-full
    items-center justify-center 
    overflow-y-auto mt-24
`,
]);

const QrWrapper = tw.div`
  flex-center flex-col w-328 h-300 h-1/2 bg-gray7
  rounded-t-20 gap-27
`;

const QrTitle = tw.div`
  font-r-16 text-gray3
`;

const QrImage = tw(Image)`
  w-150
`;

const BolderBox = tw.div`
  flex relative
`;

const DotBolder = tw.div`
 flex w-328 border-dotted border-b-2 border-gray7
`;

const LeftCircle = tw.div`
  absolute top-[-6px] left-[-8px] w-16 h-16 rounded-full bg-gray8
`;

const RightCircle = tw.div`
absolute top-[-6px] right-[-8px] w-16 h-16 rounded-full bg-gray8
`;

const TransactionWrapper = tw.div`
  flex-center flex-col  h-1/2 rounded-b-20
  bg-[#282833] w-328 p-24
`;

const TransactionContentBox = tw.div`
  flex-center justify-between  w-full h-full
  gap-20 p-6
`;

const TransactionBox = styled.div(() => [
  tw`
    flex-center flex-col w-full h-full
    bg-gray2 rounded-20 py-16 px-20
`,
  css`
    border-radius: 16px;
    border: 1px solid #cfcffc5c;
    background: rgba(78, 78, 97, 0.2);
    backdrop-filter: blur(5px);
  `,
]);

const TransactionTitle = tw.div`
  font-sb-14 text-white
`;

const TransactionContent = tw.div`
  font-r-12 text-gray3
`;


const SaveBox = styled.div(() => [
  tw`
    flex-center flex-col w-full h-50
    bg-gray2 rounded-20 py-16 px-20
`,
  css`
    border-radius: 30px;
    border: 1px solid #cfcffc5c;
    background: rgba(78, 78, 97, 0.2);
    backdrop-filter: blur(5px);
    margin-top: 35px;
    position: relative;
  `,
]);

const SaveText = tw.div`
  text-white font-bold
`;