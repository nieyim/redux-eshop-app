import { Paper, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomLabel = styled(Paper)<PaperProps>((theme) => ({
    zIndex: 1,
    top: 16,
    right: 16,
    position: 'absolute',
    textTransform: 'uppercase',
    padding: '0 6px',
    backgroundColor: '#ff5630',
    color: 'white',
    fontSize: '12px',
    fontWeight: '700',
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    borderRadius: 6,
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    fontFamily: 'Work Sans',
}));
