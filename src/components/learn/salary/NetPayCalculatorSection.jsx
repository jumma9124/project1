import React, { useState, useMemo, useRef, useEffect } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

// 4대 보험 요율 (2024 근로자 부담분)
const RATES = {
  국민연금: 0.045,
  건강보험: 0.03545,
  장기요양보험율: 0.1295, // 건강보험료의 12.95%
  고용보험: 0.009,
};

// 국민연금 기준소득월액 상한
const PENSION_CAP = 5_900_000;

// 근로소득간이세액표 기반 소득세 추정 (본인 1인 기준)
function estimateIncomeTax(monthlySalary) {
  const annual = monthlySalary * 12;

  // ① 근로소득공제
  let eid = 0;
  if (annual <= 5_000_000) eid = annual * 0.7;
  else if (annual <= 15_000_000) eid = 3_500_000 + (annual - 5_000_000) * 0.4;
  else if (annual <= 45_000_000) eid = 7_500_000 + (annual - 15_000_000) * 0.15;
  else if (annual <= 100_000_000) eid = 12_000_000 + (annual - 45_000_000) * 0.05;
  else eid = 14_750_000 + (annual - 100_000_000) * 0.02;

  const grossIncome = annual - eid;

  // ② 인적공제 (본인 1인)
  const personalDed = 1_500_000;

  // ③ 연금보험료 공제
  const pensionDed = Math.min(monthlySalary, PENSION_CAP) * RATES.국민연금 * 12;

  // ④ 특별소득공제 (건강보험 + 장기요양 + 고용보험)
  const healthAnnual = monthlySalary * RATES.건강보험 * 12;
  const longCareAnnual = healthAnnual * RATES.장기요양보험율;
  const employAnnual = monthlySalary * RATES.고용보험 * 12;
  const specialDed = healthAnnual + longCareAnnual + employAnnual;

  // ⑤ 과세표준
  const taxable = Math.max(0, grossIncome - personalDed - pensionDed - specialDed);

  // ⑥ 산출세액 (종합소득세율)
  let tax = 0;
  if (taxable <= 14_000_000) tax = taxable * 0.06;
  else if (taxable <= 50_000_000) tax = 840_000 + (taxable - 14_000_000) * 0.15;
  else if (taxable <= 88_000_000) tax = 6_240_000 + (taxable - 50_000_000) * 0.24;
  else if (taxable <= 150_000_000) tax = 15_360_000 + (taxable - 88_000_000) * 0.35;
  else if (taxable <= 300_000_000) tax = 37_060_000 + (taxable - 150_000_000) * 0.38;
  else if (taxable <= 500_000_000) tax = 94_060_000 + (taxable - 300_000_000) * 0.40;
  else if (taxable <= 1_000_000_000) tax = 174_060_000 + (taxable - 500_000_000) * 0.42;
  else tax = 384_060_000 + (taxable - 1_000_000_000) * 0.45;

  // ⑦ 근로소득세액공제
  let wageCredit = 0;
  if (tax <= 1_300_000) wageCredit = tax * 0.55;
  else wageCredit = 715_000 + (tax - 1_300_000) * 0.30;

  if (annual <= 33_000_000) wageCredit = Math.min(wageCredit, 740_000);
  else if (annual <= 70_000_000) wageCredit = Math.min(wageCredit, 660_000);
  else wageCredit = Math.min(wageCredit, 500_000);

  // ⑧ 표준세액공제
  const standardCredit = 130_000;

  // ⑨ 결정세액
  const finalTax = Math.max(0, tax - wageCredit - standardCredit);

  return Math.round(finalTax / 12);
}

