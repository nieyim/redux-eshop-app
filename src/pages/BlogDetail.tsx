import React, { useEffect, useState } from 'react';
import { PublicFooter, PublicHeader } from '../components/layout';
import { BlogBanner } from '../components/common';
import { useParams } from 'react-router-dom';
import { postApi } from '../api';
import { Post } from '../models';
import { Container, Grid, Typography } from '@mui/material';

export function BlogDetail() {
    const { blogID } = useParams<{ blogID: string }>(); // Extract the productID from the URL params
    const [curentBlog, setCurentBlog] = useState<Post>();
    console.log(curentBlog);

    useEffect(() => {
        if (!blogID) return;
        (async () => {
            try {
                const blog = (await postApi.getPostByID(blogID)).data;
                setCurentBlog(blog);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [blogID]);

    return (
        <React.Fragment>
            <PublicHeader />
            {curentBlog === undefined ? 'Sorry your Blog was not here' : <BlogBanner post={curentBlog} />}
            <Container component="section">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Typography>
                            In the not-so-distant past, the kitchen was a realm where hand-scribbled recipes passed down
                            through generations and dog-eared cookbooks were the trusted guides of aspiring chefs.
                            However, with the advent of the digital age, the culinary landscape has undergone a profound
                            transformation. In today's fast-paced world, the internet has become a culinary haven, and
                            online recipes have emerged as the go-to resource for home cooks, revolutionizing the way we
                            approach and experience cooking.
                        </Typography>
                        <Typography variant="h6" my={2}>
                            The Rise of Online Recipes
                        </Typography>
                        <Typography>
                            The digital revolution has ushered in an era where culinary inspiration is just a click
                            away. Online recipes have become the modern kitchen companion, offering a vast and diverse
                            array of dishes catering to every taste, dietary preference, and cultural craving. From
                            mouth-watering visuals to step-by-step instructions, cooking enthusiasts now have access to
                            an unprecedented wealth of culinary knowledge at their fingertips. Diverse Culinary
                            Influences One of the most exciting aspects of cooking in the digital age is the exposure to
                            a wide range of culinary influences from around the globe. Online platforms feature recipes
                            from home cooks, chefs, and food bloggers spanning continents, allowing users to experiment
                            with flavors and techniques that might have been previously unfamiliar. Whether it's
                            mastering the art of sushi, perfecting the Indian curry, or exploring the intricacies of
                            French pastry, the digital kitchen opens doors to a world of culinary adventures.
                            Interactive Cooking Experiences Online recipes go beyond traditional cookbooks by providing
                            interactive and engaging cooking experiences. Cooking apps and websites often include
                            features such as video tutorials, interactive timers, and user reviews, transforming the
                            cooking process into a dynamic and collaborative endeavor. Aspiring chefs can follow along
                            with cooking demonstrations, ensuring they understand each step of the recipe, while also
                            benefiting from the insights and experiences of a global community of cooks. Personalized
                            and Adaptable Cooking The digital kitchen is all about personalization. Online recipes allow
                            cooks to tailor dishes to their individual preferences and dietary needs. With a simple
                            click, users can adjust serving sizes, substitute ingredients, or explore variations of a
                            recipe. This adaptability not only accommodates diverse dietary requirements but also
                            encourages creativity in the kitchen, empowering individuals to put their unique spin on
                            classic dishes. Saving Time and Reducing Food Waste Gone are the days of flipping through
                            countless pages to find that one recipe. Online platforms provide efficient search
                            functionalities and filters, enabling users to quickly locate recipes based on ingredients,
                            cooking time, or dietary restrictions. This not only saves time but also contributes to the
                            reduction of food waste, as individuals can plan their meals more effectively and make use
                            of ingredients they already have on hand. The Social Aspect of Cooking Cooking is often a
                            social activity, and the digital kitchen enhances this communal experience. Online platforms
                            foster a sense of community through features such as user comments, recipe sharing, and
                            virtual cooking challenges. Cooking enthusiasts can connect with others who share their
                            passion, exchange tips and tricks, and build a virtual network that extends far beyond the
                            confines of their own kitchen. Challenges and Considerations While the digitalization of
                            cooking brings a myriad of benefits, it's not without its challenges. The abundance of
                            information can be overwhelming for some, and the reliability of online recipes may vary.
                            Additionally, the tactile joy of flipping through a physical cookbook or the sentimental
                            value of a handwritten family recipe may be lost in the digital realm.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}></Grid>
                </Grid>
            </Container>
            <PublicFooter />
        </React.Fragment>
    );
}
