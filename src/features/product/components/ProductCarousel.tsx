// import Slider from 'react-slick';
import { Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

interface ProductCarouselProps {
    image?: string[];
}

export function ProductCarousel(props: ProductCarouselProps) {
    const images = props.image;

    return (
        <Carousel navButtonsAlwaysVisible animation="fade">
            {images?.map((image, index) => (
                <Paper
                    key={index}
                    sx={{ height: { xs: 300, md: 420 }, display: 'flex', justifyContent: 'center' }}
                    elevation={0}
                >
                    <img src={image} height="100%" width="100%" alt="product" style={{ objectFit: 'cover' }} />
                </Paper>
            ))}
        </Carousel>
    );
}
