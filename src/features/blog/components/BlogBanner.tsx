import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Post } from '../../../models';

interface BlogBannerProps {
    post: Post;
}

export function BlogBanner(props: BlogBannerProps) {
    const { post } = props;

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${post.image})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={post.thumbnail} alt="Post" />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid
                container
                sx={{ background: 'linear-gradient(180deg, rgba(27, 28, 30, 0) 0%, rgba(27, 28, 30, 0.8) 90%)' }}
            >
                <Grid item md={8}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 6, md: 12 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h4" variant="h3" color="inherit" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" color="inherit" paragraph>
                            {post.body}
                        </Typography>
                        <Link variant="subtitle1" href="#"></Link>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
