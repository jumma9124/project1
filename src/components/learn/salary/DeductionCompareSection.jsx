import React from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function DeductionCompareSection() {
  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 개념 비교 카드 ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">소득공제 vs 세액공제, 뭐가 다를까?</h3>

        <div className="grid grid-cols-2 gap-3">
          {/* 소득공제 */}
          <div className="bg-[#EFF6FF] rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-2xl mb-2">➖</span>
            <p className="text-[12px] font-bold text-[#2563EB] mb-1.5">소득공제</p>
            <p className="text-[10px] text-[#4A3F35] leading-relaxed">
              세금을 매기는<br />
              <span className="font-bold text-[#2563EB]">기준 금액(소득)</span>을<br />
              줄여줘요
            </p>
          </div>

          {/* 세액공제 */}
          <div className="bg-[#F5F3FF] rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="text-2xl mb-2">💰</span>
            <p className="text-[12px] font-bold text-[#7C3AED] mb-1.5">세액공제</p>
            <p className="text-[10px] text-[#4A3F35] leading-relaxed">
              이미 계산된<br />
              <span className="font-bold text-[#7C3AED]">세금에서 직접</span><br />
              빼줘요
            </p>
          </div>
        </div>

        {/* 쉬운 비유 */}
        <div className="mt-4 bg-[#FFF9F0] rounded-xl px-4 py-3 border border-[#FFEDD5]/50">
          <p className="text-[11px] text-[#4A3F35] leading-relaxed text-center">
            쉽게 말해서,<br />
            소득공제는 <span className="font-bold text-[#2563EB]">"시험 범위를 줄여주는 것"</span><br />
            세액공제는 <span className="font-bold text-[#7C3AED]">"틀린 문제를 없애주는 것"</span>
          </p>
        </div>
      </div>

      {/* ── 작동 원리 시각화 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">어떻게 작동할까?</h3>

        {/* 소득공제 흐름 */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-[#2563EB] mb-2">➖ 소득공제 과정</p>
          <div className="flex items-center gap-1.5 text-[10px]">
            <div className="bg-[#FEF2F2] rounded-lg px-2.5 py-2 text-center flex-1">
              <p className="font-bold text-[#DC2626]">연봉</p>
              <p className="text-[#4A3F35]">3,000만</p>
            </div>
            <span className="text-[#8B7E74] font-bold shrink-0">→</span>
            <div className="bg-[#EFF6FF] rounded-lg px-2.5 py-2 text-center flex-1">
              <p className="font-bold text-[#2563EB]">공제 적용</p>
              <p className="text-[#4A3F35]">-500만</p>
            </div>
            <span className="text-[#8B7E74] font-bold shrink-0">→</span>
            <div className="bg-[#F0FDF4] rounded-lg px-2.5 py-2 text-center flex-1">
              <p className="font-bold text-[#059669]">과세 기준</p>
              <p className="text-[#4A3F35]">2,500만</p>
            </div>
          </div>
          <p className="text-[9px] text-[#8B7E74] mt-1.5 text-center">기준이 줄어서 → 세금도 줄어요!</p>
        </div>

        {/* 세액공제 흐름 */}
        <div>
          <p className="text-[11px] font-bold text-[#7C3AED] mb-2">💰 세액공제 과정</p>
          <div className="flex items-center gap-1.5 text-[10px]">
            <div className="bg-[#FEF2F2] rounded-lg px-2.5 py-2 text-center flex-1">
              <p className="font-bold text-[#DC2626]">계산된 세금</p>
              <p className="text-[#4A3F35]">150만</p>
            </div>
            <span className="text-[#8B7E74] font-bold shrink-0">→</span>
            <div className="bg-[#F5F3FF] rounded-lg px-2.5 py-2 text-center flex-1">
              <p className="font-bold text-[#7C3AED]">공제 적용</p>
              <p className="text-[#4A3F35]">-50만</p>
            </div>
            <span className="text-[#8B7E74] font-bold shrink-0">→</span>
            <div className="bg-[#F0FDF4] rounded-lg px-2.5 py-2 text-center flex-1">
              <p className="font-bold text-[#059669]">실제 세금</p>
              <p className="text-[#4A3F35]">100만</p>
            </div>
          </div>
          <p className="text-[9px] text-[#8B7E74] mt-1.5 text-center">세금에서 바로 빼서 → 체감이 더 커요!</p>
        </div>
      </div>

      {/* ── 대표 항목 체크 리스트 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">대표적인 공제 항목</h3>

        {/* 소득공제 항목들 */}
        <p className="text-[11px] font-bold text-[#2563EB] mb-2">➖ 소득공제 항목</p>
        <div className="space-y-2.5 mb-4">
          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">신용카드 / 체크카드 사용분</span> — 총 급여의 25%를 초과해서 쓴 금액이 공제돼요. 체크카드는 공제율 30%로 신용카드(15%)보다 유리해요.
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">대중교통 이용분</span> — 버스, 지하철 이용 금액의 80%가 공제돼요. 교통카드 쓰면 자동으로 잡혀요!
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">주택청약 납입액</span> — 무주택 세대주라면 연 240만 원 한도로 40% 공제돼요.
            </p>
          </div>
        </div>

        {/* 세액공제 항목들 */}
        <p className="text-[11px] font-bold text-[#7C3AED] mb-2">💰 세액공제 항목</p>
        <div className="space-y-2.5">
          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">월세 세액공제</span> — 연봉 7천만 원 이하 무주택자라면 월세의 최대 17%를 돌려받을 수 있어요.
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">보험료 세액공제</span> — 건강보험, 고용보험 외에 개인이 가입한 보장성 보험료도 연 100만 원 한도로 12% 공제돼요.
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">연금저축 세액공제</span> — 연금저축에 넣은 금액의 최대 16.5%를 돌려받아요. 노후 준비 + 절세 일석이조!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeductionCompareSection;
