import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    LinearProgress,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { postApi } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Post } from '../../../models';
import { selectBlogList, selectIsLoading } from '../blogSlice';
import { blogThunk } from '../blogThunk';
import { formatDateTime } from '../../../utils/toDate';

export function AdminBlogList() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const data = useAppSelector(selectBlogList);
    const loading = useAppSelector(selectIsLoading);
    // const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
    const [open, setOpen] = useState(false); // Open dialog state
    const [blogSelected, setBlogSelected] = useState<Post>(); // Blog choose when click
    const [paginationModel, setPaginationModel] = useState({
        // Current pagination model state
        page: Number(sessionStorage.getItem('currentPage')),
        pageSize: 10,
    });

    useEffect(() => {
        // Dispatch an action to fetch blog data
        dispatch(blogThunk());
    }, [dispatch]);

    const handleClick = () => {
        // Navigate to the "Add New Blog" page
        navigate('/admin/posts/add');
        sessionStorage.setItem('currentPage', paginationModel.page.toString());
    };

    const handleRemoveBlog = async (blog?: Post) => {
        // Handle remove button click
        try {
            const response = await postApi.deletePost(blog?.id);
            console.log(response.status);
            if (response.status === 200) {
                // Show a success toast when a blog is deleted
                toast.success(`Blog deleted successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            } else {
                // Show an error toast when the deletion fails
                toast.error(`Failed to delete the blog. Please try again.`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            }
            dispatch(blogThunk());
        } catch (error) {
            console.log('Failed');
        }
        setOpen(false);
    };

    const handleEditBlog = async (blog?: Post) => {
        // Navigate to the edit page for the selected blog
        try {
            navigate(`/admin/posts/${blog?.id}`);
            sessionStorage.setItem('currentPage', paginationModel.page.toString());
        } catch (error) {
            console.log('Failed');
        }
    };

    const handleClickOpen = (blog: Post) => {
        // Open the dialog for confirming blog deletion
        setOpen(true);
        console.log(blog);
        setBlogSelected(blog);
    };

    const handleClose = () => {
        // Close the dialog
        setOpen(false);
    };

    const rows = data.map((blog) => ({
        // Transform the b.log data for the DataGrid
        id: blog.id,
        title: blog.title,
        author: blog.user.firstName,
        reaction: blog.reactions,
        tags: blog.tags.join(', '),
        date: formatDateTime(blog.createdAt),
    }));

    const columns: GridColDef[] = [
        // Define the columns for the DataGrid
        { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 1, maxWidth: 60 },
        { field: 'title', headerName: 'Post Name', headerAlign: 'center', align: 'center', flex: 1, minWidth: 500 },
        { field: 'author', headerName: 'Author', headerAlign: 'center', align: 'center', flex: 1, minWidth: 200 },
        {
            field: 'reaction',
            headerName: 'Reaction',
            align: 'center',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
            minWidth: 100,
        },
        {
            field: 'tags',
            align: 'center',
            headerName: 'Tags',
            headerAlign: 'center',
            flex: 1,
            minWidth: 250,
        },
        {
            field: 'date',
            align: 'center',
            headerName: 'Date Created',
            headerAlign: 'center',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'feature',
            headerAlign: 'center',
            headerName: 'Manage',
            sortable: false,
            align: 'center',
            minWidth: 120,
            flex: 1,
            renderCell: (params: GridRenderCellParams<any, Date>) => (
                // Render cell with "Edit" and "Delete" buttons
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Update">
                        <IconButton
                            size="small"
                            sx={{ ml: 1 }}
                            tabIndex={params.hasFocus ? 0 : -1}
                            onClick={() => handleEditBlog(params.row)}
                            color="info"
                        >
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            sx={{ ml: 1 }}
                            tabIndex={params.hasFocus ? 0 : -1}
                            color="error"
                            onClick={() => handleClickOpen(params.row)}
                            aria-label="fingerprint"
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                    <Typography variant="h4" fontSize={24}>
                        Blogs
                    </Typography>
                    <Stack alignItems="center" direction="row" spacing={1}></Stack>
                </Stack>
                <div>
                    <Button
                        startIcon={
                            <SvgIcon fontSize="small">
                                <AddIcon />
                            </SvgIcon>
                        }
                        variant="contained"
                        color="success"
                        onClick={handleClick}
                    >
                        Add
                    </Button>
                </div>
            </Stack>
            {loading ? (
                <LinearProgress color="secondary" />
            ) : (
                <DataGrid
                    disableRowSelectionOnClick
                    disableColumnMenu
                    autoHeight
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 15, 20]}
                    sx={{
                        height: '100%',
                        borderRadius: 5,
                        boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                        p: 2,
                    }}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Delete A Blog'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete <strong>{blogSelected?.title}</strong>? <br />
                        This action can&apos;t be undo!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info">
                        Cancel
                    </Button>
                    <Button onClick={() => handleRemoveBlog(blogSelected)} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Stack>
    );
}
