// 신용과 대출 (신용 관리)
const creditData = {
  12: {
    name: '신용점수',
    eng: 'Credit Score',
    category: 'credit',
    title: '신용점수',
    description: '나의 금융 신뢰도를 숫자로 보여주는 점수예요.',
    videoUrl: null,
    bullets: [
      '1~1000점 사이 숫자로 내 신용 상태를 보여줘요.',
      '점수가 높을수록 대출 금리가 낮아져요.',
      '카드값을 꼬박꼬박 내면 점수가 올라가요!',
    ],
  },
  13: {
    name: '원금',
    eng: 'Principal',
    category: 'credit',
    title: '원금',
    description: '빌리거나 저축한 원래 금액이에요.',
    videoUrl: null,
    bullets: [
      '처음에 빌린(또는 맡긴) 돈 자체를 원금이라고 해요.',
      '대출 상환 시 원금 + 이자를 함께 갚아요.',
      '원금을 빨리 줄이면 이자도 함께 줄어요.',
    ],
  },
  14: {
    name: '원리금',
    eng: 'Principal + Interest',
    category: 'credit',
    title: '원리금',
    description: '원금과 이자를 합친 금액이에요.',
    videoUrl: null,
    bullets: [
      '원금(빌린 돈) + 이자(빌린 대가)를 합한 거예요.',
      '매달 갚는 원리금이 일정하면 "원리금균등상환"이에요.',
      '총 원리금을 알아야 진짜 부담을 알 수 있어요.',
    ],
  },
  15: {
    name: '대출',
    eng: 'Loan',
    category: 'credit',
    title: '대출',
    description: '사회초년생에게 필요한 대출 관련 정보',
    videoUrl: null,
    bullets: [
      '신용대출: 직장과 연봉을 보고 빌려주는 돈이에요.',
      '전월세대출: 이사 갈 때 꼭 필요한 청년 맞춤형 대출이에요.',
      '햇살론 유스: 국가가 보증하는 만 34세 이하 청년 전용 대출이에요.',
    ],
  },
  16: {
    name: '마이너스 통장',
    eng: 'Overdraft',
    category: 'credit',
    title: '마이너스 통장',
    description: '통장 잔고가 0원 이하로 내려가도 돈을 쓸 수 있는 대출이에요.',
    videoUrl: null,
    bullets: [
      '한도 내에서 자유롭게 빌리고 갚을 수 있어요.',
      '쓴 만큼만 이자가 붙어서 유연해요.',
      '하지만 결국 "대출"이니 신중하게 사용하세요!',
    ],
  },
  17: {
    name: 'DSR',
    eng: 'Debt Service Ratio',
    category: 'credit',
    title: 'DSR (총부채원리금상환비율)',
    description: '연소득 대비 대출 갚는 돈의 비율이에요.',
    videoUrl: null,
    bullets: [
      '내 연소득 중 대출 상환에 쓰는 비율이에요.',
      'DSR이 높으면 추가 대출이 어려워요.',
      '보통 40% 이하로 유지하는 게 좋아요.',
    ],
  },
};

export default creditData;
