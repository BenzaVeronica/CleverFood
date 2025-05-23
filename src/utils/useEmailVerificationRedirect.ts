import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { PageRoutes } from '~/routes/PageRoutes.constants';
import { serverParameter } from '~/routes/router';

export function useEmailVerificationRedirect(onNonVerified: () => void) {
    const location = useLocation();
    const navigate = useNavigate();

    const [alreadyHandledVerification, setAlreadyHandledVerification] = useState(false);

    useEffect(() => {
        if (alreadyHandledVerification) return;
        const emailVerified = new URLSearchParams(location.search).get(serverParameter);
        if (emailVerified === 'false') {
            onNonVerified();
            setAlreadyHandledVerification(true);
        } else if (emailVerified === 'true') {
            navigate(PageRoutes.LOGIN, { state: { verifiedSuccess: true } });
        }
    }, [location.search, navigate]);
}
