import Icons, { IconKeys } from '@/components/Icons';
import FlexBox from '../components/layout/FlexBox';
import CardSchedule from '@/components/card/CardSchedule';
import CardTarget from '@/components/card/CardTarget';
import GroupField from '@/components/group/GroupField';
import GroupChip from '@/components/group/GroupChip';
import { scheduleData, targetData } from '@/utils/homeContent';

const Home = () => {
    return (
        <FlexBox direction="col">
            <FlexBox direction="col" className="h-dvh justify-between">
                <FlexBox direction="col" className="h-full justify-center items-center">
                    <Icons name="logoSm" height={44} width={87} />
                    <p className="opacity-50 font-medium">The new technology wave</p>
                    <h2 className="font-bold md:text-4xl text-2xl mt-6 leading-snug text-center">
                        기술의 물결 속에서 함께 성장할
                        <br />
                        15기 TAVY 를 기다립니다
                    </h2>
                </FlexBox>
                <FlexBox className="justify-center pb-10">
                    <Icons name="circleArrow" height={40} width={40} />
                </FlexBox>
            </FlexBox>
            <FlexBox direction="col" className="h-dvh justify-center items-center gap-10">
                <h3 className="font-bold md:text-3xl text-2xl">15기 모집 일정</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-4.5 sm:gap-3.5 gap-2.5">
                    {scheduleData.map((item, index) => (
                        <CardSchedule
                            key={index}
                            iconName={item.iconName as IconKeys}
                            title={item.title}
                            description={item.description}
                            extra={item.extra}
                        />
                    ))}
                </div>
            </FlexBox>
            <FlexBox direction="col" className="h-dvh justify-center items-center gap-5">
                <h3 className="font-bold md:text-3xl text-2xl">지원 대상</h3>
                <p className="md:text-2xl sm:text-xl text-lg font-medium leading-snug text-center">
                    다양성을 존중하며 협력하는 IT에 관심있는
                    <br className="md:hidden" />
                    <span className="font-bold text-[#6a9eff]"> 대학생 누구나</span> 지원 가능합니다.
                </p>
                <FlexBox className="mt-5 w-full overflow-x-auto justify-start lg:justify-center px-6 scrollbar-hide">
                    <FlexBox className="gap-4 md:gap-6">
                        {targetData.map((item, index) => (
                            <CardTarget key={index} title={item.title} description={item.description} />
                        ))}
                    </FlexBox>
                </FlexBox>
            </FlexBox>
            <FlexBox direction="col" className="h-dvh justify-center items-center gap-10 md:mx-auto">
                <h3 className="font-bold md:text-3xl text-2xl">모집 분야</h3>
                <GroupField />
            </FlexBox>
            <FlexBox direction="col" className="h-dvh justify-center items-center gap-5 mx-auto">
                <h3 className="font-bold md:text-3xl text-2xl">주요 세션 일정</h3>
                <p className="md:text-xl text-lg leading-relaxed text-center opacity-60">
                    매주 토요일마다 세션 또는 활동이 진행되며,
                    <br className="md:hidden" /> 오프라인으로 진행됩니다
                </p>
                <GroupChip />
            </FlexBox>
        </FlexBox>
    );
};

export default Home;
