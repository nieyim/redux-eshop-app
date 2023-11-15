import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import {
    BlogHightlight,
    BlogMain,
    BlogTag,
    PopularBlog,
    PublicFooter,
    PublicHeader,
    RecentBlog,
    SocialMedia,
} from '../components/layout';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectBlogList } from '../features/blog/blogSlice';
import { blogThunk } from '../features/blog/blogThunk';
import { Post } from '../models';

export function BlogPage() {
    const dispatch = useAppDispatch();
    const blogList = useAppSelector(selectBlogList);
    const blogRecent = blogList.slice(2, 6);
    const blogPopular = blogList.slice(6, 12);

    // Blog Hightlight
    const shuffleBlog = (blog: Post[]) => {
        for (let i = blog.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [blog[i], blog[j]] = [blog[j], blog[i]];
        }
        return blog;
    };
    const blogListHightlight = shuffleBlog([...blogList]).slice(0, 2);

    // Tags
    const allTags: string[] = blogList.flatMap((post) => post.tags);
    const tagCounts = allTags.reduce((counts: any, tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
        return counts;
    }, {});
    const uniqueTags: string[] = Object.keys(tagCounts).filter((tag) => tagCounts[tag] > 1);

    // Fetch
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
                        <BlogMain post={blogList} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SocialMedia />
                        <BlogTag tags={uniqueTags} />
                        <PopularBlog blog={blogPopular} />
                    </Grid>
                </Grid>
            </Container>
            <PublicFooter />
        </React.Fragment>
    );
}
