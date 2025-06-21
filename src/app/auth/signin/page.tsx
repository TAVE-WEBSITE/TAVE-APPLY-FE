import FlexBox from '@/components/layout/FlexBox';
import SignIn from './SignIn';

const page = () => {
    return (
        <FlexBox direction="col" className="min-h-screen">
            <div
                className="pt-28 pb-14 md:pt-34 md:pb-23"
                style={{
                    backgroundImage: 'url(/background/middle-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <h2 className="md:text-3xl text-2xl font-bold text-center">TAVE RECRUIT</h2>
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox
                    direction="col"
                    className="md:pt-18 pt-14 md:pb-23 pb-18 md:w-[450px] sm:w-[360px] w-[300px] mx-auto"
                >
                    <SignIn />
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default page;
