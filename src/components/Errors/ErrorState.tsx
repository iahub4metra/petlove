export interface ErrorStateProps {
    error: {
        message: string;
        status?: number;
    } | null;
}

export default function ErrorState({ error }: ErrorStateProps) {
    const message =
        error?.status === 404
            ? 'Service not found'
            : error?.status === 500
              ? 'Server error. Try later'
              : null;

    return (
        <div className="flex flex-col items-center justify-center gap-2.5 mt-[40px] md:mt-[80px]">
            <h2 className="text-5xl">Ooops!</h2>
            <p className="text-[16px]">{message}</p>
        </div>
    );
}
