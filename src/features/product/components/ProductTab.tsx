import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Product } from '../../../models';
import { ProductReview } from './ProductReview';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export interface ProductTabProps {
    product: Product;
}

export function ProductTab(props: ProductTabProps) {
    const product = props.product;
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example wrapped"
                    centered
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Specification" {...a11yProps(1)} />
                    <Tab label="Reviews" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {product.description?.map((text, index) => (
                    <Typography variant="body2" fontSize={16} my={1} key={index}>
                        {text}
                    </Typography>
                ))}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            {product.spec?.title.map((title, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white', // Apply alternating colors
                                    }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                                        {title}
                                    </TableCell>
                                    <TableCell align="right">{product.spec?.content[index]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {product.reviews && <ProductReview productReview={product.reviews} />}
            </CustomTabPanel>
        </Box>
    );
}
