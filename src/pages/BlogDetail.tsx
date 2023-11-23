import React, { useEffect, useState } from 'react';
import { PopularBlog, PublicFooter, PublicHeader, SocialMedia } from '../components/layout';
import { BlogBanner } from '../components/common';
import { useParams } from 'react-router-dom';
import { postApi } from '../api';
import { Post } from '../models';
import { Button, Container, Grid, Typography, ButtonProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import EmailIcon from '@mui/icons-material/Email';
import { useAppSelector } from '../app/hooks';
import { selectBlogList } from '../features/blog/blogSlice';

const FbButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: '#225b99',
    '&:hover': {
        backgroundColor: '#225b99',
        opacity: 0.9,
    },
}));

const TwButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: '#00adf2',
    '&:hover': {
        backgroundColor: '#00adf2',
        opacity: 0.9,
    },
}));

const PtButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: '#cc2127',
    '&:hover': {
        backgroundColor: '#cc2127',
        opacity: 0.9,
    },
}));

const EmButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: '#97989b',
    '&:hover': {
        backgroundColor: '#97989b',
        opacity: 0.9,
    },
}));

export function BlogDetail() {
    const { blogID } = useParams<{ blogID: string }>(); // Extract the productID from the URL params
    const [currentBlog, setCurentBlog] = useState<Post>();
    const [blogList, setBlogList] = useState<Post[]>([]);
    const blogPopular = [...blogList].sort((a, b) => b.reactions - a.reactions).slice(0, 5);

    console.log(currentBlog);

    useEffect(() => {
        if (!blogID) return;
        (async () => {
            try {
                const blog = (await postApi.getPostByID(blogID)).data;
                setCurentBlog(blog);
                const bloglist = (await postApi.getAll()).data;
                setBlogList(bloglist);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [blogID]);

    return (
        <React.Fragment>
            <PublicHeader />
            {currentBlog === undefined ? 'Sorry your Blog was not here' : <BlogBanner post={currentBlog} />}
            <Container component="section">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Stack direction="row" spacing={1} mb={3}>
                            <FbButton variant="contained" size="small" startIcon={<FacebookIcon />}>
                                Share
                            </FbButton>
                            <TwButton variant="contained" size="small" startIcon={<TwitterIcon />}>
                                Tweet
                            </TwButton>
                            <PtButton variant="contained" size="small" startIcon={<PinterestIcon />}>
                                Pin
                            </PtButton>
                            <EmButton variant="contained" size="small" startIcon={<EmailIcon />}>
                                Email
                            </EmButton>
                        </Stack>
                        {currentBlog?.sections.map((blog, index) => (
                            <React.Fragment key={index}>
                                {blog.title !== 'Opening' && blog.title !== 'Conclusion' && (
                                    <Typography variant="h6" my={2} fontSize={20}>
                                        {blog.title}
                                    </Typography>
                                )}
                                {blog.content.map((para, index) => (
                                    <Typography key={index} my={1}>
                                        {para}
                                    </Typography>
                                ))}
                                {blog.image && <img src={blog.image} width="100%" alt="content" />}
                                {blog.caption && (
                                    <Typography variant="caption" fontSize={13} fontStyle="italic">
                                        {blog.caption}
                                    </Typography>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularBlog blog={blogPopular} />
                    </Grid>
                </Grid>
            </Container>
            <PublicFooter />
        </React.Fragment>
    );
}
