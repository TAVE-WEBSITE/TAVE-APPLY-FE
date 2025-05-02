'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icons from '@/components/Icons';

const Header = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const redirectionList = ['RECRUIT', 'FAQ', ...(isLogin ? ['MYPAGE'] : [])];

    return (
        <header
            className="fixed top-0 w-full z-50
              bg-gradient-to-b from-[#121212] from-30% to-transparent"
        >
            <div className="hidden md:flex items-center justify-between py-7 px-16 z-50">
                <Link href="/" className="z-50">
                    <Icons name="logo" width={101} height={45} />
                </Link>
                <nav>
                    <ul className="flex gap-x-12 font-bold">
                        {redirectionList.map((item, index) => (
                            <li key={index}>
                                <Link href={`/${item.toLowerCase()}`} className="relative z-50">
                                    {item}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/auth/signup"
                                className="relative z-50 bg-gradient-to-br from-[#1A5BFF] to-[#60AFFF] py-2.5 px-4 rounded-[10px]"
                            >
                                {isLogin ? 'LOGOUT' : 'LOGIN'}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div
                className={`fixed w-full flex md:hidden items-center justify-between p-7 z-50 ${
                    isMobileOpen ? 'bg-transparent' : 'bg-gradient-to-b from-black from-30% to-transparent'
                }`}
            >
                <Link href="/">
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
                        className="fixed inset-0 bg-[#121212]/0 z-10"
                        onClick={() => {
                            setIsMobileOpen(!isMobileOpen);
                        }}
                    />
                )}
                <ul
                    className={`fixed top-0 w-full bg-[#121212] pt-20 pl-7 pb-5 z-30 transition-all duration-500 ease-in-out transform font-bold ${
                        isMobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
                >
                    {redirectionList.map((item, index) => (
                        <li key={index} className="py-3 ">
                            <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                        </li>
                    ))}
                    <li className="py-6">
                        <Link
                            href="/auth/signup"
                            className="bg-gradient-to-br from-[#1A5BFF] to-[#60AFFF] py-2.5 px-4 rounded-[10px]"
                        >
                            {isLogin ? 'LOGOUT' : 'LOGIN'}
                        </Link>
                    </li>
                </ul>
            </>
        </header>
    );
};

export default Header;
