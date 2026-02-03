import FlexBox from '@/components/layout/FlexBox';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import { useRouter } from 'next/navigation';

interface GuideProps {
    type: 'period' | 'submit';
}

const Guide = ({ type }: GuideProps) => {
    const router = useRouter();
    return (
        <FlexBox direction="col" className="items-center justify-center h-full gap-7">
            <p className="text-gray-700 sm:text-3xl text-2xl font-bold">
                {type === 'period' ? '현재는 서류 지원 기간이 아닙니다.' : '이미 지원을 완료하셨습니다.'}
            </p>
            <FlexBox className="items-center">
                <ButtonNavigate
                    text="돌아가기"
                    onClick={() => {
                        router.push('/');
                    }}
                />
            </FlexBox>
        </FlexBox>
    );
};

export default Guide;
