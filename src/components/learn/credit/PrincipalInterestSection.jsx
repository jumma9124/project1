import React, { useState } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function PrincipalInterestSection() {
  const fmt = (n) => n.toLocaleString();

  // 대출 슬라이더 상태
  const [principal, setPrincipal] = useState(10_000_000); // 초기 1,000만원
  const [rate] = useState(4.5); // 연 4.5% 고정
  const [months] = useState(12); // 12개월 고정

  // 원리금 계산 (원리금균등상환 방식)
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );

  // 총 원리금
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 원리금이란? (고대비 텍스트) ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">원리금이란?</h3>

        <div className="bg-[#4A3F35] rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">💰</span>
            <div>
              <p className="text-[13px] font-bold text-white mb-1">
                <span className="bg-[#FF8A00] px-2 py-0.5 rounded">원리금</span>은
              </p>
              <p className="text-[11px] text-white/90 leading-relaxed">
                <span className="font-bold text-[#FFE4B5]">원금 + 이자</span>를 합친 총 금액이에요.
              </p>
            </div>
          </div>
        </div>

        {/* 쉬운 비유 */}
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
          <div className="flex items-start gap-2">
            <span className="text-base">📦</span>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-[#FF8A00] mb-1">쉬운 비유</p>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                원리금은 <span className="font-bold bg-[#FFE4B5] px-1">물건값(원금)</span>에 <span className="font-bold bg-[#D1FAE5] px-1">배송비(이자)</span>를 더한 <span className="font-bold text-[#FF8A00]">진짜 결제 금액</span>과 같아요!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 원금 + 이자 = 원리금 공식 시각화 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3 text-center">원리금 계산 공식</h3>

        {/* 공식 시각화 */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {/* 원금 */}
          <div className="flex-1 bg-[#FFF9F0] rounded-xl p-4 border-2 border-[#FF8A00] text-center">
            <span className="text-2xl block mb-1">💼</span>
            <p className="text-[12px] font-bold text-[#FF8A00]">원금</p>
            <p className="text-[9px] text-[#8B7E74]">빌린 돈</p>
          </div>

          {/* 플러스 */}
          <div className="text-2xl font-bold text-[#4A3F35]">+</div>

          {/* 이자 */}
          <div className="flex-1 bg-[#F0FDF4] rounded-xl p-4 border-2 border-[#059669] text-center">
            <span className="text-2xl block mb-1">💸</span>
            <p className="text-[12px] font-bold text-[#059669]">이자</p>
            <p className="text-[9px] text-[#8B7E74]">빌린 대가</p>
          </div>

          {/* 이퀄 */}
          <div className="text-2xl font-bold text-[#4A3F35]">=</div>

          {/* 원리금 */}
          <div className="flex-1 bg-[#4A3F35] rounded-xl p-4 border-2 border-[#4A3F35] text-center">
            <span className="text-2xl block mb-1">💰</span>
            <p className="text-[12px] font-bold text-white">원리금</p>
            <p className="text-[9px] text-white/70">실제 갚을 돈</p>
          </div>
        </div>

        {/* 대출금 슬라이더 */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[11px] text-[#4A3F35] font-bold">
              <span className="bg-[#FFE4B5] px-2 py-0.5 rounded">대출 원금</span>
            </label>
            <span className="text-[14px] font-bold text-[#FF8A00]">{fmt(principal)}원</span>
          </div>
          <input
            type="range"
            min="1000000"
            max="50000000"
            step="1000000"
            value={principal}
            onChange={(e) => setPrincipal(parseInt(e.target.value))}
            className="w-full h-2 bg-[#FFEDD5] rounded-lg appearance-none cursor-pointer accent-[#FF8A00]"
          />
          <div className="flex justify-between text-[9px] text-[#8B7E74] mt-1">
            <span>100만</span>
            <span>5,000만</span>
          </div>
        </div>

        {/* 매달 갚는 원리금 */}
        <div className="bg-[#4A3F35] rounded-xl p-4 text-center mb-3">
          <p className="text-[11px] text-white/80 mb-1">매달 갚아야 하는 원리금</p>
          <p className="text-[24px] font-bold text-white mb-2">{fmt(monthlyPayment)}원</p>
          <p className="text-[10px] text-white/60">
            ({months}개월 동안 매달 갚기, 연 {rate}%)
          </p>
        </div>

        {/* 강조 문구 */}
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50 text-center">
          <p className="text-[11px] text-[#4A3F35] mb-1">이번 달에 실제로 나가는 돈은</p>
          <p className="text-[18px] font-bold text-[#FF8A00]">{fmt(monthlyPayment)}원입니다</p>
        </div>
      </div>

      {/* ── 원리금 상세 내역 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">{months}개월 후 총 금액</h3>

        <div className="space-y-3">
          {/* 원금 */}
          <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-black">
                <span className="text-[#FF8A00]">원금</span> (빌린 돈)
              </span>
              <span className="text-[13px] font-bold text-[#FF8A00]">{fmt(principal)}원</span>
            </div>
          </div>

          {/* 이자 */}
          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-black">
                <span className="text-[#059669]">이자</span> (빌린 대가)
              </span>
              <span className="text-[13px] font-bold text-[#059669]">+{fmt(totalInterest)}원</span>
            </div>
          </div>

          {/* 총 원리금 */}
          <div className="bg-[#4A3F35] rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-white">
                총 원리금 (실제 갚을 돈)
              </span>
              <span className="text-[16px] font-bold text-white">{fmt(totalPayment)}원</span>
            </div>
          </div>
        </div>

        <p className="text-[9px] text-[#8B7E74] mt-3 text-center">
          💡 원금보다 <span className="font-bold text-[#FF8A00]">{fmt(totalInterest)}원</span> 더 내야 해요!
        </p>
      </div>

      {/* ── 원리금 관리 팁 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">💡 원리금 부담 줄이는 법</h3>

        <div className="space-y-2.5">
          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">짧은 기간에 빨리 갚으세요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  대출 기간이 길수록 <span className="font-bold">이자가 많이 붙어요.</span> 가능하면 짧게 빌리세요!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">중도 상환을 활용하세요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  여유가 생기면 <span className="font-bold">미리 갚으면</span> 이자를 아낄 수 있어요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">낮은 금리로 갈아타기</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  금리가 1%만 낮아져도 <span className="font-bold">총 원리금이 크게 줄어요.</span> 대환대출을 알아보세요!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FEF2F2] rounded-xl p-4 border border-[#FEE2E2]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#EF4444] text-sm shrink-0">⚠️</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#EF4444] mb-1">연체는 절대 금물!</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  원리금을 못 갚으면 <span className="font-bold text-[#EF4444]">연체이자와 신용점수 하락</span>이라는 큰 손해를 봐요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PrincipalInterestSection;
