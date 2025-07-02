import FlexBox from '@/components/layout/FlexBox';
import ButtonInquire from '@/components/Button/ButtonInquire';

interface FailedProps {
    generation: string;
    username: string;
}

const Failed = ({ username, generation }: FailedProps) => {
    return (
        <FlexBox direction="col" className="text-[#394150] items-center gap-5">
            <p className="text-lg md:text-xl font-bold text-center md:text-left md:self-start">
                {username}님
                <br />
                {generation}기 지원 결과 안내드립니다.
            </p>
            <FlexBox
                direction="col"
                className="md:p-6 p-4 text-xs md:text-sm bg-white border-gray-200 rounded-xl border gap-4 leading-[22px] w-full"
            >
                <p>
                    안녕하세요, IT 연합 동아리 TAVE {generation}기 운영진 입니다.
                    <br />
                    귀한 시간 내주어 저희 TAVE {generation}기에
                    <span className="hidden sm:inline"> </span>
                    <br className="sm:hidden" />
                    지원을 해주신 것에 깊은 감사를 드립니다.
                </p>
                <p>
                    안타깝게도 이번 {generation}기는{' '}
                    <span className="font-extrabold">함께하지 못하게 되었다는 소식</span>을
                    <span className="hidden md:inline"> </span>
                    <br className="md:hidden" />
                    전하게 되어 마음이 무겁습니다.
                    <br />
                    지원해 주신 많은 분들의 뛰어난 역량 덕분에 선발 과정이 쉽지 않았으며,
                    <br className="hidden sm:inline" />
                    <span className="sm:hidden"> </span>신중한 고민 끝에 결정하게 되었습니다.
                </p>
                <p>
                    비록 이번에는 좋은 만남을 이어나갈 수 없게 되었지만,
                    <br />
                    이후에 더욱 성장한 모습으로 다시 만날 수 있기를
                    <span className="hidden sm:inline"> </span>
                    <br className="sm:hidden" />
                    진심으로 바랍니다.
                </p>
                <p>
                    TAVE도 더욱 성장하여 다음 기회에는 더욱 많은 분들을
                    <span className="hidden sm:inline"> </span>
                    <br className="sm:hidden" />
                    모실 수 있도록 노력하겠습니다.
                    <br />
                    감사합니다.
                </p>
                <p className="text-zinc-400">TAVE 운영진 드림</p>
            </FlexBox>
            <ButtonInquire />
        </FlexBox>
    );
};

export default Failed;
