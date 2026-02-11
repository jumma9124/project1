// 은행과 저축 (돈 모으기)
const bankingData = {
  6: {
    name: '예금',
    eng: 'Time Deposit',
    category: 'banking',
    title: '예금',
    description: '목돈을 한 번에 맡기고 만기에 이자를 받는 상품이에요.',
    videoUrl: null,
    bullets: [
      '목돈을 한꺼번에 넣고 정해진 기간 동안 맡겨요.',
      '만기까지 기다리면 약속한 이자를 받을 수 있어요.',
      '중간에 빼면 이자가 줄어드니 주의하세요!',
    ],
  },
  7: {
    name: '적금',
    eng: 'Installment Savings',
    category: 'banking',
    title: '적금',
    description: '매달 조금씩 모아서 목돈을 만드는 상품이에요.',
    videoUrl: null,
    bullets: [
      '매달 정해진 금액을 꼬박꼬박 저축해요.',
      '만기가 되면 원금 + 이자를 한꺼번에 받아요.',
      '첫 월급부터 시작하면 좋은 저축 습관이 돼요!',
    ],
  },
  8: {
    name: '단리 vs 복리',
    eng: 'Simple vs Compound Interest',
    category: 'banking',
    title: '단리 vs 복리',
    description: '이자를 계산하는 두 가지 방법이에요.',
    videoUrl: null,
    bullets: [
      '단리: 처음 넣은 돈에만 이자가 붙어요.',
      '복리: 이자에도 이자가 붙어서 눈덩이처럼 불어나요.',
      '오래 맡길수록 복리의 힘이 커져요!',
    ],
  },
  9: {
    name: '비과세',
    eng: 'Tax-exempt',
    category: 'banking',
    title: '비과세',
    description: '이자에 붙는 세금을 면제받는 혜택이에요.',
    videoUrl: null,
    bullets: [
      '보통 이자의 15.4%가 세금으로 빠져나가요.',
      '비과세 상품은 이 세금을 안 내도 돼요.',
      '가입 조건이 있으니 꼭 확인해 보세요!',
    ],
  },
  10: {
    name: 'ISA',
    eng: '마법 바구니',
    category: 'banking',
    title: 'ISA (마법 바구니)',
    description: '여러 금융 상품을 하나의 바구니에 담아 세금 혜택까지 받는 마법의 바구니예요!',
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/project1-13bc0.firebasestorage.app/o/project1%2Fvideo%2FFirefly%20%5B%ED%99%94%EB%A9%B4%20%EA%B5%AC%EC%84%B1%EC%95%88%5D%20ISA%20%27%EB%A7%88%EB%B2%95%20%EB%B0%94%EA%B5%AC%EB%8B%88%27%20%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98__%EC%A7%80%ED%95%98%EC%B2%A0%EC%9D%B4%EB%82%98%20%EB%B2%84%EC%8A%A4%EC%97%90%EC%84%9C%20%EC%98%86%20%EC%82%AC%EB%9E%8C%EC%9D%B4%20%EB%B4%90%EB%8F%84%20%EA%B8%88%EC%9C%B5%20%EA%B3%B5%EB%B6%80%EA%B0%80%20%EC%95%84%EB%8B%88%EB%9D%BC%20%EA%B7%80%EC%97%AC%EC%9A%B4%20%EC%9B%B9%ED%88%B0%EC%9D%B4%EB%82%98%20%EC%BA%90%EB%A6%AD%ED%84%B0%20%EC%98%81%EC%83%81%EC%9D%84%20%EB%B3%B4%EB%8A%94%20%EA%B2%83%EC%B2%98%EB%9F%BC%20%EB%8A%90%EA%BB%B4%EC%A7%80%EA%B2%8C%20%ED%95%98%EB%8A%94%20.mp4?alt=media&token=60829299-a007-493d-aa45-b6b046feb271',
    bullets: [
      '예금, 적금, 펀드, ETF를 하나의 계좌에 담을 수 있어요.',
      '일정 기간 유지하면 수익에 대한 세금을 줄여줘요.',
      '매년 최대 2,000만 원까지 넣을 수 있어요.',
    ],
  },
  11: {
    name: 'CMA/파킹통장',
    eng: '주차장',
    category: 'banking',
    title: 'CMA/파킹통장 (Parking Account)',
    description: '잠깐만 주차해도 이자가 쌓이는 마법의 주차장이에요!',
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/project1-13bc0.firebasestorage.app/o/project1%2Fvideo%2FCMA_Parking_Account_Video_Concept.mp4?alt=media&token=c5b908d4-93b4-4a98-a834-98f604c3b218',
    bullets: [
      '하루만 맡겨도 이자가 붙어요.',
      '언제든지 넣고 뺄 수 있어 편리해요.',
      '비상금을 모아두기에 딱 좋아요!',
    ],
  },
};

export default bankingData;
