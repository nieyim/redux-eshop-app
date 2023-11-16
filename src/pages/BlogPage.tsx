import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
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
import { selectBlogList } from '../features/blog/blogSlice';
import { blogThunk } from '../features/blog/blogThunk';
import { Post } from '../models';

export function BlogPage() {
    const dispatch = useAppDispatch();
    const blogList = useAppSelector(selectBlogList);
    const blogRecent = [...blogList].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
    const blogPopular = [...blogList].sort((a, b) => b.reactions - a.reactions).slice(0, 5);

    // Blog Hightlight
    const shuffleBlog = (blog: Post[]) => {
        for (let i = blog.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [blog[i], blog[j]] = [blog[j], blog[i]];
        }
        return blog;
    };
    const blogListHightlight = shuffleBlog([...blogList]).slice(0, 2);

    //Tags
    const tagCount: { [tagName: string]: number } = {};
    blogList.forEach((post) => {
        post.tags.forEach((tag) => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
    });

    const tagsWithCount = Object.keys(tagCount).map((tag) => ({
        tagName: tag,
        count: tagCount[tag],
    }));

    const uniqueTags = tagsWithCount.filter((tag) => tag.count > 1);
    const popularTags = [...uniqueTags].sort((a, b) => b.count - a.count);

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
                        <BlogTag tagList={popularTags} />
                        <PopularBlog blog={blogPopular} />
                    </Grid>
                </Grid>
            </Container>
            <PublicFooter />
        </React.Fragment>
    );
}
