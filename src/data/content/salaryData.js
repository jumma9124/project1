// 월급과 세금 (급여 관리 기초)
const salaryData = {
  1: {
    name: '세전/세후',
    eng: 'Pre-tax / After-tax',
    category: 'salary',
    title: '세전/세후',
    description: '내 월급에서 세금을 빼기 전과 뺀 후 금액이에요.',
    videoUrl: null,
    bullets: [
      '세전은 세금을 빼기 전 금액, 세후는 뺀 후 금액이에요.',
      '면접 때 연봉은 보통 세전 기준이에요.',
      '실제로 받는 돈(실수령액)은 세후 금액이에요.',
    ],
  },
  2: {
    name: '실수령액',
    eng: 'Net Pay',
    category: 'salary',
    title: '실수령액',
    description: '세금과 4대 보험료를 빼고 실제로 통장에 들어오는 금액이에요.',
    videoUrl: null,
    bullets: [
      '월급에서 소득세, 건강보험, 국민연금 등을 빼고 남은 돈이에요.',
      '연봉 3,000만 원이면 실수령 약 220만 원 정도예요.',
      '4대 보험은 나중에 나에게 돌아오는 돈이기도 해요.',
    ],
  },
  3: {
    name: '연말정산',
    eng: 'Year-end Tax Settlement',
    category: 'salary',
    title: '연말정산',
    description: '1년 동안 낸 세금을 다시 계산해서 더 냈으면 돌려받는 거예요.',
    videoUrl: null,
    bullets: [
      '매달 월급에서 미리 뗀 세금을 연말에 다시 정산해요.',
      '카드 사용, 의료비, 교육비 등으로 세금을 줄일 수 있어요.',
      '"13월의 월급"이라고도 불려요!',
    ],
  },
  4: {
    name: '소득공제/세액공제',
    eng: 'Deductions / Tax Credits',
    category: 'salary',
    title: '소득공제 / 세액공제',
    description: '세금을 줄여주는 두 가지 방법이에요.',
    videoUrl: null,
    bullets: [
      '소득공제: 세금을 매기는 기준 금액을 줄여줘요.',
      '세액공제: 이미 계산된 세금에서 직접 빼줘요.',
      '체크카드, 연금저축 등이 대표적인 공제 항목이에요.',
    ],
  },
  5: {
    name: '고정지출/변동지출',
    eng: 'Fixed / Variable Expenses',
    category: 'salary',
    title: '고정지출 / 변동지출',
    description: '매달 나가는 돈의 종류를 나눠서 관리하는 방법이에요.',
    videoUrl: null,
    bullets: [
      '고정지출: 월세, 통신비처럼 매달 같은 금액이 나가요.',
      '변동지출: 식비, 쇼핑처럼 매달 다른 금액이 나가요.',
      '고정지출을 먼저 파악하면 가계부 관리가 쉬워져요.',
    ],
  },
};

export default salaryData;
