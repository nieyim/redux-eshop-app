import { Container, Grid, Typography } from '@mui/material';
import { BlogCard } from '../common';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { blogThunk } from '../../features/blog/blogThunk';
import { selectBlogList } from '../../features/blog/blogSlice';

export function BlogHightlight() {
    const dispatch = useAppDispatch();
    const blogList = useAppSelector(selectBlogList);
    const blogListHightlight = blogList.slice(0, 2);

    useEffect(() => {
        dispatch(blogThunk());
    }, [dispatch]);

    return (
        <Container component="section">
            <Typography variant="h4" mt={3} fontSize={26}>
                Recent Post
            </Typography>
            <Grid container spacing={4} my={2}>
                {blogListHightlight.map((blog) => (
                    <Grid item xs={12} md={6}>
                        <BlogCard blog={blog} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
