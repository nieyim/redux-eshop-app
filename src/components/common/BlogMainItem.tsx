import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Link,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Post } from '../../models';
import { formatDateTime } from '../../utils/toDate';
import { CustomLabel } from './CustomLabel';
import { useTheme } from '@mui/material/styles';

interface BlogMainItemProps {
    blog: Post;
}

export function BlogMainItem(props: BlogMainItemProps) {
    const { blog } = props;
    const formattedCreatedAt = formatDateTime(blog.createdAt);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card
            sx={{
                display: 'flex',
                height: '100%',
                borderRadius: '0px',
                boxShadow: 'none',
                minHeight: 200,
                flexDirection: isSmallScreen ? 'column' : 'row',
            }}
        >
            {/* Left side with CardMedia */}
            <CardActionArea sx={{ width: isSmallScreen ? '100%' : '40%', flexShrink: 0 }}>
                <CardMedia
                    component="img"
                    sx={{ objectFit: 'cover', height: '100%' }}
                    alt="Blog Image"
                    image={blog.thumbnail} // Replace with your image URL
                />
            </CardActionArea>

            {/* Right side with CardContent */}
            <CardContent
                sx={{
                    width: isSmallScreen ? '100%' : '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    justifyContent: 'space-around',
                }}
            >
                {/* First row with tags and date */}
                <Box
                    display={isSmallScreen ? 'none' : 'flex'}
                    sx={{
                        justifyContent: 'space-between',
                    }}
                >
                    <Stack direction="row" spacing={1}>
                        {blog.tags.map((tag) => (
                            <CustomLabel key={tag} sx={{ position: 'inherit', borderRadius: '2px' }}>
                                {tag}
                            </CustomLabel>
                        ))}
                    </Stack>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {formattedCreatedAt}
                    </Typography>
                </Box>

                {/* Second row with blog title */}
                <Link
                    underline="none"
                    variant="h4"
                    fontSize={18}
                    href="#"
                    sx={{ '&:hover': { color: 'red' } }}
                    textAlign={isSmallScreen ? 'center' : 'left'}
                >
                    {blog.title}
                </Link>

                {/* Third row with blog body */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    display={isSmallScreen ? 'none' : '-webkit-box'}
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                    style={{
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {blog.body}
                </Typography>
            </CardContent>
        </Card>
    );
}
