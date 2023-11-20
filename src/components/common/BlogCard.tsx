import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Post } from '../../models';

// Define the BlogCard component
interface BlogCardProps {
    blog: Post;
}

export function BlogCard(props: BlogCardProps) {
    const { blog } = props;

    // Convert the createdAt timestamp to a Date object
    const createdAtDate = new Date(blog.createdAt);

    // Format the date and time as a string
    const formattedCreatedAt = createdAtDate.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Card
            sx={{
                borderRadius: '0px',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Set the card height to 100% of its container
            }}
        >
            <CardActionArea href={`/blogs/${blog.id}`}>
                <CardMedia
                    component="img"
                    image={blog.thumbnail}
                    alt="blog image"
                    sx={{
                        height: '300px', // Set a fixed height for the image
                        objectFit: 'cover', // Maintain the aspect ratio and cover the container
                        transition: 'transform 0.15s ease-in-out',
                        '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
                    }}
                />
                <CardContent sx={{ flex: 1, overflow: 'hidden' }}>
                    <Typography variant="caption" color="text.info">
                        {formattedCreatedAt}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mt: 1 }}
                    >
                        {blog.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                    >
                        {blog.body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
