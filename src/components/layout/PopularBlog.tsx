import { Card, CardContent, CardMedia, Divider, Grid, Link } from '@mui/material';
import React from 'react';
import { Post } from '../../models';
import { formatDateTime } from '../../utils/toDate';
import Typography from '../common/Typography';

interface PopularBlogProps {
    blog: Post[];
}

export function PopularBlog(props: PopularBlogProps) {
    const { blog } = props;

    return (
        <React.Fragment>
            <Typography variant="h6" marked="left" align="left" component="h2" my={3}>
                Popular Posts
            </Typography>
            <Grid container spacing={3}>
                {blog.map((post) => (
                    <Grid item key={post.id} xs={12}>
                        <Card sx={{ display: 'flex', borderRadius: '0px', boxShadow: 'none', height: 100 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={post.thumbnail}
                                alt="Live from space album cover"
                            />
                            <CardContent sx={{ pt: 0 }}>
                                <Link
                                    underline="none"
                                    variant="h4"
                                    fontSize={15}
                                    href="#"
                                    sx={{ '&:hover': { color: 'red' } }}
                                >
                                    {post.title}
                                </Link>
                                <Typography variant="body2" sx={{ pt: 1 }}>
                                    {formatDateTime(post.createdAt)}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Divider sx={{ mt: 3 }} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}
