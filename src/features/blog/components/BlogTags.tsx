import { List, ListItem, ListItemButton, Stack } from '@mui/material';
import React from 'react';
import Typography from '../../../components/common/Typography';

interface BlogTagProps {
    tagList: {
        tagName: string;
        count: number;
    }[];
    onClick: (option: string) => void;
}

export function BlogTag(props: BlogTagProps) {
    const { tagList } = props;
    const handleTagsChange = (selectedTag: string) => {
        props.onClick(selectedTag);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" marked="left" align="left" component="h2" my={3}>
                Categories
            </Typography>
            <Stack direction="column">
                <List disablePadding>
                    {tagList.map((tag) => (
                        <ListItem disablePadding key={tag.tagName}>
                            <ListItemButton
                                divider
                                component="a"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#fff', // Set hover background to "none"
                                        '& .MuiTypography-root': {
                                            color: 'red', // Change typography color to red on hover
                                        },
                                    },
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                onClick={() => handleTagsChange(tag.tagName)}
                            >
                                <Typography variant="h6" fontSize={16} display="flex">
                                    {tag.tagName}
                                </Typography>
                                <Typography variant="h6" fontSize={16} display="flex" color="#97989b">
                                    {tag.count}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </React.Fragment>
    );
}
