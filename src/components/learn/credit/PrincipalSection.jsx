import React, { useState } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function PrincipalSection() {
  const fmt = (n) => n.toLocaleString();

  // 원금 슬라이더 상태
  const [principal, setPrincipal] = useState(1_000_000); // 초기 100만원
  const [rate] = useState(4.5); // 연 4.5% 고정
  const [period] = useState(1); // 1년 고정

  // 이자 계산 (단리)
  const interest = Math.round(principal * (rate / 100) * period);
  const total = principal + interest;

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 원금이란? (고대비 텍스트) ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">원금이란?</h3>

        <div className="bg-[#4A3F35] rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🏦</span>
            <div>
              <p className="text-[13px] font-bold text-white mb-1">
                <span className="bg-[#FF8A00] px-2 py-0.5 rounded">원금</span>은
              </p>
              <p className="text-[11px] text-white/90 leading-relaxed">
                처음에 빌리거나 맡긴 <span className="font-bold text-[#FFE4B5]">원래 그 돈</span>이에요.
              </p>
            </div>
          </div>
        </div>

        {/* 쉬운 비유 */}
        <div className="space-y-3">
          <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
            <div className="flex items-start gap-2">
              <span className="text-base">💼</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#FF8A00] mb-1">대출할 때</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  은행에서 <span className="font-bold bg-[#FFE4B5] px-1">500만원</span>을 빌렸다면, 이 500만원이 바로 <span className="font-bold text-[#FF8A00]">원금</span>이에요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-base">🏦</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">저축할 때</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  은행에 <span className="font-bold bg-[#D1FAE5] px-1">100만원</span>을 맡겼다면, 이 100만원이 바로 <span className="font-bold text-[#059669]">원금</span>이에요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 원금 vs 이자 비교 시각화 (인터랙티브) ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">원금과 이자, 얼마나 차이날까?</h3>
        <p className="text-[11px] text-[#8B7E74] mb-4">슬라이더를 움직여서 원금을 조절해보세요!</p>

        {/* 원금 슬라이더 */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[11px] text-[#4A3F35] font-bold">
              <span className="bg-[#FFE4B5] px-2 py-0.5 rounded">원금</span>
            </label>
            <span className="text-[14px] font-bold text-[#FF8A00]">{fmt(principal)}원</span>
          </div>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={principal}
            onChange={(e) => setPrincipal(parseInt(e.target.value))}
            className="w-full h-2 bg-[#FFEDD5] rounded-lg appearance-none cursor-pointer accent-[#FF8A00]"
          />
          <div className="flex justify-between text-[9px] text-[#8B7E74] mt-1">
            <span>10만</span>
            <span>1,000만</span>
          </div>
        </div>

        {/* 비교 시각화 */}
        <div className="space-y-3 mb-4">
          {/* 원금 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-black"><span className="text-[#FF8A00]">원금</span> (처음 맡긴 돈)</span>
              <span className="text-[12px] font-bold text-[#FF8A00]">{fmt(principal)}원</span>
            </div>
            <div className="relative">
              <div className="w-full h-12 bg-[#FFF9F0] rounded-xl overflow-hidden flex items-center">
                <div className="bg-[#FF8A00] h-full w-full flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white">원금</span>
                </div>
              </div>
            </div>
          </div>

          {/* 이자 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-black"><span className="text-[#059669]">이자</span> (1년 뒤 생기는 보너스)</span>
              <span className="text-[12px] font-bold text-[#059669]">+{fmt(interest)}원</span>
            </div>
            <div className="relative">
              <div className="w-full h-8 bg-[#F0FDF4] rounded-xl overflow-hidden flex items-center">
                <div
                  className="bg-[#34D399] h-full flex items-center justify-center"
                  style={{ width: `${(interest / principal) * 100}%` }}
                >
                  <span className="text-[10px] font-bold text-white">이자</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 합계 */}
        <div className="bg-[#4A3F35] rounded-xl p-4 text-center">
          <p className="text-[11px] text-white/80 mb-1">1년 후 받는 총 금액</p>
          <p className="text-[20px] font-bold text-white mb-1">{fmt(total)}원</p>
          <p className="text-[9px] text-white/60">
            원금 {fmt(principal)}원 + 이자 {fmt(interest)}원 (연 {rate}%)
          </p>
        </div>
      </div>

      {/* ── 원금을 지키는 법 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">💡 원금을 지키는 법</h3>

        <div className="space-y-2.5">
          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">안전한 곳에 맡기세요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  은행, 저축은행 등 <span className="font-bold">예금자 보호</span>가 되는 곳에 맡기면 원금이 안전해요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">중도 해지는 신중하게</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  약속한 기간보다 일찍 찾으면 <span className="font-bold">이자가 줄어들거나</span> 수수료를 낼 수 있어요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">투자는 원금 손실 가능</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  주식, 코인 등 투자 상품은 <span className="font-bold text-[#EF4444]">원금이 줄어들 수 있으니</span> 주의하세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PrincipalSection;
