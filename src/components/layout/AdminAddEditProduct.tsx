import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Category, Product } from '../../models';
import { productsApi } from '../../api';
import ProductForm from './ProductForm';

export function AdminAddEditProduct() {
    const { productID } = useParams<{ productID: string }>(); // Extract the productID from the URL params
    const navigate = useNavigate(); // Hook for navigation
    const isEditMode = Boolean(productID); // Determine whether it's an edit mode or not
    const [selectedProduct, setSelectedProduct] = useState<Product>(); // State to store the selected product
    const [category, setCategory] = useState<Category[]>([]); // State to store the category data

    // Fetch category data and product data based on productID
    useEffect(() => {
        // Fetch category data for select field
        (async () => {
            try {
                const categoryResponse = await productsApi.getAllCategory();
                setCategory(categoryResponse.data);
            } catch (error) {
                console.log(error);
            }
        })();
        // Fetch product data if in edit mode
        if (!productID) return;
        (async () => {
            try {
                const product = (await productsApi.getProductById(productID)).data;
                setSelectedProduct(product);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [productID]);

    console.log(selectedProduct);

    // Define initial form values, merging selectedProduct if it exists
    const initialValues: Product = {
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
        ...selectedProduct,
    };

    // Handle form submission
    const handleProductFormSubmit = async (formValue: Product) => {
        console.log(formValue.discountPercentage);
        let response: any;
        // Determine whether to update or add a product
        if (isEditMode) {
            response = await productsApi.updateProduct(formValue);
        } else {
            response = await productsApi.addProduct(formValue);
        }
        console.log(response.data.discountPercentage);
        // Show a success or error toast message based on the response
        if (response.status === 201 || 200) {
            toast.success(`Product ${isEditMode ? 'updated' : 'added'} successfully!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
                theme: 'dark',
                hideProgressBar: true,
            });
            const delay = 1500; // 2 seconds in milliseconds
            setTimeout(() => {
                navigate('/admin/products');
            }, delay);
        } else {
            toast.error(`Failed to ${isEditMode ? 'update' : 'add'} the product. Please try again.`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
                theme: 'dark',
                hideProgressBar: true,
            });
        }
    };

    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={2}>
                    <Button startIcon={<ArrowBackIosIcon />} onClick={() => navigate('/admin/products')} color="info">
                        Back to Products
                    </Button>

                    <Stack alignItems="center" direction="row" spacing={1}>
                        <Typography variant="h4" fontSize={24}>
                            {isEditMode ? 'Update Product Info' : 'Add New Product'}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            {(!isEditMode || Boolean(selectedProduct)) && (
                <ProductForm initialValues={initialValues} onSubmit={handleProductFormSubmit} category={category} />
            )}
            <ToastContainer />
        </Stack>
    );
}
