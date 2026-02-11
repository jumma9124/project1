import React, { useState } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

// 연간 납부 세금 (1번 페이지 급여명세서 기준 × 12개월)
const monthlyTax = 26520 + 2650; // 소득세 + 지방소득세
const annualTax = monthlyTax * 12; // 350,040

// 소득공제 항목 (세금 매기는 기준 금액을 줄여줘요)
const incomeDeductions = [
  { name: '신용카드 사용분', amount: 480000 },
  { name: '체크카드 사용분', amount: 720000, tip: '총 급여의 25%를 초과해서 쓴 금액부터 공제돼요. 체크카드는 공제율 30%로, 신용카드(15%)보다 2배 유리해요!' },
  { name: '대중교통 이용분', amount: 360000 },
];

// 세액공제 항목 (계산된 세금에서 직접 빼줘요)
const taxCredits = [
  { name: '근로소득세액공제', amount: 55000 },
  { name: '연금저축 공제', amount: 40000 },
  { name: '보험료 공제', amount: 24000 },
];

// 소득공제 → 과세표준 감소 → 실제 세금 감소액 (6% 세율 구간 가정)
const incomeDeductionEffect = Math.round(
  incomeDeductions.reduce((s, d) => s + d.amount, 0) * 0.06
);
const taxCreditTotal = taxCredits.reduce((s, d) => s + d.amount, 0);
const totalRefund = incomeDeductionEffect + taxCreditTotal;

