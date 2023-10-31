import { Container, Grid } from '@mui/material';
import { Post } from '../../models';
import { BlogCard } from '../common';

export interface BlogHightlightProps {
    post: Post[];
}

export function BlogHightlight(props: BlogHightlightProps) {
    const blogListHightlight = props.post;
    return (
        <Container component="section">
            <Grid container spacing={4} mt={2}>
                {blogListHightlight.map((blog) => (
                    <Grid item xs={12} md={6} key={blog.id}>
                        <BlogCard blog={blog} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
