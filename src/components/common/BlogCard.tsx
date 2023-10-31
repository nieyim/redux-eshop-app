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
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={blog.thumbnail}
                    alt="green iguana"
                    sx={{
                        transition: 'transform 0.15s ease-in-out',
                        '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
                    }}
                />
                <CardContent>
                    <Typography variant="caption" color="text.info">
                        {formattedCreatedAt} {/* Display the formatted createdAt */}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {blog.body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
