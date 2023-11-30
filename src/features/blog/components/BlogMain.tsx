import { Grid } from '@mui/material';
import React from 'react';
import { Post } from '../../../models';
import Typography from '../../../components/common/Typography';
import { BlogMainItem } from './BlogMainItem';

export interface BlogMainProps {
    post: Post[];
}

export function BlogMain(props: BlogMainProps) {
    const posts = props.post;
    // const [visibleBlog, setVisibleBlog] = useState(5);

    // const handleLoadMore = () => {
    //     setVisibleBlog(visibleBlog + 5);
    // };
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
                {/* <Grid item xs={12} textAlign="center">
                    {visibleBlog < posts.length && (
                        <Button variant="contained" onClick={handleLoadMore} sx={{ mb: 2 }} color="primary">
                            Load More
                        </Button>
                    )}
                </Grid> */}
            </Grid>
        </React.Fragment>
    );
}
