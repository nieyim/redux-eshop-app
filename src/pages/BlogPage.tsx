import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { BlogHightlight, PublicFooter, PublicHeader, RecentBlog, SocialMedia } from '../components/layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectBlogList } from '../features/blog/blogSlice';
import { blogThunk } from '../features/blog/blogThunk';

export function BlogPage() {
    const dispatch = useAppDispatch();
    const blogList = useAppSelector(selectBlogList);
    const blogListHightlight = blogList.slice(0, 2);
    const blogRecent = blogList.slice(2, 6);

    useEffect(() => {
        dispatch(blogThunk());
    }, [dispatch]);

    return (
        <React.Fragment>
            <PublicHeader />
            <BlogHightlight post={blogListHightlight} />
            <Container component="section">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <RecentBlog post={blogRecent} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SocialMedia />
                    </Grid>
                </Grid>
            </Container>
            <PublicFooter />
        </React.Fragment>
    );
}
