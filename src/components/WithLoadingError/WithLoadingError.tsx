import { ReactNode } from 'react';

import Loader from '~/components/UI/Loader';
import ErrorNotification from '~/widgets/error/ErrorNotification';

import { LoaderScreen } from '../UI/Loader/LoaderScreen';

type Props = {
    isLoading: boolean;
    isError: boolean;
    isExist?: boolean;
    children: ReactNode;
};

export function WithLoadingError({ isLoading, isError, isExist, children }: Props) {
    if (isLoading) return <Loader />;
    if (isError) return <ErrorNotification />;
    if (!isExist) return <div></div>;
    // if (!isExist) return <div>Нет данных</div>;
    return children;
}

type LoadingScreenErroProps = {
    isLoading: boolean;
    isError: boolean;
};
export function LoadingScreenError({ isLoading, isError }: LoadingScreenErroProps) {
    if (isLoading) return <LoaderScreen />;
    if (isError) return <ErrorNotification />;
    return null;
}
