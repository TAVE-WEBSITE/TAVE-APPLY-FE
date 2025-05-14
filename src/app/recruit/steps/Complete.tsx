import ButtonNavigate from '@/components/Button/ButtonNavigate';
import FlexBox from '@/components/layout/FlexBox';

const completeData = [
    '1. TAVE 15기 활동은 매주 토요일에 오프라인으로 진행됩니다.',
    '2. 모든 정기 세션은 필수 참여가 원칙이며, 토요일 14시 ~ 18시 사이에 진행됩니다.',
    '3. TAVE 16기 OT 및 MT는 8/31 (토) 이며, 만남의 장은 9/7 (토) 에 진행될 예정입니다.',
    '4. 합격 후 OT 및 MT 참석, 만남의 장 불참으로 인한 합격 취소 시 회비 환불되지 않습니다.',
];

const Complete = () => {
    return (
        <FlexBox direction="col" className="text-[#394150] items-center gap-5">
            <h3 className="font-bold text-2xl">지원 완료</h3>
            <p className="text-center text-lg font-medium mb-5">
                작성해주신 서류가 성공적으로 제출되면
                <br />
                가입하신 이메일로 지원 완료 메일 전송됩니다.
            </p>
            {completeData.map((data, index) => (
                <div
                    className="font-semibold py-6 px-5 md:w-[650px] w-[320px] border rounded-[20px] border-gray-200"
                    key={index}
                >
                    {data}
                </div>
            ))}
            <ButtonNavigate text="확인했습니다" onClick={() => {}} />
        </FlexBox>
    );
};

export default Complete;
