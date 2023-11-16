import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagIcon from '@mui/icons-material/Flag';
import ShareIcon from '@mui/icons-material/Share';
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Tooltip,
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
                title={blog.user.firstName + ' ' + blog.user.lastName}
                subheader={formattedCreatedAt}
            />
            <CardActionArea
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}
                href={`/blogs/${blog.id}`}
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
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title="Like">
                    <IconButton aria-label="add to favorites" onClick={handleLike}>
                        <FavoriteIcon color={love ? 'error' : 'inherit'} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Report">
                    <IconButton aria-label="report">
                        <FlagIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
}
