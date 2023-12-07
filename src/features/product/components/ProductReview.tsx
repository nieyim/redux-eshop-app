import FlagIcon from '@mui/icons-material/Flag';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Rating,
    Tooltip,
    Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { User } from '../../../models';
import { formatDateTime } from '../../../utils/toDate';
import { userApi } from '../../../api';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ProductReviewProps {
    productReview: {
        userID: number[];
        rate: number[];
        text: string[];
        createdAt: number[];
    };
}

export function ProductReview(props: ProductReviewProps) {
    const { userID, rate, text, createdAt } = props.productReview;
    const [users, setUsers] = useState<User[]>([]); // State to store an array of user information
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: 'red',
        },
    });

    // Function to fetch user information from the API
    const fetchUsersInfo = async () => {
        try {
            const promises = userID.map((id) => userApi.getUserById(id));
            const responses = await Promise.all(promises);
            const usersData = responses.map((response) => response.data);
            setUsers(usersData); // Assuming the API response has a 'data' property containing user information
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    useEffect(() => {
        fetchUsersInfo(); // Fetch user information when the component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userID]); // Fetch user information whenever the userID changes

    const formattedCreatedAt: string[] = createdAt.map((timestamp) => formatDateTime(timestamp));

    return (
        <Box>
            {users.map((review, index) => (
                <Card elevation={0} key={review.id}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={review.image}>
                                {/* {user.image} */}
                            </Avatar>
                        }
                        action={
                            <Tooltip title="Report">
                                <IconButton aria-label="settings">
                                    <FlagIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        }
                        title={review.firstName + ' ' + review.lastName}
                        titleTypographyProps={{ fontWeight: 500 }}
                        subheader={formattedCreatedAt[index]}
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <StyledRating
                            name="customized-color"
                            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            disabled
                            defaultValue={rate[index]}
                        />

                        <Typography variant="body2" color="text.secondary">
                            {text[index]}
                        </Typography>
                    </CardContent>
                    <Divider />
                </Card>
            ))}
        </Box>
    );
}
