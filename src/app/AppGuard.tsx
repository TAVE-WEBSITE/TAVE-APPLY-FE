'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import FlexBox from '@/components/layout/FlexBox';

const PROTECTED_PATHS = ['/recruit', '/mypage', '/outcome'];

interface AppGuardProps {
    children: React.ReactNode;
}

export default function AppGuard({ children }: AppGuardProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const requiresAuth = PROTECTED_PATHS.some((path) => pathname === path);

        if (requiresAuth && !token) {
            router.replace('/auth/signin');
            return;
        }

        if (pathname.startsWith('/auth') && token) {
            router.back();
            return;
        }

        setAuthChecked(true);
    }, [pathname]);

    if (!authChecked) {
        return (
            <FlexBox className="items-center justify-center h-screen">
                <LoadingSpinner />
            </FlexBox>
        );
    }

    return <>{children}</>;
}
