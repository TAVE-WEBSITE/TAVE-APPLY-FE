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

const scheduleData = [
    {
        iconName: 'file',
        title: '서류 접수',
        description: '3월 2일 (월) - 3월 15일 (수)',
    },
    {
        iconName: 'calendar',
        title: '서류 발표',
        description: '3월 2일 (월) 오후 6시',
    },
    {
        iconName: 'user',
        title: '면접 진행',
        description: '3월 2일 (월) - 3월 15일 (수)',
        extra: '* 온/오프라인 별도 안내',
    },
    {
        iconName: 'award',
        title: '최종 발표',
        description: '3월 2일 (월) 오후 6시',
    },
];

const targetData = [
    {
        title: '꾸준한 활동',
        description: '매주 토요일에 진행 되는\n정기 세션 또는 팀 활동 가능한 분',
    },
    {
        title: '주도적 리더쉽',
        description: '활동 기간에 주어진 역할을\n책임감있게 소화하실 수 있는 분',
    },
    {
        title: '끊임없는 성장',
        description: '자신의 커리어를\n끊임없이 성장시키고 싶은 분',
    },
];

const sessionData = {
    start: [
        { title: 'OT', date: '0월 0일 (토)' },
        { title: 'MT', date: '0월 0일 (토)' },
    ],
    one: [
        { title: '전반기 만남의 장', date: '0월 0일 (토)' },
        { title: '테버랜드', date: '0월 0일 (토)' },
        { title: '전반기 시상식', date: '0월 0일 (토)' },
    ],
    two: [
        { title: '후반기 만남의 장', date: '0월 0일 (토)' },
        { title: '테런데이', date: '0월 0일 (토)' },
        { title: 'OB 강연', date: '0월 0일 (토)' },
        { title: '컨퍼런스', date: '0월 0일 (토)' },
        { title: '테이브의 밤', date: '0월 0일 (토)' },
    ],
};

export { targetData, scheduleData, fieldData, sessionData };
