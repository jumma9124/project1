import React, { useState } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

// 가상 급여 명세서 데이터 (연봉 3,000만 원 기준)
const payData = {
  지급항목: [
    { name: '기본급', amount: 2300000 },
    { name: '식대', amount: 200000 },
  ],
  공제항목: [
    {
      name: '국민연금',
      amount: 103500,
      tip: '노후에 매달 연금으로 돌려받는 돈이에요. 회사도 같은 금액을 내줘요!',
    },
    {
      name: '건강보험',
      amount: 81420,
      tip: '병원비를 저렴하게 내기 위한 보험이에요. 회사가 절반을 부담해요!',
    },
    {
      name: '장기요양보험',
      amount: 10430,
      tip: '나이 들어 돌봄이 필요할 때 서비스를 받기 위한 보험이에요.',
    },
    {
      name: '고용보험',
      amount: 20700,
      tip: '실직했을 때 실업급여를 받을 수 있게 해주는 보험이에요.',
    },
    {
      name: '소득세',
      amount: 26520,
      tip: '번 돈에 대해 나라에 내는 세금이에요. 연말정산으로 돌려받을 수도 있어요!',
    },
    {
      name: '지방소득세',
      amount: 2650,
      tip: '소득세의 10%를 지방자치단체에 추가로 내는 세금이에요.',
    },
  ],
};

function SalaryPayslipSection() {
  const [openTip, setOpenTip] = useState(null);

  const totalPayment = payData.지급항목.reduce((sum, item) => sum + item.amount, 0);
  const totalDeduction = payData.공제항목.reduce((sum, item) => sum + item.amount, 0);
  const netPay = totalPayment - totalDeduction;

  const fmt = (n) => n.toLocaleString();

  return (
    <div className="px-6 mt-6 pb-10" onClick={() => setOpenTip(null)}>

      {/* ── 급여명세서 카드 ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4 flex items-center gap-1.5">
          가상 급여명세서
          <span className="text-[10px] font-normal text-[#8B7E74]">(연봉 3,000만 원 기준)</span>
        </h3>

        {/* 2열 명세서 테이블 */}
        <div className="grid grid-cols-2 gap-3">

          {/* 왼쪽: 지급항목 */}
          <div>
            <div className="bg-[#059669] rounded-t-lg px-3 py-2">
              <span className="text-[11px] font-bold text-white">지급항목</span>
            </div>
            <div className="border border-t-0 border-[#D6CFC7] rounded-b-lg overflow-hidden">
              {payData.지급항목.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-3 py-2.5 text-[11px] ${
                    i > 0 ? 'border-t border-[#E8E0D6]' : ''
                  }`}
                >
                  <span className="text-[#4A3F35]">{item.name}</span>
                  <span className="text-[#4A3F35] font-semibold tabular-nums">
                    {fmt(item.amount)}
                  </span>
                </div>
              ))}

              {/* 빈 칸 — 높이 맞추기 */}
              <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>
              <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>
              <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>
              <div className="border-t border-[#E8E0D6] px-3 py-2.5 text-[11px] text-transparent select-none">-</div>

              {/* 합계 */}
              <div className="flex justify-between px-3 py-2.5 text-[11px] border-t-2 border-[#059669] bg-[#F0FDF4]">
                <span className="font-bold text-[#059669]">합계</span>
                <span className="font-bold text-[#059669] tabular-nums">{fmt(totalPayment)}</span>
              </div>
            </div>
          </div>

          {/* 오른쪽: 공제항목 */}
          <div>
            <div className="bg-[#DC2626] rounded-t-lg px-3 py-2">
              <span className="text-[11px] font-bold text-white">공제항목</span>
            </div>
            <div className="border border-t-0 border-[#D6CFC7] rounded-b-lg">
              {payData.공제항목.map((item, i) => (
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

              {/* 합계 */}
              <div className="flex justify-between px-3 py-2.5 text-[11px] border-t-2 border-[#DC2626] bg-[#FEF2F2]">
                <span className="font-bold text-[#DC2626]">합계</span>
                <span className="font-bold text-[#DC2626] tabular-nums">-{fmt(totalDeduction)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 실수령액 배너 */}
        <div className="mt-4 bg-[#FFF9F0] rounded-xl px-4 py-3 flex justify-between items-center border border-[#FFEDD5]/50">
          <span className="text-sm font-bold text-[#4A3F35]">실수령액</span>
          <span className="text-lg font-bold text-[#059669]">{fmt(netPay)}원</span>
        </div>
      </div>

      {/* ── 각 공제 항목의 의미 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">내 월급에서 빠지는 돈, 어디로 가는 걸까?</h3>

        <div className="space-y-2.5">
          <div className="bg-[#FFF9F0] rounded-xl px-4 py-3">
            <p className="text-[11px] font-bold text-[#1A1210] mb-1">4대 보험 (4가지)</p>
            <div className="space-y-1.5 text-[11px] text-[#4A3F35] leading-relaxed">
              <p><span className="font-bold text-[#059669]">국민연금</span> — 나이 들면 매달 연금으로 돌려받아요. 회사도 같은 금액을 같이 내줘요.</p>
              <p><span className="font-bold text-[#059669]">건강보험</span> — 병원에 갈 때 진료비를 저렴하게 해줘요. 회사가 절반 부담해요.</p>
              <p><span className="font-bold text-[#059669]">장기요양보험</span> — 나중에 돌봄이 필요할 때 서비스를 받을 수 있어요.</p>
              <p><span className="font-bold text-[#059669]">고용보험</span> — 실직하면 실업급여를 받을 수 있게 해줘요.</p>
            </div>
          </div>
          <div className="bg-[#FFF9F0] rounded-xl px-4 py-3">
            <p className="text-[11px] font-bold text-[#1A1210] mb-1">세금 (2가지)</p>
            <div className="space-y-1.5 text-[11px] text-[#4A3F35] leading-relaxed">
              <p><span className="font-bold text-[#DC2626]">소득세</span> — 번 돈에 대해 나라에 내는 세금이에요. 연말정산으로 일부를 돌려받을 수도 있어요.</p>
              <p><span className="font-bold text-[#DC2626]">지방소득세</span> — 소득세의 10%를 추가로 우리 동네(지자체)에 내는 세금이에요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 핵심 문구: 세전/세후 체크카드 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">세전과 세후, 이게 왜 중요할까?</h3>

        <div className="space-y-3">
          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">연봉 협상할 때</span> — 회사가 말하는 연봉은 '세전'이에요. 실제로 통장에 들어오는 돈은 여기서 세금을 뺀 '세후'예요.
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">생활비 계획할 때</span> — 세후 금액 기준으로 계획해야 돈이 부족해지지 않아요!
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">공제는 나쁜 게 아니에요</span> — 4대보험은 미래의 나를 지켜주는 안전망이에요. 아깝지 않아요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaryPayslipSection;
