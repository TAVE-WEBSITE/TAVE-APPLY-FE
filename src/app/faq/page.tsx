import FlexBox from '@/components/layout/FlexBox';
import Link from 'next/link';
import Icons from '@/components/Icons';
import Faq from './Faq';

const page = () => {
    return (
        <FlexBox direction="col" className="min-h-screen">
            <div
                className="flex flex-col md:pt-40 md:pb-25 pt-26 pb-14 justify-center gap-2 text-center"
                style={{
                    backgroundImage: 'url(/background/side-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <h2 className="md:text-3xl text-2xl font-bold">자주 물어보는 질문</h2>
                <p className="opacity-80 md:text-lg font-medium">자세한 문의는 1:1 문의를 이용해주세요</p>
                <FlexBox className="justify-center gap-5 md:mt-7 mt-4 font-medium md:text-base text-sm">
                    <Link href="mailto:t-ave@naver.com" className="flex gap-2 px-4 py-3 rounded-[14px] bg-white/25">
                        <Icons name="mail" width={18} height={18} />
                        메일 문의
                    </Link>
                    <Link href="http://pf.kakao.com/_wJbyG" className="flex gap-2 px-4 py-3 rounded-[14px] bg-white/25">
                        <Icons name="message" width={18} height={18} />
                        채팅 문의
                    </Link>
                </FlexBox>
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox
                    direction="col"
                    className="md:pt-16 pt-12 pb-20 md:w-[562px] sm:w-[430px] w-[308px] mx-auto gap-10"
                >
                    <Faq />
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default page;
