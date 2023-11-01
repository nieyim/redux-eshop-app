import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useState } from 'react';
import { Post } from '../../models';
import { formatDateTime } from '../../utils/toDate';

// Define the BlogItem component
interface BlogItemProps {
    blog: Post;
}

export function BlogItem(props: BlogItemProps) {
    const [love, setLove] = useState(false);
    const { blog } = props;

    const handleLike = () => {
        setLove(!love);
    };

    const formattedCreatedAt = formatDateTime(blog.createdAt);

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0px',
                justifyContent: 'space-between',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
            }}
        >
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: green[400] }} aria-label="recipe" src={blog.user.image}></Avatar>}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={blog.user.firstName + ' ' + blog.user.lastName}
                subheader={formattedCreatedAt}
            />
            <CardActionArea
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}
            >
                <CardMedia
                    component="img"
                    image={blog.thumbnail}
                    alt="Paella dish"
                    loading="lazy"
                    height={250}
                    sx={{
                        transition: 'transform 0.15s ease-in-out',
                        '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                        {blog.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                    <FavoriteIcon color={love ? 'error' : 'inherit'} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Stack direction="row" sx={{ ml: 'auto' }} spacing={1}>
                    {blog.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                </Stack>
            </CardActions>
        </Card>
    );
}
