'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PROTECTED_PATHS = ['/recruit', '/mypage', '/outcome'];

interface AppGuardProps {
    children: React.ReactNode;
}

export default function AppGuard({ children }: AppGuardProps) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const requiresAuth = PROTECTED_PATHS.some((path) => pathname === path);
        const token = localStorage.getItem('accessToken');

        if (requiresAuth && !token) {
            router.replace('/auth/signin');
        }
    }, [pathname]);

    return <>{children}</>;
}