function NetPayCalculatorSection() {
  const [salary, setSalary] = useState('');
  const [openTip, setOpenTip] = useState(null);
  const resultRef = useRef(null);
  const prevHadResult = useRef(false);

  const annualSalary = parseInt(salary.replace(/,/g, '')) || 0;
  const monthlySalary = Math.round(annualSalary / 12);

  const deductions = useMemo(() => {
    if (monthlySalary === 0) return null;

    const 국민연금 = Math.round(Math.min(monthlySalary, PENSION_CAP) * RATES.국민연금);
    const 건강보험 = Math.round(monthlySalary * RATES.건강보험);
    const 장기요양보험 = Math.round(건강보험 * RATES.장기요양보험율);
    const 고용보험 = Math.round(monthlySalary * RATES.고용보험);
    const 소득세 = estimateIncomeTax(monthlySalary);
    const 지방소득세 = Math.round(소득세 * 0.1);

    const items = [
      { name: '국민연금', amount: 국민연금, tip: '월급의 4.5%를 내고, 회사도 같은 금액을 내줘요.' },
      { name: '건강보험', amount: 건강보험, tip: '월급의 3.545%를 내고, 회사가 절반 부담해요.' },
      { name: '장기요양보험', amount: 장기요양보험, tip: '건강보험료의 12.95%를 추가로 내요.' },
      { name: '고용보험', amount: 고용보험, tip: '월급의 0.9%를 내요.' },
      { name: '소득세', amount: 소득세, tip: '근로소득간이세액표 기준, 본인 1인 공제 적용 예상 금액이에요.' },
      { name: '지방소득세', amount: 지방소득세, tip: '소득세의 10%예요.' },
    ];

    const totalDeduction = items.reduce((s, d) => s + d.amount, 0);
    const netPay = monthlySalary - totalDeduction;

    return { items, totalDeduction, netPay };
  }, [monthlySalary]);

  const fmt = (n) => n.toLocaleString();

  const handleInput = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw === '') {
      setSalary('');
      return;
    }
    setSalary(parseInt(raw).toLocaleString());
  };

  // 결과가 새로 나타날 때 스크롤
  useEffect(() => {
    if (deductions && !prevHadResult.current && resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    prevHadResult.current = !!deductions;
  }, [deductions]);

  const deductionRatio = deductions
    ? ((deductions.totalDeduction / monthlySalary) * 100).toFixed(1)
    : '0';
  const netRatio = deductions
    ? (100 - parseFloat(deductionRatio)).toFixed(1)
    : '100';

  return (
    <div className="px-6 mt-6 pb-10" onClick={() => setOpenTip(null)}>

      {/* ── 입력 영역 ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">실수령액 계산기</h3>
        <p className="text-[11px] text-[#8B7E74] mb-4">나의 세전 연봉을 입력해 보세요</p>

        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={salary}
            onChange={handleInput}
            placeholder="세전 연봉을 입력하세요"
            className="w-full bg-[#FFF9F0] border border-[#FFEDD5] rounded-xl pl-4 pr-8 py-3.5 text-sm text-[#4A3F35] font-semibold outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/30 transition-colors placeholder:text-[#C4B5A6] placeholder:font-normal"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8B7E74]">원</span>
        </div>
      </div>

      {/* ── 결과 카드 (입력 시에만 표시) ── */}
      {deductions && (
        <>
          <div ref={resultRef} className={`${commonStyles.card} mt-4`}>
            <h3 className="text-sm font-bold text-[#4A3F35] mb-1">공제 내역</h3>
            <p className="text-[11px] text-[#8B7E74] mb-3">연봉 {fmt(annualSalary)}원 → 월 {fmt(monthlySalary)}원 기준</p>

            {/* 2열: 지급 / 공제 */}
            <div className="grid grid-cols-2 gap-3">

              {/* 왼쪽: 지급항목 */}
              <div>
                <div className="bg-[#059669] rounded-t-lg px-3 py-2">
                  <span className="text-[11px] font-bold text-white">지급항목</span>
                </div>
                <div className="border border-t-0 border-[#D6CFC7] rounded-b-lg overflow-hidden">
                  <div className="flex justify-between px-3 py-2.5 text-[11px]">
                    <span className="text-[#4A3F35]">세전 월급</span>
                    <span className="text-[#4A3F35] font-semibold tabular-nums">{fmt(monthlySalary)}</span>
                  </div>

                  {/* 빈 칸 — 높이 맞추기 */}
                  <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>
                  <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>
                  <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>
                  <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>
                  <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>

                  <div className="flex justify-between px-3 py-2.5 text-[11px] border-t-2 border-[#059669] bg-[#F0FDF4]">
                    <span className="font-bold text-[#059669]">합계</span>
                    <span className="font-bold text-[#059669] tabular-nums">{fmt(monthlySalary)}</span>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 공제항목 */}
              <div>
                <div className="bg-[#DC2626] rounded-t-lg px-3 py-2">
                  <span className="text-[11px] font-bold text-white">공제항목</span>
                </div>
                <div className="border border-t-0 border-[#D6CFC7] rounded-b-lg">
                  {deductions.items.map((item, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center px-3 py-2.5 text-[11px] ${
                        i > 0 ? 'border-t border-[#E8E0D6]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-1 relative">
                        <span className={`${i < 4 ? 'text-[#1A1210] font-bold' : 'text-[#4A3F35]'}`}>{item.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenTip(openTip === i ? null : i);
                          }}
                          className="w-3.5 h-3.5 rounded-full bg-[#8B7E74] text-white text-[8px] font-bold flex items-center justify-center leading-none shrink-0"
                        >
                          ?
                        </button>
                        {openTip === i && (
                          <div className="absolute bottom-full left-0 mb-2 bg-[#4A3F35] rounded-lg px-3 py-2 w-44 z-30">
                            <p className="text-[10px] text-white leading-relaxed">{item.tip}</p>
                            <div className="absolute top-full left-4 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-[#4A3F35]"></div>
                          </div>
                        )}
                      </div>
                      <span className="text-[#DC2626] font-semibold tabular-nums shrink-0">
                        -{fmt(item.amount)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between px-3 py-2.5 text-[11px] border-t-2 border-[#DC2626] bg-[#FEF2F2]">
                    <span className="font-bold text-[#DC2626]">합계</span>
                    <span className="font-bold text-[#DC2626] tabular-nums">-{fmt(deductions.totalDeduction)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 실수령액 배너 */}
            <div className="mt-4 bg-[#F0FDF4] rounded-xl px-4 py-4 border border-[#059669]/20">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-bold text-[#4A3F35]">월 실수령액</span>
                  <p className="text-[10px] text-[#8B7E74] mt-0.5">매달 통장에 들어오는 돈</p>
                </div>
                <span className="text-xl font-bold text-[#059669]">{fmt(deductions.netPay)}원</span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#059669]/15">
                <span className="text-xs font-bold text-[#4A3F35]">연 실수령액</span>
                <span className="text-sm font-bold text-[#059669]">{fmt(deductions.netPay * 12)}원</span>
              </div>
            </div>
          </div>

          {/* ── 공제 비율 수평 막대 그래프 ── */}
          <div className={`${commonStyles.card} mt-4`}>
            <h3 className="text-sm font-bold text-[#4A3F35] mb-1">공제 비율</h3>
            <p className="text-[11px] text-[#8B7E74] mb-4">내 월급에서 공제가 차지하는 비중이에요</p>

            <div className="w-full h-9 bg-[#E8E0D6] rounded-full overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-[#059669] to-[#34D399] rounded-l-full flex items-center justify-center transition-all duration-500"
                style={{ width: `${netRatio}%` }}
              >
                <span className="text-[10px] text-white font-bold">실수령 {netRatio}%</span>
              </div>
              <div className="h-full flex items-center justify-center flex-1">
                <span className="text-[10px] text-[#8B7E74] font-bold">공제 {deductionRatio}%</span>
              </div>
            </div>

            <div className="flex justify-between mt-2.5">
              <span className="text-[10px] text-[#059669] font-bold">세후 {fmt(deductions.netPay)}원</span>
              <span className="text-[10px] text-[#DC2626] font-bold">공제 {fmt(deductions.totalDeduction)}원</span>
            </div>
          </div>
        </>
      )}

      {/* ── 실수령액 높이는 팁 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">실수령액을 높이는 꿀팁</h3>

        <div className="space-y-3">
          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">비과세 식대 활용</span> — 월 20만 원까지 식대는 세금이 안 붙어요. 연봉 협상할 때 식대를 별도로 책정하면 실수령액이 올라가요!
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">자차 출퇴근 수당</span> — 본인 차량으로 출퇴근하면 월 20만 원까지 비과세 처리돼요. 회사에 꼭 확인해 보세요!
            </p>
          </div>
        </div>
      </div>

      {/* ── 안내 문구 ── */}
      <div className="mt-4 px-2 text-center">
        <p className="text-[11px] text-[#8B7E74]">
          * 간이세액표 기준 예상 금액이며, 부양가족 수 등에 따라 달라질 수 있어요.
        </p>
      </div>
    </div>
  );
}

export default NetPayCalculatorSection;
