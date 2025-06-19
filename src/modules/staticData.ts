import hoverWeb from '../../public/card/hover-web.png';
import hoverApp from '../../public/card/hover-app.png';
import hoverBack from '../../public/card/hover-back.png';
import hoverDeep from '../../public/card/hover-deep.png';
import hoverData from '../../public/card/hover-data.png';
import hoverDesign from '../../public/card/hover-design.png';
import web from '../../public/card/web-card.png';
import app from '../../public/card/app-card.png';
import back from '../../public/card/back-card.png';
import deep from '../../public/card/deep-card.png';
import data from '../../public/card/data-card.png';
import design from '../../public/card/design-card.png';

const fieldData = [
    {
        title: '웹 프론트엔드',
        subTitle: 'WEB FRONTEND',
        description: `아름답고 직관적인 웹 경험을 창조해\n나가며, 다양한 의견을 수렴하여\n성장하는 웹사이트를 만들어갑니다.`,
        imgSrc: web,
        hoverSrc: hoverWeb,
    },
    {
        title: '앱 프론트엔드',
        subTitle: 'APP FRONTEND',
        description: `사용자와의 소통을 통해 다양한 경험을\n모아, 손끝에서 펼쳐지는 매력적인\n인터페이스를 설계하며, 언제 어디서나\n편리한 경험 제공에 열정을 다합니다.`,
        imgSrc: app,
        hoverSrc: hoverApp,
    },

    {
        title: '백엔드',
        subTitle: 'BACKEND',
        description: `데이터를 안전하게 저장하고, 비즈니스\n로직을 구현해 사용자 요청에 신속하고\n정확하게 응답하며, 다양한 기술을 접목해\n안정적인 서비스를 위해 끊임없이 진화합니다.`,
        imgSrc: back,
        hoverSrc: hoverBack,
    },
    {
        title: '데이터 분석',
        subTitle: 'DATA ANALYSIS',
        description: `방대한 데이터 속 패턴과 인사이트를\n발견하며, 팀의 의사 결정을 지원하고,\n다양한 관점을 통해 더 나은 미래를\n설계하는 데 기여합니다.`,
        imgSrc: data,
        hoverSrc: hoverData,
    },
    {
        title: '딥러닝',
        subTitle: 'DEEP LEARNING',
        description: `복잡한 문제 해결을 위해 심층 신경망을\n설계하며, 인간의 인지 능력을 모방하여\n세상의 다양한 문제에 도전하고,\n새로운 변화를 일으키는 데 열정을 쏟습니다.`,
        imgSrc: deep,
        hoverSrc: hoverDeep,
    },
    {
        title: '디자인',
        subTitle: 'DESIGN',
        description: `변화하는 디자인 트렌드를 이끌어가고,\n다양한 아이디어를 수렴하고,\n사용자 경험을 최우선으로 고려하여,\n아름답고 직관적인 물결을 일으킵니다.`,
        imgSrc: design,
        hoverSrc: hoverDesign,
    },
];

const faqRecruitData = [
    {
        question: '관련 경험이 부족해도 지원할 수 있나요?',
        answer: '관련 경험이 없어도 괜찮습니다. TAVE는 개발 경험보다 적극적인 태도, 열정, 그리고 책임감을 더 중요하게 생각합니다.',
    },
    {
        question: '여러 직군에 중복하여 지원하는 것이 가능한가요?',
        answer: '여러 분야에 중복 지원은 불가능합니다. 중복 지원자의 경우 먼저 제출한 지원서를 기준으로 처리합니다. 가장 열정을 갖고 TAVE에서 활동하고 싶은 분야 하나를 선택해 지원해 주세요!',
    },
    {
        question: '대학생이 아닌 졸업생이나 재직자도 활동에 참여할 수 있나요?',
        answer: 'TAVE는 대학생, 대학원생, 취업 준비 중인 졸업생이라면 누구나 지원할 수 있습니다. 다만 재직 중인 분들의 경우, 활동 일정과의 병행이 어려워 참여가 제한될 수 있다는 점 양해 부탁드립니다.',
    },
    {
        question: '면접은 어떤 방식으로 진행되나요?',
        answer: '면접은 오프라인 3 대 3 면접으로 25분간 동아리 임원진과 이야기를 나누는 형식으로 진행됩니다. 오프라인 면접이 원칙이나, 불가피한 사유로 인한 대면 면접이 힘드실 경우, TAVE 공식 카카오 채널 혹은 인스타 DM으로 문의 바랍니다.',
    },
    {
        question: '해당 분야에 기초적인 베이스 지식이 있어야만 지원할 수 있을까요?',
        answer: '기술적 역량이 회원 선발의 주요한 기준은 아니지만, 스터디를 원활하게 진행하기 위해 최소한의 기본 지식을 갖춘 상태에서 지원하는 것을 권장합니다. 팀 빌딩은 초급부터 수준에 맞는 팀원을 만나 구성할 수 있지만, 활동을 따라가기 위한 기본적인 이해도는 필요하기 때문입니다.',
    },
    {
        question: '면접 장소의 위치를 미리 알 수 있나요?',
        answer: '면접 장소는 현재 서울 소재 대학교로 정해졌으며, 구체적인 장소는 서류 합격 후 추후 안내될 예정입니다. 지원자분들의 형평성을 위해 정확한 위치는 말씀드릴 수 없는 점 양해 부탁드립니다.',
    },
];

