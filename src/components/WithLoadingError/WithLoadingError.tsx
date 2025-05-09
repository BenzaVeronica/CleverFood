import { ReactNode } from 'react';

import Loader from '~/components/UI/Loader';
import ErrorNotification from '~/widgets/error/ErrorNotification';

type Props = {
    isLoading: boolean;
    isError: boolean;
    isExist?: boolean;
    children: ReactNode;
};

function WithLoadingError({ isLoading, isError, isExist, children }: Props) {
    if (isLoading) return <Loader />;
    if (isError) return <ErrorNotification />;
    if (!isExist) return <div>Нет данных</div>;
    return children;
}

export default WithLoadingError;
