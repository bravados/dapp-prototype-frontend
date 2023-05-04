import { styled } from '@stitches/react';
import { MainLayout } from 'components/layouts';

const HomePage = styled('div', { height: '100vh', backgroundColor: 'red' });
const HomePage2 = styled('div', { height: '100vh', backgroundColor: 'blue' });

export default function Home() {
  return (
    <MainLayout>
      <HomePage>HomePage</HomePage>
      <HomePage2>HomePage2</HomePage2>
    </MainLayout>
  );
}
