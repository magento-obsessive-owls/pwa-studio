import { useState, useEffect, useCallback } from 'react';

export const useItem = props => {
    const { id, handleRemoveItem } = props;
    const [isDeleting, setIsDeleting] = useState(false);

    const removeItem = useCallback(() => {
        setIsDeleting(true);
        handleRemoveItem(id);
    }, [handleRemoveItem, id]);

    useEffect(() => {
        return () => {
            setIsDeleting(false);
        };
    }, [setIsDeleting]);

    return {
        isDeleting,
        removeItem
    };
};
