import React from 'react';
import { Post } from '../../../models';
import Typography from '../../../components/common/Typography';
import { Grid } from '@mui/material';
import { BlogItem } from './BlogItem';

export interface RecentBlogProps {
    post: Post[];
}

export function RecentBlog(props: RecentBlogProps) {
    const posts = props.post;

    return (
        <React.Fragment>
            <Typography variant="h6" marked="left" align="left" component="h2" my={3}>
                Recent Blogs
            </Typography>
            <Grid container spacing={3}>
                {posts.map((post) => (
                    <Grid item key={post.id} xs={12} sm={6}>
                        <BlogItem blog={post} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}
