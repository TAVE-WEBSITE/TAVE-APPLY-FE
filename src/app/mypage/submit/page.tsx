import FlexBox from '@/components/layout/FlexBox';
import Submit from './Submit';

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
                <h2 className="md:text-3xl text-2xl font-bold">16TH APPLICATION</h2>
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox
                    direction="col"
                    className="md:pt-16 pt-12 md:pb-25 pb-22 md:w-[562px] sm:w-[430px] w-[308px] mx-auto gap-4"
                >
                    <Submit />
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default page;
