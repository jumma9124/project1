import React, { useState, useMemo } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

const FIXED_ITEMS = [
  { key: 'rent', label: '월세 / 관리비' },
  { key: 'phone', label: '통신비' },
  { key: 'insurance', label: '보험료' },
  { key: 'subscription', label: '구독료 (넷플릭스 등)' },
];

const VARIABLE_ITEMS = [
  { key: 'food', label: '식비' },
  { key: 'transport', label: '교통비' },
  { key: 'shopping', label: '쇼핑 / 의류' },
  { key: 'leisure', label: '여가 / 문화생활' },
];

// SVG 도넛 차트
function DonutChart({ fixed, variable }) {
  const total = fixed + variable;
  if (total === 0) return null;

  const fixedRatio = fixed / total;
  const variableRatio = variable / total;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const fixedArc = circumference * fixedRatio;
  const variableArc = circumference * variableRatio;

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        {/* 배경 원 */}
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#E8E0D6" strokeWidth="24" />

        {/* 고정지출 (파란) */}
        <circle
          cx="90" cy="90" r={radius}
          fill="none"
          stroke="#2563EB"
          strokeWidth="24"
          strokeDasharray={`${fixedArc} ${circumference - fixedArc}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          className="transition-all duration-700"
        />

        {/* 변동지출 (주황) */}
        <circle
          cx="90" cy="90" r={radius}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="24"
          strokeDasharray={`${variableArc} ${circumference - variableArc}`}
          strokeDashoffset={circumference * 0.25 - fixedArc}
          strokeLinecap="round"
          className="transition-all duration-700"
        />

        {/* 중앙 텍스트 */}
        <text x="90" y="82" textAnchor="middle" className="fill-[#4A3F35] text-[10px] font-bold">
          총 지출
        </text>
        <text x="90" y="102" textAnchor="middle" className="fill-[#4A3F35] text-[14px] font-bold">
          {total.toLocaleString()}원
        </text>
      </svg>

      {/* 범례 */}
      <div className="flex gap-5 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
          <span className="text-[10px] text-[#4A3F35]">고정 {(fixedRatio * 100).toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className="text-[10px] text-[#4A3F35]">변동 {(variableRatio * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

function ExpenseTrackerSection() {
  const [fixedValues, setFixedValues] = useState({});
  const [variableValues, setVariableValues] = useState({});

  const handleChange = (setter, key, raw) => {
    const num = raw.replace(/[^0-9]/g, '');
    setter(prev => ({ ...prev, [key]: num === '' ? '' : parseInt(num).toLocaleString() }));
  };

  const toNum = (v) => parseInt((v || '').replace(/,/g, '')) || 0;

  const fixedTotal = useMemo(
    () => FIXED_ITEMS.reduce((s, i) => s + toNum(fixedValues[i.key]), 0),
    [fixedValues]
  );
  const variableTotal = useMemo(
    () => VARIABLE_ITEMS.reduce((s, i) => s + toNum(variableValues[i.key]), 0),
    [variableValues]
  );

  const hasInput = fixedTotal > 0 || variableTotal > 0;
  const fmt = (n) => n.toLocaleString();

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 고정지출 입력 ── */}
      <div className={commonStyles.card}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#4A3F35]">고정지출</h3>
          <span className="text-[10px] text-[#8B7E74]">매달 같은 금액이 나가요</span>
        </div>

        <div className="space-y-2.5">
          {FIXED_ITEMS.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <span className="text-[11px] text-[#4A3F35] w-28 shrink-0">{item.label}</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={fixedValues[item.key] || ''}
                  onChange={(e) => handleChange(setFixedValues, item.key, e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#FFF9F0] border border-[#FFEDD5] rounded-lg pl-3 pr-8 py-2 text-[11px] text-[#4A3F35] font-semibold text-right outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-colors placeholder:text-[#C4B5A6] placeholder:font-normal"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#8B7E74] pointer-events-none">원</span>
              </div>
            </div>
          ))}
          {fixedTotal > 0 && (
            <div className="flex justify-between items-center pt-2 border-t border-[#E8E0D6]">
              <span className="text-[11px] font-bold text-[#2563EB]">소계</span>
              <span className="text-[11px] font-bold text-[#2563EB] tabular-nums">{fmt(fixedTotal)}원</span>
            </div>
          )}
        </div>
      </div>

      {/* ── 변동지출 입력 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <h3 className="text-sm font-bold text-[#4A3F35]">변동지출</h3>
          <span className="text-[10px] text-[#8B7E74]">매달 달라지는 금액이에요</span>
        </div>

        <div className="space-y-2.5">
          {VARIABLE_ITEMS.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <span className="text-[11px] text-[#4A3F35] w-28 shrink-0">{item.label}</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={variableValues[item.key] || ''}
                  onChange={(e) => handleChange(setVariableValues, item.key, e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#FFF9F0] border border-[#FFEDD5] rounded-lg pl-3 pr-8 py-2 text-[11px] text-[#4A3F35] font-semibold text-right outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/30 transition-colors placeholder:text-[#C4B5A6] placeholder:font-normal"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#8B7E74] pointer-events-none">원</span>
              </div>
            </div>
          ))}
          {variableTotal > 0 && (
            <div className="flex justify-between items-center pt-2 border-t border-[#E8E0D6]">
              <span className="text-[11px] font-bold text-[#F59E0B]">소계</span>
              <span className="text-[11px] font-bold text-[#F59E0B] tabular-nums">{fmt(variableTotal)}원</span>
            </div>
          )}
        </div>
      </div>

      {/* ── 도넛 차트 (입력 시 표시) ── */}
      {hasInput && (
        <div className={`${commonStyles.card} mt-4`}>
          <h3 className="text-sm font-bold text-[#4A3F35] mb-4 text-center">나의 지출 비율</h3>
          <DonutChart fixed={fixedTotal} variable={variableTotal} />

          {/* 금액 요약 */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-[#EFF6FF] rounded-xl px-4 py-3 text-center">
              <p className="text-[10px] text-[#4A3F35]">고정지출</p>
              <p className="text-sm font-bold text-[#2563EB] tabular-nums">{fmt(fixedTotal)}원</p>
            </div>
            <div className="bg-[#FFFBEB] rounded-xl px-4 py-3 text-center">
              <p className="text-[10px] text-[#4A3F35]">변동지출</p>
              <p className="text-sm font-bold text-[#F59E0B] tabular-nums">{fmt(variableTotal)}원</p>
            </div>
          </div>
        </div>
      )}

      {/* ── 비교 요약 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">고정 vs 변동, 어떻게 다를까?</h3>

        <div className="space-y-2.5">
          <div className="bg-[#EFF6FF] rounded-xl px-4 py-3">
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold text-[#2563EB]">고정지출</span>은 줄이기 힘들지만, <span className="font-bold">한 번 줄이면 효과가 매달 쌓여요.</span> 통신비 요금제를 바꾸면 매달 자동으로 절약!
            </p>
          </div>
          <div className="bg-[#FFFBEB] rounded-xl px-4 py-3">
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold text-[#F59E0B]">변동지출</span>은 <span className="font-bold">당장 내 의지로 줄일 수 있어요.</span> 이번 달 외식 한 번 줄이면 바로 효과가 보여요!
            </p>
          </div>
        </div>
      </div>

      {/* ── 꿀팁: 지출 줄이는 실전 팁 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">지출 줄이는 실전 팁</h3>

        <div className="space-y-3">
          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">통신비 점검</span> — 알뜰폰으로 바꾸면 월 3~5만 원 절약! 자급제 + 알뜰요금제 조합이 가장 저렴해요.
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">구독 서비스 정리</span> — 안 쓰는 구독은 바로 해지! 매달 빠져나가는 소액이 모이면 연간 수십만 원이에요.
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">식비는 주 단위로 관리</span> — 한 달 식비를 4주로 나눠서 주마다 예산을 정하면 과소비를 막을 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* ── 마무리 문구 ── */}
      <div className="mt-6 px-2 text-center">
        <p className="text-xs text-[#4A3F35] leading-relaxed font-medium">
          지출 관리는 나를 힘들게 하는 게 아니라,<br />
          내가 원하는 미래를 더 빨리 만나게 해주는 과정이에요! 🚀
        </p>
      </div>
    </div>
  );
}

export default ExpenseTrackerSection;
