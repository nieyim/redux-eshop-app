import { Container, Grid } from '@mui/material';
import { BlogCard } from '../common';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { blogThunk } from '../../features/blog/blogThunk';
import { selectBlogList } from '../../features/blog/blogSlice';
import Typography from '../common/Typography';

export function BlogHightlight() {
    const dispatch = useAppDispatch();
    const blogList = useAppSelector(selectBlogList);
    const blogListHightlight = blogList.slice(0, 2);

    useEffect(() => {
        dispatch(blogThunk());
    }, [dispatch]);

    return (
        <Container component="section">
            <Typography variant="h4" marked="center" align="center" component="h2" margin={6}>
                Recent Blogs
            </Typography>
            <Grid container spacing={4}>
                {blogListHightlight.map((blog) => (
                    <Grid item xs={12} md={6} key={blog.id}>
                        <BlogCard blog={blog} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
