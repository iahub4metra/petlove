import { useEffect, useRef, useState } from 'react';

export const useErrorBanner = (
    status: string,
    error?: { message: string; status?: number } | null,
) => {
    const [open, setOpen] = useState<boolean>(false);
    const prevStatus = useRef(status);

    useEffect(() => {
        if (prevStatus.current !== 'failed' && status === 'failed') {
            setOpen(true);
        }
        prevStatus.current = status;
    }, [status]);

    return {
        open,
        onClose: () => setOpen(false),
        message: error?.message ?? null,
    };
};
