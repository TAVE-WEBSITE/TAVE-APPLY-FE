"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Login from "../Modal/Login";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /** 헤더 리디렉션 될 페이지 리스트 */
  const redirectionList = ["RECRUIT", "FAQ", "MYPAGE"];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black from-30% to-transparent bg-[#121212] ${
        isMenuOpen ? "bg-[#121212]" : ""
      }`}
    >
      {/* PC 헤더 */}
      <div className="hidden md:flex items-center justify-between py-4 px-20 z-50">
        <Link href="/" className="items-start relative z-50">
          <Image
            src="/tave-logo-sm.svg"
            width={102}
            height={46}
            alt="tave-logo"
            priority
          />
        </Link>

        <nav className="flex items-end text-white">
          <ul className="flex items-center gap-x-10">
            {redirectionList.map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="cursor-pointer relative z-50 font-bold"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <div className="bg-gradient-to-r from-[#1A5BFF] to-[#60AFFF] py-2 px-6 rounded-lg text-center font-bold">
                <button
                  className="cursor-pointer relative z-50"
                  onClick={() => setIsModalOpen(true)}
                >
                  지원하기
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* 모바일 헤더 */}
      <div
        className={`fixed top-0 w-full flex md:hidden items-center justify-between py-4 px-4 z-50 ${
          isMenuOpen
            ? "bg-[#121212]"
            : "bg-gradient-to-b from-black from-30% to-transparent"
        }`}
      >
        <Link href={"/"} className="items-start">
          <Image
            src="/tave-logo-sm.svg"
            width={102}
            height={46}
            alt="tave-logo"
            priority
          />
        </Link>

        <button
          onClick={handleMenuToggle}
          className="w-8 h-8 flex flex-col justify-center items-center md:hidden focus:outline-none"
        >
          <div
            className={`hamburger space-y-1.5 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "open" : ""
            }`}
          >
            <span
              className={`block w-5 h-0.5 bg-white rounded transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white rounded transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white rounded transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <>
        {/* 오버레이 */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={handleMenuToggle}
          ></div>
        )}

        {/* 메뉴 */}
        <ul
          className={`fixed top-16 w-full bg-[#121212] text-white pl-5 pb-5 z-40 transition-all duration-500 ease-in-out transform ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 "
          }`}
        >
          {redirectionList.map((item, index) => (
            <li key={index} className="text-base py-3 font-extralight">
              <Link href="/" className="cursor-pointer relative z-10 font-bold">
                {item}
              </Link>
            </li>
          ))}
          <li className="py-3">
            <div className="flex items-center justify-center bg-gradient-to-r from-[#1A5BFF] to-[#60AFFF] rounded-lg text-center w-20 h-9">
              <button
                className="cursor-pointer text-base font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                지원하기
              </button>
            </div>
          </li>
        </ul>
      </>

      {isModalOpen && <Login isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </header>
  );
}
