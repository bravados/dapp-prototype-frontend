import { styled } from '@infrastructure/style';
import Typography from '@mui/material/Typography';
import { StyledVideo, StyledContainer } from './ComingSoon.styles';

const Video = styled('video', StyledVideo);

const Container = styled('div', StyledContainer);

export const ComingSoon = () => {
    console.log(`printing: ${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}`)
    return (
        <>
            <Video src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}/mangrove.mp4`} autoPlay loop muted />
            <Container>
                <Typography variant="h1">COMING SOON</Typography>
            </Container>
        </>
    );
};
