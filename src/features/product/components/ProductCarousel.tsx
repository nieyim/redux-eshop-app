// import Slider from 'react-slick';
import { Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

interface ProductCarouselProps {
    image?: string[];
}

export function ProductCarousel(props: ProductCarouselProps) {
    const images = props.image;

    return (
        <Carousel>
            {images?.map((image, index) => (
                <Paper key={index} sx={{ height: 400, display: 'flex', justifyContent: 'center' }} elevation={0}>
                    <img src={image} height="100%" width="100%" />
                </Paper>
            ))}
        </Carousel>
    );
}