const faqActivityData = [
    {
        question: '한 기수 활동 종료 후에도 지속적으로 활동할 수 있나요?',
        answer: 'TAVE는 첫 기수 동안 YB로 활동한 후 수료를 완료하면, OB 전환금을 납부하여 OB로 전환되어 지속적으로 활동할 수 있습니다.',
    },
    {
        question: '정규 세션 및 스터디는 주로 어디서 진행되나요?',
        answer: '정규 세션 장소는 대관 장소 여부에 따라 유동적이며, 지난 기수 기준 충정로, 신촌, 청량리 부근에서 진행되었습니다. 정규 스터디/프로젝트 장소는 편성된 팀원들과 조율하에 모임 장소를 자유롭게 정하실 수 있습니다.',
    },
    {
        question: '전반기 활동과 후반기 활동의 주요 차이점은 무엇인가요?',
        answer: '전반기에는 같은 분야의 지원자들이 팀을 이루어 스터디를 진행합니다. 후반기에는 다양한 분야의 사람들과 협업하는 연합 프로젝트와, 같은 분야 구성원들이 보다 깊이 있는 심화를 진행하는 심화 프로젝트가 진행됩니다.',
    },
    {
        question: '스터디, 프로젝트 진행에 정해진 일정이 있나요?',
        answer: '스터디 기간 동안 스터디를 매주 토요일 2시간씩 오프라인으로 진행하는 것이 원칙입니다. 이 원칙만 준수하신다면, 구체적인 장소와 시간대는 팀원들과의 조율을 통해 자유롭게 정하실 수 있습니다.',
    },
    {
        question: '동아리의 정기 모임 요일이 어떻게 되나요? 또한 이외 요일은 어떻게 운영될까요?',
        answer: '모든 정기행사 및 스터디/프로젝트 일정은 토요일에 진행됩니다. 정기 행사 시간은 2~6시 사이로 고정이고, 스터디/프로젝트 시간은 팀원들과 조율하에 자유롭게 설정하실 수 있습니다. 이 외 요일에는 필수 세션은 없으나, 스터디/프로젝트 기간에는 팀의 기획안에 따라 평일에도 개인 스터디를 진행하거나 과업을 수행할 수 있습니다. 번외로, 동아리 내에서는 활동이 원활하게 이루어질 수 있도록 운영진들이 주 단위로 스터디 진행 상황을 점검하고 있습니다.',
    },
    {
        question: '활동이 토요일 필참이라고 되어있는데 시간대는 어떻게 되나요?',
        answer: '모집 요강에 기재된 정규 세션은 주로 오후 2~6시 사이에 진행됩니다. 정규 세션이 아닌, 전반기 스터디와 후반기 프로젝트 기간에는 편성된 팀별로 활동 시간을 상이하게 정할 수 있습니다. 이 기간에는 매주 토요일 2시간 오프라인 스터디/프로젝트 진행 원칙을 준수하되, 구체적인 시간대는 같은 팀원끼리 조율해 활동하시면 됩니다.',
    },
    {
        question: '토요일 정규 세션에 대외 활동 등의 사유로 불참이 허용되나요?',
        answer: '토요일 정규 세션은 원칙적으로 필참이며, 스터디/프로젝트 기간에 약 1~2주 정도의 휴동이 허용됩니다. 인정 불참 사유(기사 시험, 경조사, 회사 면접 등)가 아닌 경우 활동 점수가 크게 감점되며, 일정 점수 미만이 되면 자동으로 탈퇴 처리 됩니다. 타 대외 활동의 경우, 불참 인정 허용이 되지 않으므로 겹치지 않게 일정을 미리 확인 후 지원 부탁드립니다. 활동 점수 감점 목록 등 자세한 사항이 궁금하시면, TAVE 공식 카카오 채널 혹은 인스타 DM으로 문의 바랍니다.',
    },
    {
        question:
            '대학교 시험기간엔 정규 세션 일정이 없는데 스터디같은 정규 세션이 아닌 일정도 시험기간을 고려하여 진행되나요?',
        answer: '스터디 및 프로젝트 기간은 각각 약 7주, 9주가 주어집니다. 정해진 기간 내에 팀원들과 시간대를 조율하여 6주, 7주 이상만 토요일 오프라인 스터디를 진행하시면 됩니다.',
    },
];

const targetData = [
    {
        title: '꾸준한 활동',
        description: '매주 토요일에 진행 되는\n정기 세션 또는 팀 활동 가능한 분',
    },
    {
        title: '주도적 리더쉽',
        description: '활동 기간에 주어진 역할을\n책임감 있게 소화하실 수 있는 분',
    },
    {
        title: '끊임없는 성장',
        description: '자신의 커리어를\n끊임없이 성장시키고 싶은 분',
    },
];

export { targetData, fieldData, faqActivityData, faqRecruitData };
