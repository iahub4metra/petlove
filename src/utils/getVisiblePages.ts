export const getVisiblePages = (
    page: number,
    totalPages: number,
    isTablet: boolean,
): number[] => {
    if (!totalPages) return [];

    if (!isTablet) {
        const second = page + 1 <= totalPages ? page + 1 : totalPages;
        return [page, second].filter((p, i, arr) => arr.indexOf(p) === i);
    }

    if (page === 1) {
        const second = page + 1 <= totalPages ? page + 1 : totalPages;
        const third = page + 2 <= totalPages ? page + 2 : totalPages;
        return [page, second, third].filter(
            (p, i, arr) => arr.indexOf(p) === i,
        );
    }

    const prev = page - 1 >= 1 ? page - 1 : 1;
    const next = page + 1 <= totalPages ? page + 1 : totalPages;
    return [prev, page, next].filter((p, i, arr) => arr.indexOf(p) === i);
};
