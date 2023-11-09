import { Grid } from '@mui/material';
import React from 'react';
import Typography from '../common/Typography';

export function BlogMain() {
    return (
        <React.Fragment>
            <Typography variant="h6" marked="left" align="left" component="h2" my={3}>
                Blogs
            </Typography>
            <Grid container spacing={3}></Grid>
        </React.Fragment>
    );
}
