'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMemberStore } from '@/store/memberStore';
import Link from 'next/link';
import Icons from '@/components/Icons';
import useAuth from '@/hooks/useAuth';

const Header = () => {
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { isLogin } = useMemberStore();
    const { signOut } = useAuth();

    const redirectionList = [...(isLogin ? ['RECRUIT'] : []), 'FAQ', ...(isLogin ? ['MYPAGE'] : [])];

    const handleLoginAndOut = async () => {
        if (!isLogin) {
            setIsMobileOpen(false);
            router.push('/auth/signin');
        } else {
            const res = await signOut();
            if (res === 200) {
                setIsMobileOpen(false);
                window.location.replace('/');
            } else {
                alert('문제가 발생했어요.\n캐시를 비운 후 새로고침 해주세요.');
            }
        }
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#121212] from-25% to-transparent">
            <div className="hidden md:flex items-center justify-between py-7 px-16 z-50">
                <Link href="/">
                    <Icons name="logo" width={101} height={45} />
                </Link>
                <nav>
                    <ul className="flex gap-x-12 font-bold items-center">
                        {redirectionList.map((item, index) => (
                            <li key={index}>
                                <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                            </li>
                        ))}
                        <li>
                            <button
                                className="bg-gradient-to-br from-blue-600 to-blue-400 py-2 px-4 rounded-[10px] cursor-pointer"
                                onClick={handleLoginAndOut}
                            >
                                {isLogin ? 'LOGOUT' : 'LOGIN'}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div
                className="fixed w-full flex md:hidden items-center justify-between p-7 z-50
                bg-gradient-to-b from-black from-25% to-transparent"
            >
                <Link href="/" onClick={() => setIsMobileOpen(false)}>
                    <Icons name="logo" width={101} height={45} />
                </Link>
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="cursor-pointer w-8 flex flex-col items-center"
                >
                    <div className="space-y-1.5 transition-all duration-300 ease-in-out">
                        <span
                            className={`block h-0.5 bg-white rounded transform transition-all duration-300 ${
                                isMobileOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                        ></span>
                        <span
                            className={`block h-0.5 bg-white rounded transition-opacity duration-300 ${
                                isMobileOpen ? 'opacity-0' : ''
                            }`}
                        ></span>
                        <span
                            className={`block w-5 h-0.5 bg-white rounded transform transition-all duration-300 ${
                                isMobileOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                        ></span>
                    </div>
                </button>
            </div>
            <>
                {isMobileOpen && (
                    <div
                        className="fixed inset-0 bg-transparent z-10 md:hidden"
                        onClick={() => {
                            setIsMobileOpen(!isMobileOpen);
                        }}
                    />
                )}
                <ul
                    className={`md:hidden fixed top-0 w-full bg-[#121212] pt-20 pl-7 pb-5 z-30 transition-all duration-500 ease-in-out transform font-bold ${
                        isMobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
                >
                    {redirectionList.map((item, index) => (
                        <li key={index} className="py-3">
                            <Link onClick={() => setIsMobileOpen(false)} href={`/${item.toLowerCase()}`}>
                                {item}
                            </Link>
                        </li>
                    ))}
                    <li className="py-5">
                        <button
                            className="bg-gradient-to-br from-blue-600 to-blue-400 py-2 px-4 rounded-[10px] cursor-pointer"
                            onClick={handleLoginAndOut}
                        >
                            {isLogin ? 'LOGOUT' : 'LOGIN'}
                        </button>
                    </li>
                </ul>
            </>
        </header>
    );
};

export default Header;
