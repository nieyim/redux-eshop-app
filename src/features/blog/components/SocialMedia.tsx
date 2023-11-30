import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Card, CardActionArea, Grid } from '@mui/material';
import React from 'react';
import Typography from '../../../components/common/Typography';

const medias = [
    { name: 'Facebook', color: '#225B97', icon: <FacebookIcon fontSize="large" />, fl: '21.2k' },
    { name: 'Twitter', color: '#19b5f3', icon: <TwitterIcon fontSize="large" />, fl: '10.2k' },
    { name: 'Google', color: '#dc4d2d', icon: <GoogleIcon fontSize="large" />, fl: '5k' },
];

export function SocialMedia() {
    return (
        <React.Fragment>
            <Typography variant="h6" marked="left" align="left" component="h2" my={3}>
                Social Media
            </Typography>
            <Grid container>
                {medias.map((media) => (
                    <Grid item xs={4} key={media.name}>
                        <Card sx={{ bgcolor: media.color, height: 145, borderRadius: '0px' }}>
                            <CardActionArea>
                                <Box
                                    height={145}
                                    sx={{
                                        py: 3.75,
                                        px: 1.875,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontWeight: 700,
                                    }}
                                >
                                    {media.icon}
                                    {media.fl}
                                    <span>Followers</span>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}
