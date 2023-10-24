import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '../common/Typography';
import { useState, useEffect } from 'react';
import { productsApi } from '../../api';
import { Category } from '../../models';
import { useNavigate } from 'react-router-dom';

const ImageBackdrop = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: '#000',
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('md')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover': {
        zIndex: 1,
    },
    '&:hover .imageBackdrop': {
        opacity: 0.15,
    },
    '&:hover .imageMarked': {
        opacity: 0,
    },
    '&:hover .imageTitle': {
        border: '4px solid currentColor',
    },
    '& .imageTitle': {
        position: 'relative',
        padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
    },
    '& .imageMarked': {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

const width = [
    '40%',
    '20%',
    '40%',
    '38%',
    '38%',
    '24%',
    '40%',
    '20%',
    '40%',
    '40%',
    '20%',
    '40%',
    '38%',
    '38%',
    '24%',
    '40%',
    '20%',
    '40%',
    '50%',
    '50%',
];

export function ProductCategories() {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await productsApi.getAllCategory();
                setCategoryList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    console.log(categoryList);

    return (
        <Container component="section" sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h4" marked="center" align="center" component="h2">
                Explore Diverse Product Categories{' '}
            </Typography>
            <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
                {categoryList.map((category) => (
                    <ImageIconButton
                        key={category.title}
                        style={{
                            width: width[category.id - 1],
                        }}
                        onClick={() => navigate('/')}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 40%',
                                backgroundImage: `url(${category.image})`,
                            }}
                        />
                        <ImageBackdrop className="imageBackdrop" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'common.white',
                            }}
                        >
                            <Typography component="h3" variant="h6" color="inherit" className="imageTitle">
                                {category.title}
                                <div className="imageMarked" />
                            </Typography>
                        </Box>
                    </ImageIconButton>
                ))}
            </Box>
        </Container>
    );
}
