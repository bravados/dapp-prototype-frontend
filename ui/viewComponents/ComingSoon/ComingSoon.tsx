import { styled } from '@infrastructure/style';
import Typography from '@mui/material/Typography';
import { VideoStyles, ContainerStyles } from './ComingSoon.styles';

const Video = styled('video', VideoStyles);

const Container = styled('div', ContainerStyles);

export const ComingSoon = () => {
    console.log(`printing: ${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}`)
    return (
        <>
            <Video src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}/mangrove.mp4`} autoPlay loop muted playsInline />
            <Container>
                <Typography variant="h1">COMING SOON</Typography>
            </Container>
        </>
    );
};
