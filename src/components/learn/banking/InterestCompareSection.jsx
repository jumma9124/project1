import React, { useState, useMemo } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function InterestCompareSection() {
  const fmt = (n) => n.toLocaleString();

  // 슬라이더 상태
  const [principal, setPrincipal] = useState(10_000_000); // 초기 원금 (1,000만 원)
  const [rate, setRate] = useState(5); // 연 이율 (%)
  const [years, setYears] = useState(10); // 기간 (년)

  // 단리/복리 계산 함수
  const calculateData = useMemo(() => {
    const data = [];
    const annualRate = rate / 100;

    for (let year = 0; year <= years; year++) {
      // 단리: P × (1 + r × t)
      const simple = principal * (1 + annualRate * year);

      // 복리: P × (1 + r)^t
      const compound = principal * Math.pow(1 + annualRate, year);

      data.push({
        year,
        simple: Math.round(simple),
        compound: Math.round(compound),
      });
    }

    return data;
  }, [principal, rate, years]);

  const maxValue = Math.max(...calculateData.map(d => d.compound));
  const finalSimple = calculateData[years].simple;
  const finalCompound = calculateData[years].compound;
  const difference = finalCompound - finalSimple;

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 단리 vs 복리 개념 비교 ── */}
      <div className="grid grid-cols-2 gap-3">
        {/* 단리 카드 */}
        <div className="bg-[#EFF6FF] rounded-[2rem] p-5 border border-[#DBEAFE]/50">
          <div className="text-center mb-3">
            <span className="text-2xl">📐</span>
          </div>
          <h3 className="text-[12px] font-bold text-[#2563EB] text-center mb-2">단리 (Simple)</h3>
          <p className="text-[10px] text-[#4A3F35] leading-relaxed text-center">
            <span className="font-bold">처음 원금</span>에만<br />
            이자가 붙어요
          </p>
          <div className="mt-3 bg-white/60 rounded-lg p-2">
            <p className="text-[9px] text-[#8B7E74] text-center">
              원금 × (1 + 이율 × 년수)
            </p>
          </div>
        </div>

        {/* 복리 카드 */}
        <div className="bg-[#F0FDF4] rounded-[2rem] p-5 border border-[#D1FAE5]/50">
          <div className="text-center mb-3">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="text-[12px] font-bold text-[#059669] text-center mb-2">복리 (Compound)</h3>
          <p className="text-[10px] text-[#4A3F35] leading-relaxed text-center">
            <span className="font-bold">이자에도 이자</span>가<br />
            붙어 눈덩이처럼 불어나요
          </p>
          <div className="mt-3 bg-white/60 rounded-lg p-2">
            <p className="text-[9px] text-[#8B7E74] text-center">
              원금 × (1 + 이율)^년수
            </p>
          </div>
        </div>
      </div>

      {/* ── 인터랙티브 슬라이더 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">조건을 조정해서 비교해보세요</h3>

        <div className="space-y-4">
          {/* 초기 원금 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] text-[#4A3F35] font-bold">초기 원금</label>
              <span className="text-[12px] font-bold text-[#FF8A00]">{fmt(principal)}원</span>
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

          {/* 연 이율 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] text-[#4A3F35] font-bold">연 이율</label>
              <span className="text-[12px] font-bold text-[#2563EB]">{rate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#DBEAFE] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-[9px] text-[#8B7E74] mt-1">
              <span>1%</span>
              <span>15%</span>
            </div>
          </div>

          {/* 기간 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] text-[#4A3F35] font-bold">저축 기간</label>
              <span className="text-[12px] font-bold text-[#059669]">{years}년</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full h-2 bg-[#D1FAE5] rounded-lg appearance-none cursor-pointer accent-[#059669]"
            />
            <div className="flex justify-between text-[9px] text-[#8B7E74] mt-1">
              <span>1년</span>
              <span>30년</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 라인 차트 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">시간에 따른 자산 변화</h3>
        <p className="text-[11px] text-[#8B7E74] mb-5">단리는 직선, 복리는 곡선으로 증가해요</p>

        {/* 차트 영역 */}
        <div className="relative bg-[#FCF9F5] rounded-xl p-4" style={{ height: '280px' }}>
          {/* Y축 라벨 */}
          <div className="absolute left-2 top-2 bottom-8 flex flex-col justify-between text-[9px] text-[#8B7E74] pr-2">
            <span>{fmt(Math.round(maxValue))}원</span>
            <span>{fmt(Math.round(maxValue * 0.75))}원</span>
            <span>{fmt(Math.round(maxValue * 0.5))}원</span>
            <span>{fmt(Math.round(maxValue * 0.25))}원</span>
            <span>0원</span>
          </div>

          {/* 차트 컨테이너 */}
          <div className="ml-12 mr-3 mt-3 mb-8 h-full relative">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* 격자선 */}
              <line x1="2" y1="2" x2="98" y2="2" stroke="#E5E7EB" strokeWidth="0.2" />
              <line x1="2" y1="26.5" x2="98" y2="26.5" stroke="#E5E7EB" strokeWidth="0.2" />
              <line x1="2" y1="51" x2="98" y2="51" stroke="#E5E7EB" strokeWidth="0.2" />
              <line x1="2" y1="75.5" x2="98" y2="75.5" stroke="#E5E7EB" strokeWidth="0.2" />
              <line x1="2" y1="96" x2="98" y2="96" stroke="#E5E7EB" strokeWidth="0.2" />

              {/* 단리 라인 (파란색 직선) */}
              <polyline
                points={calculateData
                  .map((d, i) => {
                    const x = (i / years) * 94 + 3;
                    const y = 94 - (d.simple / maxValue) * 92 + 2;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#60A5FA"
                strokeWidth="0.8"
              />

              {/* 복리 라인 (초록색 곡선) */}
              <polyline
                points={calculateData
                  .map((d, i) => {
                    const x = (i / years) * 94 + 3;
                    const y = 94 - (d.compound / maxValue) * 92 + 2;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#34D399"
                strokeWidth="0.8"
              />

              {/* 끝점 원 */}
              <circle
                cx="97"
                cy={94 - (finalSimple / maxValue) * 92 + 2}
                r="0.75"
                fill="#60A5FA"
              />
              <circle
                cx="97"
                cy={94 - (finalCompound / maxValue) * 92 + 2}
                r="0.75"
                fill="#34D399"
              />
            </svg>

            {/* X축 라벨 */}
            <div className="flex justify-between text-[9px] text-[#8B7E74] mt-2 mb-4">
              <span>0년</span>
              <span>{Math.round(years * 0.25)}년</span>
              <span>{Math.round(years * 0.5)}년</span>
              <span>{Math.round(years * 0.75)}년</span>
              <span>{years}년</span>
            </div>
          </div>
        </div>

        {/* 범례 */}
        <div className="flex justify-center gap-4 text-[10px] mt-8">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#60A5FA] rounded"></div>
            <span className="text-[#4A3F35]">단리</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#34D399] rounded"></div>
            <span className="text-[#4A3F35]">복리</span>
          </div>
        </div>
      </div>

      {/* ── 최종 금액 비교 박스 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">{years}년 후 최종 금액 비교</h3>

        <div className="space-y-3">
          <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#DBEAFE]/50">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#4A3F35]">단리</span>
              <span className="text-[13px] font-bold text-[#2563EB]">{fmt(finalSimple)}원</span>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#4A3F35]">복리</span>
              <span className="text-[13px] font-bold text-[#059669]">{fmt(finalCompound)}원</span>
            </div>
          </div>

          <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-[#4A3F35]">차이</span>
              <span className="text-[14px] font-bold text-[#FF8A00]">+{fmt(difference)}원</span>
            </div>
            <p className="text-[9px] text-[#8B7E74] mt-2 text-right">
              복리가 단리보다 {fmt(Math.round((difference / finalSimple) * 100))}% 더 많아요!
            </p>
          </div>
        </div>
      </div>

      {/* ── 복리의 마법을 누리는 법 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">💡 복리의 마법을 누리는 법</h3>

        <div className="space-y-2.5">
          <div className="flex items-start gap-2">
            <span className="text-[#059669] text-sm shrink-0">✓</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">일찍 시작하세요.</span> 시간이 길수록 복리의 효과가 극대화돼요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#059669] text-sm shrink-0">✓</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">중도 해지하지 마세요.</span> 복리는 꾸준히 유지할 때 진가를 발휘해요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#059669] text-sm shrink-0">✓</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">이자를 재투자하세요.</span> 받은 이자를 다시 투자해야 복리 효과가 생겨요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#059669] text-sm shrink-0">✓</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">복리 상품을 선택하세요.</span> 은행 상품 가입 시 복리 방식인지 확인하세요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#059669] text-sm shrink-0">✓</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">수익률을 높이세요.</span> 이율이 1%만 올라도 장기적으로 큰 차이가 나요.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default InterestCompareSection;
