import { styled } from '@stitches/react';

const StyledImg = styled('img', {
  width: '15vw',
  marginTop: '6.2vh',
  marginLeft: '4vw',
  position: 'absolute',
});

const FullLogo = () => {
  return <StyledImg src="/full-logo-white-grey.svg" alt="Logo" />;
};

export { FullLogo };
