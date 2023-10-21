import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';

export function AppBar(props: AppBarProps) {
    return <MuiAppBar elevation={0} position="fixed" {...props} />;
}
