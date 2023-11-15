import { Grid } from '@mui/material';
import React from 'react';
import { Post } from '../../models';
import Typography from '../common/Typography';
import { BlogMainItem } from '../common';

export interface BlogMainProps {
    post: Post[];
}

export function BlogMain(props: BlogMainProps) {
    const posts = props.post;

    return (
        <React.Fragment>
            <Typography variant="h6" marked="left" align="left" component="h2" my={3}>
                Blogs
            </Typography>
            <Grid container spacing={3}>
                {posts.map((post) => (
                    <Grid item key={post.id} xs={12}>
                        <BlogMainItem blog={post} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}