function YearEndTaxSection() {
  const [openTip, setOpenTip] = useState(null);

  const fmt = (n) => n.toLocaleString();

  return (
    <div className="px-6 mt-6 pb-10" onClick={() => setOpenTip(null)}>

      {/* ── 브릿지 메시지 ── */}
      <div className="bg-[#FFF9F0] rounded-2xl px-5 py-4 border border-[#FFEDD5]/50 mb-4">
        <p className="text-xs text-[#4A3F35] leading-relaxed text-center">
          <span className="font-bold">1번 페이지</span>에서 매달 냈던 세금,{' '}
          <span className="font-bold text-[#059669]">돌려받는 시간</span>이에요!
        </p>
      </div>

      {/* ── 연말정산 결과 카드 ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4 flex items-center gap-1.5">
          연말정산 예상 결과
          <span className="text-[10px] font-normal text-[#8B7E74]">(연봉 3,000만 원 기준)</span>
        </h3>

        {/* 1년간 낸 세금 */}
        <div className="bg-[#FEF2F2] rounded-xl px-4 py-3 flex justify-between items-center mb-4">
          <span className="text-[11px] text-[#4A3F35]">1년간 낸 세금 (소득세+지방소득세)</span>
          <span className="text-sm font-bold text-[#DC2626]">{fmt(annualTax)}원</span>
        </div>

        {/* 2열: 소득공제 / 세액공제 */}
        <div className="grid grid-cols-2 gap-3">

          {/* 소득공제 */}
          <div>
            <div className="bg-[#2563EB] rounded-t-lg px-3 py-2 flex items-center gap-1 relative">
              <span className="text-[11px] font-bold text-white">소득공제</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenTip(openTip === 'income' ? null : 'income');
                }}
                className="w-3.5 h-3.5 rounded-full bg-white/30 text-white text-[8px] font-bold flex items-center justify-center leading-none shrink-0"
              >
                ?
              </button>
              {openTip === 'income' && (
                <div className="absolute top-full left-2 mt-2 bg-[#4A3F35] rounded-lg px-3 py-2.5 w-48 z-30">
                  <p className="text-[10px] text-white leading-relaxed">
                    세금을 매기는 <span className="font-bold text-[#FFEDD5]">기준 금액</span>을 줄여주는 거예요.<br />
                    기준이 줄면 → 세금도 줄어요!<br />
                    <span className="text-[#A3A3A3]">예) 카드 많이 쓰면 기준이 줄어요</span>
                  </p>
                  <div className="absolute bottom-full left-4 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-[#4A3F35]"></div>
                </div>
              )}
            </div>
            <div className="border border-t-0 border-[#D6CFC7] rounded-b-lg">
              {incomeDeductions.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center px-3 py-2.5 text-[11px] ${
                    i > 0 ? 'border-t border-[#E8E0D6]' : ''
                  }`}
                >
                  <div className="flex items-center gap-1 relative">
                    <span className="text-[#4A3F35]">{item.name}</span>
                    {item.tip && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenTip(openTip === `deduction-${i}` ? null : `deduction-${i}`);
                          }}
                          className="w-3.5 h-3.5 rounded-full bg-[#8B7E74] text-white text-[8px] font-bold flex items-center justify-center leading-none shrink-0"
                        >
                          ?
                        </button>
                        {openTip === `deduction-${i}` && (
                          <div className="absolute bottom-full left-0 mb-2 bg-[#4A3F35] rounded-lg px-3 py-2.5 w-48 z-30">
                            <p className="text-[10px] text-white leading-relaxed">{item.tip}</p>
                            <div className="absolute top-full left-4 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-[#4A3F35]"></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <span className="text-[#2563EB] font-semibold tabular-nums">{fmt(item.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between px-3 py-2.5 text-[11px] border-t-2 border-[#2563EB] bg-[#EFF6FF]">
                <span className="font-bold text-[#2563EB]">절세 효과</span>
                <span className="font-bold text-[#2563EB] tabular-nums">-{fmt(incomeDeductionEffect)}원</span>
              </div>
            </div>
          </div>

          {/* 세액공제 */}
          <div>
            <div className="bg-[#7C3AED] rounded-t-lg px-3 py-2 flex items-center gap-1 relative">
              <span className="text-[11px] font-bold text-white">세액공제</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenTip(openTip === 'credit' ? null : 'credit');
                }}
                className="w-3.5 h-3.5 rounded-full bg-white/30 text-white text-[8px] font-bold flex items-center justify-center leading-none shrink-0"
              >
                ?
              </button>
              {openTip === 'credit' && (
                <div className="absolute top-full left-2 mt-2 bg-[#4A3F35] rounded-lg px-3 py-2.5 w-48 z-30">
                  <p className="text-[10px] text-white leading-relaxed">
                    이미 계산된 <span className="font-bold text-[#FFEDD5]">세금에서 바로</span> 빼주는 거예요.<br />
                    소득공제보다 체감이 더 커요!<br />
                    <span className="text-[#A3A3A3]">예) 연금저축 넣으면 세금이 바로 줄어요</span>
                  </p>
                  <div className="absolute bottom-full left-4 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-[#4A3F35]"></div>
                </div>
              )}
            </div>
            <div className="border border-t-0 border-[#D6CFC7] rounded-b-lg">
              {taxCredits.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-3 py-2.5 text-[11px] ${
                    i > 0 ? 'border-t border-[#E8E0D6]' : ''
                  }`}
                >
                  <span className="text-[#4A3F35]">{item.name}</span>
                  <span className="text-[#7C3AED] font-semibold tabular-nums">{fmt(item.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between px-3 py-2.5 text-[11px] border-t-2 border-[#7C3AED] bg-[#F5F3FF]">
                <span className="font-bold text-[#7C3AED]">절세 효과</span>
                <span className="font-bold text-[#7C3AED] tabular-nums">-{fmt(taxCreditTotal)}원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 예상 환급액 배너 */}
        <div className="mt-4 bg-[#F0FDF4] rounded-xl px-4 py-4 flex justify-between items-center border border-[#059669]/20">
          <div>
            <span className="text-sm font-bold text-[#4A3F35]">예상 환급액</span>
            <p className="text-[10px] text-[#8B7E74] mt-0.5">13월의 월급!</p>
          </div>
          <span className="text-xl font-bold text-[#059669]">+{fmt(totalRefund)}원</span>
        </div>

        {/* 기납부 세금 vs 환급액 수평 막대 그래프 */}
        <div className="mt-5">
          <p className="text-[11px] font-bold text-[#4A3F35] mb-2.5">기납부 세금 vs 예상 환급액</p>

          {/* 기납부 세금 막대 */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#4A3F35]">기납부 세금</span>
              <span className="text-[10px] font-bold text-[#DC2626]">{fmt(annualTax)}원</span>
            </div>
            <div className="w-full h-7 bg-[#E8E0D6] rounded-full overflow-hidden">
              <div className="h-full bg-[#DC2626] rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* 예상 환급액 막대 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#4A3F35]">예상 환급액</span>
              <span className="text-[10px] font-bold text-[#2563EB]">{fmt(totalRefund)}원</span>
            </div>
            <div className="w-full h-7 bg-[#E8E0D6] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full flex items-center justify-end pr-2 transition-all duration-1000"
                style={{ width: `${(totalRefund / annualTax * 100).toFixed(1)}%` }}
              >
                <span className="text-[9px] text-white font-bold">{(totalRefund / annualTax * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 꿀팁: 사회초년생이 놓치기 쉬운 3가지 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">사회초년생이 놓치기 쉬운 공제 3가지</h3>

        <div className="space-y-3">
          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">월세 세액공제</span> — 연봉 7천만 원 이하라면 월세의 최대 17%를 돌려받을 수 있어요. 임대차계약서와 이체 내역만 있으면 돼요!
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">안경/콘택트렌즈 구매비</span> — 의료비 세액공제에 포함돼요! 안경원에서 영수증을 꼭 챙기세요. 1인당 연 50만 원까지 가능해요.
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">대중교통 소득공제</span> — 버스, 지하철 이용 금액의 80%가 소득공제 돼요. 교통카드 쓰면 자동으로 잡혀요!
            </p>
          </div>
        </div>
      </div>

      {/* ── 일정 안내 ── */}
      <div className="mt-4 px-2 text-center">
        <p className="text-[11px] text-[#8B7E74]">
          연말정산은 매년 1월 중순에 국세청 홈택스에서 시작해요!
        </p>
      </div>
    </div>
  );
}

export default YearEndTaxSection;
