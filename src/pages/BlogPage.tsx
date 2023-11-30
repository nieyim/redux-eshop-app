import { Container, Grid } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectBlogList } from '../features/blog/blogSlice';
import { blogThunk } from '../features/blog/blogThunk';
import { Post } from '../models';
import { PublicHeader, PublicFooter } from '../components/layout';
import { BlogHightlight, RecentBlog, BlogMain, SocialMedia, BlogTag, PopularBlog } from '../features/blog/components';

export function BlogPage() {
    const dispatch = useAppDispatch();
    const blogList = useAppSelector(selectBlogList);
    const [blogFilter, setBlogFilter] = useState<Post[]>(blogList);
    const [visibleBlogs, setVisibleBlogs] = useState(5); // Number of blogs initially visible
    const blogRecent = [...blogList].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
    const blogPopular = [...blogList].sort((a, b) => b.reactions - a.reactions).slice(0, 5);

    // Blog Highlight
    const shuffleBlog = (blog: Post[]) => {
        for (let i = blog.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [blog[i], blog[j]] = [blog[j], blog[i]];
        }
        return blog;
    };
    const blogListHighlight = shuffleBlog([...blogList]).slice(0, 2);

    // Tags
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

    const handleCategoryFilterChange = (selectedTag: string) => {
        const filteredPosts = blogList.filter((post) => post.tags.includes(selectedTag));
        setBlogFilter(filteredPosts);
        const blogMainSection = document.getElementById('blog-main-section');
        if (blogMainSection) {
            blogMainSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Infinite scrolling
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (containerRef.current && containerRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
            // User has scrolled to the end
            setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 5); // Increase the number of visible blogs
        }
    };

    // Fetch
    useEffect(() => {
        dispatch(blogThunk());
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <PublicHeader />
            <BlogHightlight post={blogListHighlight} />
            <Container component="section" sx={{ mb: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <RecentBlog post={blogRecent} />
                        <div id="blog-main-section" ref={containerRef}>
                            <BlogMain
                                post={
                                    blogFilter.length === 0
                                        ? blogList.slice(0, visibleBlogs)
                                        : blogFilter.slice(0, visibleBlogs)
                                }
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SocialMedia />
                        <BlogTag tagList={popularTags} onClick={handleCategoryFilterChange} />
                        <PopularBlog blog={blogPopular} />
                    </Grid>
                </Grid>
            </Container>
            <PublicFooter />
        </React.Fragment>
    );
}
