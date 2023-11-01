import { List, ListItem, ListItemButton, Stack } from '@mui/material';
import React from 'react';
import Typography from '../common/Typography';

interface BlogTagProps {
    tags: string[];
}

export function BlogTag(props: BlogTagProps) {
    const { tags } = props;

    return (
        <React.Fragment>
            <Typography variant="h6" marked="left" align="left" component="h2" my={3}>
                Categories
            </Typography>
            <Stack direction="column">
                <List disablePadding>
                    {tags.map((tag) => (
                        <ListItem disablePadding key={tag}>
                            <ListItemButton
                                divider
                                component="a"
                                href="#simple-list"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#fff', // Set hover background to "none"
                                        '& .MuiTypography-root': {
                                            color: 'red', // Change typography color to red on hover
                                        },
                                    },
                                }}
                            >
                                <Typography variant="h6" fontSize={16}>
                                    {tag}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </React.Fragment>
    );
}
