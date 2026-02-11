import React, { useState } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function TaxFreeSection() {
  const fmt = (n) => n.toLocaleString();

  // 예시: 100만원 이자
  const INTEREST = 1_000_000;
  const TAX_RATE = 0.154; // 15.4%
  const TAX_AMOUNT = Math.round(INTEREST * TAX_RATE);
  const AFTER_TAX = INTEREST - TAX_AMOUNT;

  // 아코디언 상태 관리
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 이자소득세란? ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">이자소득세 15.4%란?</h3>

        <div className="grid grid-cols-2 gap-3">
          {/* 세금 카드 */}
          <div className="bg-[#FFF9F0] rounded-2xl p-4 flex flex-col items-center text-center border border-[#FFEDD5]/50">
            <span className="text-2xl mb-2">💸</span>
            <p className="text-[11px] font-bold text-[#FF8A00] mb-1">이자의 15.4%가 세금!</p>
            <p className="text-[9px] text-[#4A3F35] leading-relaxed">
              이자 받으면<br />
              <span className="font-bold text-[#FF8A00]">15.4%</span>가 자동 공제돼요
            </p>
          </div>

          {/* 비과세 카드 */}
          <div className="bg-[#F0FDF4] rounded-2xl p-4 flex flex-col items-center text-center border border-[#D1FAE5]/50">
            <span className="text-2xl mb-2">🛡️</span>
            <p className="text-[11px] font-bold text-[#059669] mb-1">비과세는 세금 0원!</p>
            <p className="text-[9px] text-[#4A3F35] leading-relaxed">
              이 세금을<br />
              <span className="font-bold text-[#059669]">한 푼도 안 내요</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── 세금 비교 시각화 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">100만원 이자, 세금 차이는?</h3>
        <p className="text-[11px] text-[#8B7E74] mb-5">같은 이자라도 비과세 여부에 따라 이렇게 달라져요</p>

        <div className="space-y-6">
          {/* 일반 통장 (세금 O) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">💸</span>
              <p className="text-[12px] font-bold text-[#4A3F35]">일반 통장 (세금 O)</p>
            </div>

            <div className="relative">
              {/* 전체 막대 */}
              <div className="w-full h-16 bg-[#EFF6FF] rounded-xl overflow-hidden flex">
                {/* 실수령액 (파란색) */}
                <div
                  className="bg-[#60A5FA] flex items-center justify-center"
                  style={{ width: `${(AFTER_TAX / INTEREST) * 100}%` }}
                >
                  <span className="text-[11px] font-bold text-white">실수령</span>
                </div>
                {/* 세금 (빨간색) */}
                <div
                  className="bg-[#F87171] flex items-center justify-center relative"
                  style={{ width: `${(TAX_AMOUNT / INTEREST) * 100}%` }}
                >
                  <span className="text-[11px] font-bold text-white">세금</span>
                  {/* 세금 빠져나가는 화살표 효과 */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-[#F87171]"></div>
                  </div>
                </div>
              </div>

              {/* 금액 표시 */}
              <div className="flex justify-between mt-2 text-[10px]">
                <span className="text-[#60A5FA] font-bold">{fmt(AFTER_TAX)}원</span>
                <span className="text-[#F87171] font-bold">-{fmt(TAX_AMOUNT)}원</span>
              </div>
            </div>
          </div>

          {/* 비과세 통장 (세금 X) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🛡️</span>
              <p className="text-[12px] font-bold text-[#4A3F35]">비과세 통장 (세금 X)</p>
            </div>

            <div className="relative">
              {/* 전체 막대 */}
              <div className="w-full h-16 bg-[#F0FDF4] rounded-xl overflow-hidden flex">
                {/* 전액 수령 (초록색) */}
                <div
                  className="bg-[#34D399] flex items-center justify-center w-full"
                >
                  <span className="text-[12px] font-bold text-white">전액 수령 (세금 없음)</span>
                </div>
              </div>

              {/* 금액 표시 */}
              <div className="flex justify-between mt-2 text-[10px]">
                <span className="text-[#059669] font-bold">{fmt(INTEREST)}원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 차이 강조 박스 */}
        <div className="mt-6 bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-[11px] font-bold text-[#4A3F35]">비과세로 더 받는 금액</span>
            </div>
            <span className="text-[16px] font-bold text-[#FF8A00]">+{fmt(TAX_AMOUNT)}원</span>
          </div>
          <p className="text-[9px] text-[#8B7E74] mt-2 text-right">
            세금을 아끼는 것은 곧 추가 이자를 받는 것과 같아요!
          </p>
        </div>
      </div>

      {/* ── 비과세 상품 종류 (아코디언) ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">주요 비과세 상품</h3>

        <div className="space-y-2.5">
          {/* 1. 비과세 종합저축 */}
          <div className="bg-[#F0FDF4] rounded-xl border border-[#D1FAE5]/50 overflow-hidden">
            <button
              onClick={() => toggleAccordion(0)}
              className="w-full p-4 flex items-center justify-between hover:bg-[#D1FAE5]/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#059669] text-sm shrink-0">✓</span>
                <p className="text-[11px] font-bold text-[#059669]">비과세 종합저축</p>
              </div>
              <span className={`text-[#059669] text-sm transition-transform duration-300 ${openIndex === 0 ? 'rotate-180' : ''}`}>
                ∨
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === 0 ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="px-4 pb-4 pt-0">
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  만 65세 이상, 장애인, 독립유공자 등이 가입 가능해요. <span className="font-bold">최대 5,000만 원</span>까지 예금 이자가 비과세예요.
                </p>
              </div>
            </div>
          </div>

          {/* 2. ISA */}
          <div className="bg-[#EFF6FF] rounded-xl border border-[#DBEAFE]/50 overflow-hidden">
            <button
              onClick={() => toggleAccordion(1)}
              className="w-full p-4 flex items-center justify-between hover:bg-[#DBEAFE]/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#059669] text-sm shrink-0">✓</span>
                <p className="text-[11px] font-bold text-[#2563EB]">ISA (개인종합자산관리계좌)</p>
              </div>
              <span className={`text-[#2563EB] text-sm transition-transform duration-300 ${openIndex === 1 ? 'rotate-180' : ''}`}>
                ∨
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === 1 ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="px-4 pb-4 pt-0">
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  연간 <span className="font-bold">최대 2,000만 원</span>까지 넣을 수 있고, 순수익 200만 원(서민형 400만 원)까지 비과세예요.
                </p>
              </div>
            </div>
          </div>

          {/* 3. 청년도약계좌 */}
          <div className="bg-[#FFF9F0] rounded-xl border border-[#FFEDD5]/50 overflow-hidden">
            <button
              onClick={() => toggleAccordion(2)}
              className="w-full p-4 flex items-center justify-between hover:bg-[#FFEDD5]/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#059669] text-sm shrink-0">✓</span>
                <p className="text-[11px] font-bold text-[#FF8A00]">청년도약계좌</p>
              </div>
              <span className={`text-[#FF8A00] text-sm transition-transform duration-300 ${openIndex === 2 ? 'rotate-180' : ''}`}>
                ∨
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === 2 ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="px-4 pb-4 pt-0">
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  만 19~34세 청년이 가입 가능하고, <span className="font-bold">이자 + 정부 기여금</span>이 모두 비과세예요.
                </p>
              </div>
            </div>
          </div>

          {/* 4. 조합 예탁금 */}
          <div className="bg-[#FCF9F5] rounded-xl border border-[#E5E7EB]/50 overflow-hidden">
            <button
              onClick={() => toggleAccordion(3)}
              className="w-full p-4 flex items-center justify-between hover:bg-[#E5E7EB]/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#059669] text-sm shrink-0">✓</span>
                <p className="text-[11px] font-bold text-[#4A3F35]">조합 예탁금</p>
              </div>
              <span className={`text-[#4A3F35] text-sm transition-transform duration-300 ${openIndex === 3 ? 'rotate-180' : ''}`}>
                ∨
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === 3 ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="px-4 pb-4 pt-0">
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  새마을금고, 신협, 수협 등 조합원이 <span className="font-bold">최대 3,000만 원</span>까지 예탁하면 이자가 비과세예요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 비과세 활용 꿀팁 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">💡 비과세 혜택 놓치지 마세요!</h3>

        <div className="space-y-2.5">
          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 1</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">가입 조건을 꼭 확인</span>하세요. 나이, 소득 기준이 있는 상품이 많아요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 2</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">한도를 채우세요.</span> 비과세 한도 내에서는 무조건 유리하니 최대한 활용하세요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 3</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              이자가 많을수록 <span className="font-bold">세금 절감 효과가 커져요.</span> 고금리 상품과 함께 활용하면 더 좋아요!
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 4</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">중도 해지하면 비과세 혜택이 사라져요.</span> 여유 자금으로 시작하세요.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default TaxFreeSection;
