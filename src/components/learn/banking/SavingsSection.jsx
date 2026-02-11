import React from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

// ── 매월 10만원 적금 시뮬레이션 (12개월, 연 4.0%) ──
const MONTHLY_DEPOSIT = 100_000;
const ANNUAL_RATE = 0.04;
const MONTHS = 12;

// 적금 이자 계산 (단리, 매월 납입)
const calculateSavingsData = () => {
  const data = [];
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  for (let month = 1; month <= MONTHS; month++) {
    cumulativePrincipal += MONTHLY_DEPOSIT;

    // 해당 월까지 납입한 각 회차의 이자 합산
    let totalInterest = 0;
    for (let i = 1; i <= month; i++) {
      const remainingMonths = month - i + 1;
      const interest = MONTHLY_DEPOSIT * (ANNUAL_RATE / 12) * remainingMonths;
      totalInterest += interest;
    }

    cumulativeInterest = totalInterest;

    data.push({
      month,
      principal: cumulativePrincipal,
      interest: Math.round(cumulativeInterest),
      total: cumulativePrincipal + Math.round(cumulativeInterest),
    });
  }

  return data;
};

const savingsData = calculateSavingsData();
const maxTotal = savingsData[savingsData.length - 1].total;

function SavingsSection() {
  const fmt = (n) => n.toLocaleString();

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 적금이란? ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">적금이란?</h3>

        <div className="bg-[#FFF9F0] rounded-2xl p-5 flex flex-col items-center text-center mb-4">
          <span className="text-3xl mb-2">🐖</span>
          <p className="text-[12px] font-bold text-[#FF8A00] mb-1.5">정기적금</p>
          <p className="text-[10px] text-[#4A3F35] leading-relaxed">
            <span className="font-bold text-[#FF8A00]">매달 일정 금액</span>을 꾸준히 모으고<br />
            만기가 되면<br />
            <span className="font-bold text-[#FF8A00]">원금 + 이자</span>를 받는 상품이에요
          </p>
        </div>

        {/* 가입 흐름 */}
        <p className="text-[11px] font-bold text-[#4A3F35] mb-2">적금은 이렇게 진행돼요</p>
        <div className="flex items-center gap-1.5 text-[10px]">
          <div className="bg-[#FFF9F0] rounded-lg px-2.5 py-2.5 text-center flex-1 border border-[#FFEDD5]/50">
            <p className="font-bold text-[#FF8A00]">STEP 1</p>
            <p className="text-[#4A3F35] mt-0.5">목표 설정</p>
          </div>
          <span className="text-[#8B7E74] font-bold shrink-0">→</span>
          <div className="bg-[#FFF9F0] rounded-lg px-2.5 py-2.5 text-center flex-1 border border-[#FFEDD5]/50">
            <p className="font-bold text-[#FF8A00]">STEP 2</p>
            <p className="text-[#4A3F35] mt-0.5">매월 저축</p>
          </div>
          <span className="text-[#8B7E74] font-bold shrink-0">→</span>
          <div className="bg-[#F0FDF4] rounded-lg px-2.5 py-2.5 text-center flex-1 border border-[#059669]/20">
            <p className="font-bold text-[#059669]">STEP 3</p>
            <p className="text-[#4A3F35] mt-0.5">목돈 완성</p>
          </div>
        </div>
      </div>

      {/* ── 매월 저축 누적 그래프 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">매월 10만원씩 1년 모으면?</h3>
        <p className="text-[11px] text-[#8B7E74] mb-5">연 4.0% 기준, 원금과 이자가 쌓이는 과정</p>

        {/* 계단형 누적 막대 차트 */}
        <div className="flex items-end justify-between gap-1.5 mb-4" style={{ height: '180px' }}>
          {savingsData.map((item) => {
            const principalHeight = (item.principal / maxTotal) * 180;
            const interestHeight = (item.interest / maxTotal) * 180;

            return (
              <div key={item.month} className="flex-1 flex flex-col justify-end items-center gap-1">
                {/* 누적 금액 표시 (3, 6, 9, 12개월만) */}
                {[3, 6, 9, 12].includes(item.month) && (
                  <div className="text-center mb-1">
                    <p className="text-[9px] font-bold text-[#059669]">{fmt(item.total)}원</p>
                  </div>
                )}

                {/* 이자 (상단) */}
                <div
                  className="w-full bg-[#34D399] rounded-t-sm"
                  style={{ height: `${interestHeight}px` }}
                />
                {/* 원금 (하단) */}
                <div
                  className="w-full bg-[#60A5FA]"
                  style={{ height: `${principalHeight}px` }}
                />

                {/* 월 표시 */}
                <p className="text-[9px] text-[#8B7E74] mt-1">{item.month}월</p>
              </div>
            );
          })}
        </div>

        {/* 범례 */}
        <div className="flex justify-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#60A5FA] rounded"></div>
            <span className="text-[#4A3F35]">원금</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#34D399] rounded"></div>
            <span className="text-[#4A3F35]">이자</span>
          </div>
        </div>

        {/* 최종 결과 */}
        <div className="mt-4 bg-[#F0FDF4] rounded-xl p-4 border border-[#059669]/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-[#4A3F35]">매월 납입</span>
            <span className="text-[12px] font-bold text-[#4A3F35]">{fmt(MONTHLY_DEPOSIT)}원</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-[#4A3F35]">총 납입 원금</span>
            <span className="text-[12px] font-bold text-[#60A5FA]">{fmt(savingsData[MONTHS - 1].principal)}원</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-[#4A3F35]">받는 이자 (세전)</span>
            <span className="text-[12px] font-bold text-[#34D399]">+{fmt(savingsData[MONTHS - 1].interest)}원</span>
          </div>
          <div className="h-px bg-[#059669]/20 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="text-[12px] font-bold text-[#059669]">만기 수령액</span>
            <span className="text-[14px] font-bold text-[#059669]">{fmt(savingsData[MONTHS - 1].total)}원</span>
          </div>
        </div>
      </div>

      {/* ── 적금 종류 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">적금의 종류</h3>

        <div className="space-y-3">
          <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#FF8A00] mb-1">정액적금</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  매달 <span className="font-bold">같은 금액</span>을 저축해요. 가장 기본적이고 대중적인 방식이에요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#DBEAFE]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#2563EB] mb-1">자유적금</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  매달 <span className="font-bold">원하는 금액</span>을 자유롭게 넣을 수 있어요. 수입이 불규칙할 때 유용해요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">목돈마련적금</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  목표 금액을 정하고 <span className="font-bold">역산해서</span> 매달 금액을 정해요. 결혼자금, 전세금 등에 적합해요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 실시간 적금 금리 TOP 5 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">12개월 적금 금리 TOP 5</h3>
        <p className="text-[11px] text-[#8B7E74] mb-4">최고 우대금리 기준, 은행권</p>

        <div className="py-8 text-center">
          <p className="text-xs text-[#8B7E74]">금리 데이터를 불러올 수 없어요.</p>
        </div>
      </div>

      {/* ── 적금 꿀팁 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">💡 적금 활용 꿀팁</h3>

        <div className="space-y-2.5">
          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 1</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">월급날 자동이체</span>로 설정하면 저축이 습관이 돼요!
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 2</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">우대금리 조건</span>을 꼭 확인하세요. 0.5%p만 올라도 이자가 크게 달라져요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 3</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              중도 해지하면 <span className="font-bold">이자가 크게 줄어드니</span> 여유 자금으로 시작하세요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 4</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">목표 기간</span>을 명확히 정하고(여행자금 6개월, 전세금 2년 등) 맞춤 적금을 선택하세요.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SavingsSection;
