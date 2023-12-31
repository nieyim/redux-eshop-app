import { Button } from '../../../components/common';
import Typography from '../../../components/common/Typography';
import HomeHeroLayout from './HomeHeroComp';

const backgroundImage = 'https://wallpapers.com/images/hd/buy-online-ecommerce-parcel-box-s27djx84qkdna93g.jpg';

export function HomeHero() {
    return (
        <HomeHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            {/* Increase the network loading priority of the background image. */}
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <Typography color="inherit" align="center" variant="h2" marked="center">
                EXPERIENCE LUXURY SHOPPING{' '}
            </Typography>
            <Typography color="inherit" align="center" variant="h5" sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}>
                Participate to earn discounts of up to -70% on high-end products.
            </Typography>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                component="a"
                href="/register"
                sx={{ minWidth: 200 }}
            >
                Register
            </Button>
            <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                Join us now
            </Typography>
        </HomeHeroLayout>
    );
}
