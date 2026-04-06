import { Snackbar } from '@mui/material';

export interface ErrorBannerProps {
    open: boolean;
    message: string | null;
    onClose: () => void;
}

export default function ErrorBanner({
    open,
    message,
    onClose,
}: ErrorBannerProps) {
    return (
        <Snackbar
            open={open}
            message={`Ooops! ${message ? message : ''}`}
            autoHideDuration={5000}
            onClose={onClose}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '30px',
                    bgcolor: '#EF2447',
                },
            }}
        />
    );
}
