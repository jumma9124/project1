import React, { useState } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function LoanTypesSection() {
  const fmt = (n) => n.toLocaleString();

  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState(0); // 0: 신용대출, 1: 전월세대출, 2: 비상금대출

  // 대출 금액 예시
  const loanAmount = 10_000_000; // 1,000만원
  const interestRate = 5.5; // 연 5.5%
  const period = 12; // 12개월

  // 월 이자 계산 (단순 계산)
  const monthlyInterest = Math.round((loanAmount * (interestRate / 100)) / 12);
  const totalInterest = monthlyInterest * period;

  const tabs = [
    {
      id: 0,
      name: '신용대출',
      icon: '🙋',
      color: '#FF8A00',
      bgColor: '#FFF9F0',
      borderColor: '#FFEDD5',
    },
    {
      id: 1,
      name: '전월세대출',
      icon: '🏠',
      color: '#2563EB',
      bgColor: '#EFF6FF',
      borderColor: '#DBEAFE',
    },
    {
      id: 2,
      name: '햇살론 유스',
      icon: '☀️',
      color: '#059669',
      bgColor: '#F0FDF4',
      borderColor: '#D1FAE5',
    },
  ];

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 대출이란? ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">대출이란?</h3>

        <div className="bg-[#4A3F35] rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">⏰</span>
            <div>
              <p className="text-[13px] font-bold text-white mb-1">
                <span className="bg-[#FF8A00] px-2 py-0.5 rounded">대출</span>은
              </p>
              <p className="text-[11px] text-white/90 leading-relaxed">
                <span className="font-bold text-[#FFE4B5]">미래의 나에게서 돈을 빌려오는 약속</span>이에요.
              </p>
            </div>
          </div>
        </div>

        {/* 쉬운 설명 */}
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
          <div className="flex items-start gap-2">
            <span className="text-base">💡</span>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-[#FF8A00] mb-1">쉽게 말하면</p>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                지금은 돈이 없지만, <span className="font-bold bg-[#FFE4B5] px-1">미래에 갚을 거라고 약속</span>하고 은행에서 돈을 빌려 쓰는 거예요. 대신 <span className="font-bold text-[#FF8A00]">이자</span>라는 빌린 대가를 내야 해요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 14번 복습: 원금 + 이자 = 원리금 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">💡 복습: 대출도 원금 + 이자를 내야 해요</h3>

        <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex-1 text-center">
              <span className="text-base block mb-1">💼</span>
              <p className="text-[10px] font-bold text-[#FF8A00]">원금</p>
              <p className="text-[9px] text-[#8B7E74]">빌린 돈</p>
            </div>
            <span className="text-lg font-bold text-[#4A3F35]">+</span>
            <div className="flex-1 text-center">
              <span className="text-base block mb-1">💸</span>
              <p className="text-[10px] font-bold text-[#059669]">이자</p>
              <p className="text-[9px] text-[#8B7E74]">빌린 대가</p>
            </div>
            <span className="text-lg font-bold text-[#4A3F35]">=</span>
            <div className="flex-1 text-center">
              <span className="text-base block mb-1">💰</span>
              <p className="text-[10px] font-bold text-[#4A3F35]">원리금</p>
              <p className="text-[9px] text-[#8B7E74]">실제 갚을 돈</p>
            </div>
          </div>
          <p className="text-[10px] text-[#4A3F35] text-center leading-relaxed">
            예: {fmt(loanAmount)}원을 빌리면, <span className="font-bold text-[#FF8A00]">원금 {fmt(loanAmount)}원</span> + <span className="font-bold text-[#059669]">이자 약 {fmt(totalInterest)}원</span> = <span className="font-bold text-[#4A3F35]">총 {fmt(loanAmount + totalInterest)}원</span>을 갚아야 해요. (연 {interestRate}%, {period}개월 기준)
          </p>
        </div>
      </div>

      {/* ── 대출의 종류 (탭 UI) ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">사회초년생이 알아야 할 대출 종류</h3>

        {/* 탭 버튼 */}
        <div className="flex gap-2 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-3 rounded-xl font-bold text-[11px] transition-all duration-300 ${
                activeTab === tab.id
                  ? `border-2`
                  : 'bg-[#FCF9F5] text-[#8B7E74] border-2 border-transparent'
              }`}
              style={
                activeTab === tab.id
                  ? {
                      backgroundColor: tab.bgColor,
                      color: tab.color,
                      borderColor: tab.color,
                    }
                  : {}
              }
            >
              <span className="block text-base mb-1">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* 탭 내용 */}
        <div className="min-h-[400px]">
          {/* 신용대출 */}
          {activeTab === 0 && (
            <div className="space-y-4">
              <div className="bg-[#FFF9F0] rounded-2xl p-5 border-2 border-[#FF8A00]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🙋</span>
                  <div>
                    <p className="text-[13px] font-bold text-[#FF8A00] mb-1">신용대출</p>
                    <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                      직장과 연봉을 보고 빌려주는 돈
                    </p>
                  </div>
                </div>
              </div>

              {/* 특징 */}
              <div className="bg-white rounded-xl p-4 border border-[#FFEDD5]/50">
                <p className="text-[11px] font-bold text-[#4A3F35] mb-3">✓ 특징</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#FF8A00] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">담보 없이</span> 내 신용(직장, 연봉, 신용점수)만으로 빌려요.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FF8A00] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      금리는 보통 <span className="font-bold">연 4~8%</span> 정도예요. (신용점수에 따라 다름)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FF8A00] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      빠르면 당일에 받을 수 있어서 <span className="font-bold">급할 때 유용</span>해요.
                    </p>
                  </div>
                </div>
              </div>

              {/* 좋은 점 */}
              <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
                <p className="text-[11px] font-bold text-[#059669] mb-2">👍 좋은 점</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      집이나 자동차 같은 담보가 없어도 OK
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      승인이 빨라서 급할 때 좋아요
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      중도상환 수수료가 낮거나 없는 경우가 많아요
                    </p>
                  </div>
                </div>
              </div>

              {/* 주의할 점 */}
              <div className="bg-[#FEF2F2] rounded-xl p-4 border border-[#FEE2E2]/50">
                <p className="text-[11px] font-bold text-[#EF4444] mb-2">⚠️ 주의할 점</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      담보대출보다 <span className="font-bold text-[#EF4444]">금리가 높아요</span> (이자를 더 많이 내야 함)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      신용점수가 낮으면 <span className="font-bold text-[#EF4444]">금리가 더 높거나 거절</span>될 수 있어요
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      연체하면 신용점수가 크게 떨어져요
                    </p>
                  </div>
                </div>
              </div>

              {/* 추천 대상 */}
              <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
                <p className="text-[11px] font-bold text-[#FF8A00] mb-2">💡 이런 분께 추천해요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  직장이 있고 신용점수가 괜찮은데, 급하게 목돈이 필요한 사회초년생! 단, 갚을 계획을 꼭 세우고 빌리세요.
                </p>
              </div>
            </div>
          )}

          {/* 전월세대출 */}
          {activeTab === 1 && (
            <div className="space-y-4">
              <div className="bg-[#EFF6FF] rounded-2xl p-5 border-2 border-[#2563EB]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🏠</span>
                  <div>
                    <p className="text-[13px] font-bold text-[#2563EB] mb-1">전월세대출</p>
                    <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                      이사 갈 때 꼭 필요한 청년 맞춤형 대출
                    </p>
                  </div>
                </div>
              </div>

              {/* 특징 */}
              <div className="bg-white rounded-xl p-4 border border-[#DBEAFE]/50">
                <p className="text-[11px] font-bold text-[#4A3F35] mb-3">✓ 특징</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      전세금이나 월세 보증금을 마련하기 위한 <span className="font-bold">목적형 대출</span>이에요.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      금리는 보통 <span className="font-bold">연 2~4%</span>로 신용대출보다 낮아요. (정부 지원)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">청년 우대</span>로 더 낮은 금리를 받을 수 있어요.
                    </p>
                  </div>
                </div>
              </div>

              {/* 좋은 점 */}
              <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
                <p className="text-[11px] font-bold text-[#059669] mb-2">👍 좋은 점</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      신용대출보다 <span className="font-bold">금리가 훨씬 낮아요</span> (정부 지원 상품)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      청년이라면 추가 우대 금리를 받을 수 있어요
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      이사 비용 부담을 크게 줄여줘요
                    </p>
                  </div>
                </div>
              </div>

              {/* 주의할 점 */}
              <div className="bg-[#FEF2F2] rounded-xl p-4 border border-[#FEE2E2]/50">
                <p className="text-[11px] font-bold text-[#EF4444] mb-2">⚠️ 주의할 점</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold text-[#EF4444]">전월세 목적으로만</span> 써야 해요 (다른 용도 사용 금지)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      소득 조건이 있어서 <span className="font-bold text-[#EF4444]">누구나 받을 수 없어요</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      계약서 등 서류가 많이 필요해요
                    </p>
                  </div>
                </div>
              </div>

              {/* 추천 상품 */}
              <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#DBEAFE]/50">
                <p className="text-[11px] font-bold text-[#2563EB] mb-2">💡 대표 상품</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] text-xs shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">버팀목 전세자금대출</span>: 연 1~3%대 저금리
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] text-xs shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">청년 전용 전세대출</span>: 만 34세 이하 청년 우대
                    </p>
                  </div>
                </div>
              </div>

              {/* 추천 대상 */}
              <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
                <p className="text-[11px] font-bold text-[#FF8A00] mb-2">💡 이런 분께 추천해요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  독립을 준비하는 사회초년생! 전세금이 부담되는 청년이라면 꼭 알아보세요. 정부 지원으로 금리가 매우 낮아요.
                </p>
              </div>
            </div>
          )}

          {/* 햇살론 유스 */}
          {activeTab === 2 && (
            <div className="space-y-4">
              <div className="bg-[#F0FDF4] rounded-2xl p-5 border-2 border-[#059669]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">☀️</span>
                  <div>
                    <p className="text-[13px] font-bold text-[#059669] mb-1">햇살론 유스</p>
                    <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                      국가가 보증하는 만 34세 이하 청년 전용 대출
                    </p>
                  </div>
                </div>
              </div>

              {/* 특징 */}
              <div className="bg-white rounded-xl p-4 border border-[#D1FAE5]/50">
                <p className="text-[11px] font-bold text-[#4A3F35] mb-3">✓ 특징</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">만 34세 이하 청년</span>을 위한 국가 보증 대출이에요.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      금리는 <span className="font-bold">연 3.5% 수준</span>으로 매우 낮아요!
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-sm shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">넉넉한 거치 기간</span>이 있어서 취업 준비할 시간을 줘요.
                    </p>
                  </div>
                </div>
              </div>

              {/* 좋은 점 */}
              <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
                <p className="text-[11px] font-bold text-[#059669] mb-2">👍 좋은 점</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">초저금리</span> - 연 3.5% 수준으로 신용대출보다 훨씬 낮아요
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">소득이 적어도 OK</span> - 취업 준비생, 저소득 청년도 이용 가능
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">거치 기간</span> 있음 - 최대 1년간 이자만 내도 돼요
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">✓</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">국가 보증</span> - 정부가 보증해서 안전해요
                    </p>
                  </div>
                </div>
              </div>

              {/* 주의할 점 */}
              <div className="bg-[#FEF2F2] rounded-xl p-4 border border-[#FEE2E2]/50">
                <p className="text-[11px] font-bold text-[#EF4444] mb-2">⚠️ 주의할 점</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold text-[#EF4444]">평생 한도 1,200만 원</span> 내에서만 이용 가능해요
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      한 번 쓰면 남은 한도가 줄어들어서 <span className="font-bold">신중하게 결정</span>해야 해요
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] text-xs shrink-0">!</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      만 34세까지만 신청 가능 (35세 생일 전까지!)
                    </p>
                  </div>
                </div>
              </div>

              {/* 이용 조건 */}
              <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
                <p className="text-[11px] font-bold text-[#059669] mb-2">📋 이용 조건</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">나이:</span> 만 19~34세 청년
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">소득:</span> 연 소득 3,500만 원 이하 (저소득 청년)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#059669] text-xs shrink-0">•</span>
                    <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                      <span className="font-bold">한도:</span> 최대 1,200만 원 (평생 누적)
                    </p>
                  </div>
                </div>
              </div>

              {/* 추천 대상 */}
              <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
                <p className="text-[11px] font-bold text-[#FF8A00] mb-2">💡 이런 분께 추천해요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  취업 준비 중이거나 소득이 적은 34세 이하 청년! 저금리로 안전하게 빌릴 수 있어요. 단, 평생 한도가 있으니 <span className="font-bold text-[#FF8A00]">정말 필요한 만큼만 신중하게 사용</span>하세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 대출 선택 가이드 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">💡 어떤 대출을 선택해야 할까?</h3>

        <div className="space-y-2.5">
          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0">☀️</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">소득이 적거나 취업 준비 중이라면?</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  → <span className="font-bold text-[#059669]">햇살론 유스</span>를 가장 먼저 확인하세요! 초저금리에 국가 보증이에요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0">🏠</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#FF8A00] mb-1">이사 준비 중이라면?</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  → <span className="font-bold">전월세대출</span> 먼저 알아보세요! 금리가 가장 낮아요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#DBEAFE]/50">
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0">💼</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#2563EB] mb-1">목돈이 필요하다면?</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  → <span className="font-bold">신용대출</span>을 고려하세요. 단, 갚을 계획을 꼭 세우세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 대출 받기 전 체크리스트 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">✅ 대출 받기 전 꼭 확인하세요</h3>

        <div className="space-y-2.5">
          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">□</span>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                매달 갚아야 할 <span className="font-bold">원리금(원금+이자)</span>을 계산했나요?
              </p>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">□</span>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                내 월급으로 <span className="font-bold">무리 없이 갚을 수 있나요?</span> (월급의 30% 이내 권장)
              </p>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">□</span>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                여러 은행의 <span className="font-bold">금리를 비교</span>해봤나요?
              </p>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">□</span>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                정말 <span className="font-bold">필요한 만큼만</span> 빌리고 있나요?
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LoanTypesSection;
