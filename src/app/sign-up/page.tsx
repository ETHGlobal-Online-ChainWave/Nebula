'use client';
import React from 'react';
import FooterBar from '../components/footer/footer-bar';
import CreditCardImage from 'public/credit-card.png';
import tw from 'twin.macro';
import Image from 'next/image';

function SignUp() {
  return (
    <>
      <Wrapper>
        <CardImage src={CreditCardImage} alt="credit-card-image" />
      </Wrapper>
      <FooterBar />
    </>
  );
}

const Wrapper = tw.div`
    flex-center flex-col

`;

const CardImage = tw(Image)`
    max-w-270
    `;

export default SignUp;
