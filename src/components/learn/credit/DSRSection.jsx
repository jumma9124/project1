import React, { useState } from 'react';

// 공통 스타일 (다른 섹션과 통일)
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function DSRSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [monthlySalary, setMonthlySalary] = useState(3000000);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(800000);

  const tabs = ['DSR이란?', '40%의 법칙', '합산되는 대출들'];

  // DSR 계산 (연소득 대비 연간 원리금 상환액)
  const annualSalary = monthlySalary * 12;
  const annualPayment = totalMonthlyPayment * 12;
  const dsr = Math.round((annualPayment / annualSalary) * 100);

  // DSR 상태 판정
  const getDSRStatus = (dsr) => {
    if (dsr <= 40) return { text: '안전', color: '#059669', bgColor: '#F0FDF4' };
    if (dsr <= 60) return { text: '주의', color: '#FF8A00', bgColor: '#FFF9F0' };
    return { text: '위험', color: '#EF4444', bgColor: '#FEF2F2' };
  };

  const status = getDSRStatus(dsr);

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── DSR이란? ── */}
      <div className={commonStyles.card}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📊</span>
          <h2 className="text-xl font-bold text-[#3E2C1C]">DSR (총부채원리금상환비율)</h2>
        </div>
        <p className="text-lg font-bold text-[#FF8A00] mb-2">
          내 월급 대비 빚의 무게
        </p>
        <p className="text-sm text-[#8B7E74] leading-relaxed">
          연소득 대비 대출 갚는 돈의 비율이에요.
        </p>
      </div>

      {/* ── 탭 네비게이션 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <div className="flex gap-2 mb-4">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm transition-colors ${
                activeTab === idx
                  ? 'bg-[#FF8A00] text-white font-medium'
                  : 'bg-[#FFF8F0] text-[#8B7E74]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 1: DSR이란? */}
        {activeTab === 0 && (
          <div className="space-y-4">
            {/* 원리금 연결 */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                🔗 14번에서 배운 '원리금'이 핵심이에요!
              </h3>
              <p className="text-sm text-[#5C4A3A] leading-relaxed">
                DSR은 <span className="font-bold text-blue-600">원리금</span>(원금 + 이자)을 얼마나 갚고 있는지 보는 지표예요.
                모든 대출의 <span className="font-bold">월 원리금 상환액</span>을 합쳐서 계산해요.
              </p>
            </div>

            {/* 쉬운 설명 */}
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💰</span>
                <div>
                  <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                    💡 월급과 빚의 무게를 비교하는 지표
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    <span className="font-bold text-[#FF8A00]">1년간 벌 돈</span> 중에서
                    <span className="font-bold text-[#EF4444]"> 1년간 갚을 돈</span>이 차지하는 비율이에요.
                    쉽게 말하면 "내 월급의 몇 %를 대출 갚는데 쓰는가"를 보여줘요.
                  </p>
                </div>
              </div>
            </div>

            {/* 계산 공식 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                📐 계산 방법
              </h3>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm font-mono text-center text-[#3E2C1C] mb-2">
                  DSR (%) = (연간 대출 원리금 상환액 ÷ 연소득) × 100
                </p>
                <div className="space-y-1 text-xs text-[#8B7E74] mt-3">
                  <p className="text-center">
                    예시) 연봉 3,600만 원, 월 대출 상환액 80만 원
                  </p>
                  <p className="text-center">
                    → (80만 × 12개월 ÷ 3,600만) × 100 = <span className="font-bold text-[#FF8A00]">26.7%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* DSR 계산기 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🧮 내 DSR 계산해보기
              </h3>

              {/* 월급 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">월 소득 (세전)</span>
                  <span className="text-sm font-bold text-[#059669]">
                    {monthlySalary.toLocaleString()}원
                  </span>
                </div>
                <input
                  type="range"
                  min="2000000"
                  max="10000000"
                  step="500000"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 대출 상환액 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">월 대출 원리금 상환액</span>
                  <span className="text-sm font-bold text-[#EF4444]">
                    {totalMonthlyPayment.toLocaleString()}원
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3000000"
                  step="100000"
                  value={totalMonthlyPayment}
                  onChange={(e) => setTotalMonthlyPayment(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* DSR 결과 */}
              <div className={`rounded-lg p-4 border-2`} style={{ backgroundColor: status.bgColor, borderColor: status.color }}>
                <div className="text-center">
                  <p className="text-xs text-[#8B7E74] mb-1">내 DSR</p>
                  <p className="text-4xl font-bold mb-2" style={{ color: status.color }}>
                    {dsr}%
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full" style={{ backgroundColor: status.color }}>
                    <p className="text-xs font-bold text-white">{status.text}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t" style={{ borderColor: status.color + '40' }}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#8B7E74]">연소득</span>
                    <span className="font-bold text-[#059669]">{annualSalary.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8B7E74]">연간 상환액</span>
                    <span className="font-bold text-[#EF4444]">{annualPayment.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 2: 40%의 법칙 */}
        {activeTab === 1 && (
          <div className="space-y-4">
            {/* 40% 기준 설명 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚖️</span>
                <div>
                  <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                    왜 40%가 기준일까요?
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    금융당국은 <span className="font-bold text-[#FF8A00]">DSR 40%</span>를 안전한 대출 수준으로 봐요.
                    월급의 40%를 넘게 빚을 갚으면 생활이 힘들어질 수 있기 때문이에요.
                  </p>
                </div>
              </div>
            </div>

            {/* DSR 단계별 가이드 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                📊 DSR 단계별 가이드
              </h3>

              {/* 0-40%: 안전 */}
              <div className="bg-[#F0FDF4] rounded-lg p-3 border border-green-200 mb-3">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <h4 className="text-sm font-bold text-green-800">0~40%: 안전</h4>
                </div>
                <div className="space-y-1.5 ml-6">
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#059669]">추가 대출 가능</span>
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    생활비에 여유가 있고, 필요하면 추가로 대출을 받을 수 있어요.
                  </p>
                </div>
              </div>

              {/* 40-60%: 주의 */}
              <div className="bg-[#FFF9F0] rounded-lg p-3 border border-orange-200 mb-3">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-orange-600 text-lg">⚠</span>
                  <h4 className="text-sm font-bold text-orange-800">40~60%: 주의</h4>
                </div>
                <div className="space-y-1.5 ml-6">
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#FF8A00]">추가 대출 제한</span>
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    생활비가 빠듯해지기 시작해요. 추가 대출이 어려울 수 있어요.
                  </p>
                </div>
              </div>

              {/* 60%+: 위험 */}
              <div className="bg-[#FEF2F2] rounded-lg p-3 border border-red-200">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-red-600 text-lg">✗</span>
                  <h4 className="text-sm font-bold text-red-800">60% 이상: 위험</h4>
                </div>
                <div className="space-y-1.5 ml-6">
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#EF4444]">추가 대출 거의 불가</span>
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    월급의 절반 이상을 대출 갚는데 써요. 매우 위험한 수준이에요.
                  </p>
                </div>
              </div>
            </div>

            {/* 실제 사례 */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                📝 실제 사례로 이해하기
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-bold text-[#059669] mb-1">
                    ✓ 월급 300만 원, 대출 상환액 80만 원
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → DSR 26.7% (안전) - 추가 대출 가능
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-bold text-[#FF8A00] mb-1">
                    ⚠ 월급 300만 원, 대출 상환액 150만 원
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → DSR 50% (주의) - 추가 대출 제한적
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">
                    ✗ 월급 300만 원, 대출 상환액 200만 원
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → DSR 66.7% (위험) - 추가 대출 거의 불가
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 3: 합산되는 대출들 */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {/* 포함되는 대출 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                ✅ DSR에 포함되는 대출
              </h3>
              <p className="text-xs text-[#8B7E74] mb-3">
                아래 모든 대출의 <span className="font-bold text-[#FF8A00]">월 원리금 상환액</span>을 합쳐서 계산해요.
              </p>

              <div className="space-y-2">
                <div className="bg-[#F0FDF4] rounded-lg p-3 border border-green-200">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 text-sm shrink-0">1.</span>
                    <div>
                      <p className="text-sm font-bold text-[#3E2C1C]">신용대출</p>
                      <p className="text-xs text-[#8B7E74] mt-1">
                        15번에서 배운 신용대출의 월 상환액
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F0FDF4] rounded-lg p-3 border border-green-200">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 text-sm shrink-0">2.</span>
                    <div>
                      <p className="text-sm font-bold text-[#3E2C1C]">주택담보대출</p>
                      <p className="text-xs text-[#8B7E74] mt-1">
                        집을 담보로 받은 대출의 월 상환액
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F0FDF4] rounded-lg p-3 border border-green-200">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 text-sm shrink-0">3.</span>
                    <div>
                      <p className="text-sm font-bold text-[#3E2C1C]">전월세대출</p>
                      <p className="text-xs text-[#8B7E74] mt-1">
                        15번에서 배운 전월세대출의 월 상환액
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F0FDF4] rounded-lg p-3 border border-green-200">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 text-sm shrink-0">4.</span>
                    <div>
                      <p className="text-sm font-bold text-[#3E2C1C]">자동차 할부 (리스 포함)</p>
                      <p className="text-xs text-[#8B7E74] mt-1">
                        자동차 할부금도 DSR에 포함돼요
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F0FDF4] rounded-lg p-3 border border-green-200">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 text-sm shrink-0">5.</span>
                    <div>
                      <p className="text-sm font-bold text-[#3E2C1C]">기타 모든 대출</p>
                      <p className="text-xs text-[#8B7E74] mt-1">
                        학자금 대출, 햇살론 유스 등 모든 대출 포함
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 마이너스 통장 주의 */}
            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-300">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-sm font-bold text-[#3E2C1C]">
                  16번 '마이너스 통장'은 특별해요!
                </h3>
              </div>
              <p className="text-sm text-[#5C4A3A] leading-relaxed">
                마이너스 통장은 <span className="font-bold text-[#FF8A00]">실제로 쓴 금액</span>만 DSR에 포함돼요.
                한도가 있어도 안 쓰면 DSR에 영향이 없어요.
              </p>
            </div>

            {/* 계산 예시 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                💡 DSR 계산 예시
              </h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs font-bold text-[#3E2C1C] mb-2">
                  연봉 3,600만 원인 직장인의 대출 현황
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8B7E74]">• 신용대출 월 상환액</span>
                    <span className="font-bold text-[#3E2C1C]">40만 원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8B7E74]">• 전월세대출 월 상환액</span>
                    <span className="font-bold text-[#3E2C1C]">30만 원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8B7E74]">• 자동차 할부금</span>
                    <span className="font-bold text-[#3E2C1C]">10만 원</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="text-[#8B7E74]">월 총 상환액</span>
                    <span className="font-bold text-[#EF4444]">80만 원</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 text-center">
                  <p className="text-xs text-[#8B7E74] mb-1">DSR 계산</p>
                  <p className="text-sm font-mono text-[#3E2C1C]">
                    (80만 × 12 ÷ 3,600만) × 100 = <span className="text-lg font-bold text-[#059669]">26.7%</span>
                  </p>
                  <p className="text-xs text-green-600 font-bold mt-2">✓ 안전한 수준</p>
                </div>
              </div>
            </div>

            {/* 최종 조언 */}
            <div className="bg-[#3E2C1C] text-white rounded-xl p-4">
              <h3 className="text-sm font-bold mb-2">📌 핵심 정리</h3>
              <p className="text-xs leading-relaxed opacity-90">
                DSR은 <span className="font-bold">모든 대출을 합산</span>해서 계산해요.
                대출을 받을 때는 다른 대출까지 고려해서
                <span className="font-bold"> DSR 40% 이하</span>를 유지하는 게 중요해요!
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default DSRSection;
