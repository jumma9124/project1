import React, { useState } from 'react';

// 공통 스타일 (다른 섹션과 통일)
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function MinusAccountSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [usedAmount, setUsedAmount] = useState(500000);
  const [limit, setLimit] = useState(3000000);

  const tabs = ['마이너스 통장이란?', '이자 계산법', '사용 주의점'];

  // 일일 이자 계산 (연 4% 가정)
  const annualRate = 4;
  const dailyInterest = Math.round((usedAmount * (annualRate / 100)) / 365);
  const monthlyInterest = dailyInterest * 30;

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 마이너스 통장이란? ── */}
      <div className={commonStyles.card}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💳</span>
          <h2 className="text-xl font-bold text-[#3E2C1C]">마이너스 통장</h2>
        </div>
        <p className="text-sm text-[#8B7E74] leading-relaxed">
          통장 잔고가 0원 이하로 내려가도 돈을 쓸 수 있는 대출이에요.
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

        {/* 탭 1: 마이너스 통장이란? */}
        {activeTab === 0 && (
          <div className="space-y-4">
            {/* 비상금 봉투 비유 */}
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📮</span>
                <div>
                  <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                    💡 비상금 봉투로 이해하기
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    평소에는 비어있지만, 급하게 돈이 필요할 때 꺼내 쓸 수 있는 <span className="font-bold text-[#FF8A00]">비상금 봉투</span>예요.
                    쓴 만큼만 다시 채워 넣으면 되지만, 빌린 기간만큼 <span className="font-bold text-[#EF4444]">이자라는 수수료</span>를 내야 해요.
                  </p>
                </div>
              </div>
            </div>

            {/* 신용대출과의 관계 */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                🔗 15번에서 배운 '신용대출'의 한 종류예요
              </h3>
              <p className="text-sm text-[#5C4A3A] leading-relaxed">
                마이너스 통장은 <span className="font-bold text-blue-600">신용대출</span>의 특별한 형태예요.
                일반 신용대출은 한 번에 돈을 받지만, 마이너스 통장은 필요할 때마다 꺼내 쓸 수 있어요.
              </p>
            </div>

            {/* 작동 원리 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                ⚙️ 어떻게 작동하나요?
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">1.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    은행이 한도(예: 300만 원)를 정해줘요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">2.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    한도 내에서 자유롭게 입출금할 수 있어요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">3.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    사용한 금액에만 이자가 붙어요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">4.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    언제든 갚으면 이자가 멈춰요
                  </p>
                </div>
              </div>
            </div>

            {/* 통장 잔고 시각화 */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                📊 마이너스(-) 잔고 예시
              </h3>
              <div className="bg-white rounded-lg p-4 border-2 border-[#EF4444]">
                <div className="text-center">
                  <p className="text-xs text-[#8B7E74] mb-1">현재 잔고</p>
                  <p className="text-3xl font-bold text-[#EF4444]">
                    -500,000<span className="text-xl">원</span>
                  </p>
                  <p className="text-xs text-[#8B7E74] mt-2">
                    (50만 원을 사용 중이에요)
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8B7E74]">한도</span>
                    <span className="font-bold text-[#3E2C1C]">3,000,000원</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-[#8B7E74]">남은 한도</span>
                    <span className="font-bold text-[#059669]">2,500,000원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 2: 이자 계산법 */}
        {activeTab === 1 && (
          <div className="space-y-4">
            {/* 이자 계산 설명 */}
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                📐 이자는 어떻게 계산되나요?
              </h3>
              <p className="text-sm text-[#5C4A3A] leading-relaxed mb-3">
                마이너스 통장의 이자는 <span className="font-bold text-[#FF8A00]">쓴 금액</span>에
                <span className="font-bold text-[#FF8A00]"> 쓴 기간</span>만큼만 붙어요.
              </p>
              <div className="bg-white rounded-lg p-3 border border-[#E8DDD3]">
                <p className="text-sm font-mono text-center text-[#3E2C1C]">
                  일일 이자 = 사용금액 × (연 이자율 ÷ 365일)
                </p>
              </div>
            </div>

            {/* 이자 계산기 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🧮 이자 계산해보기
              </h3>

              {/* 사용 금액 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">사용 금액</span>
                  <span className="text-sm font-bold text-[#FF8A00]">
                    {usedAmount.toLocaleString()}원
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max={limit}
                  step="100000"
                  value={usedAmount}
                  onChange={(e) => setUsedAmount(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 한도 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">마이너스 한도</span>
                  <span className="text-sm font-bold text-[#3E2C1C]">
                    {limit.toLocaleString()}원
                  </span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="10000000"
                  step="500000"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 이자 결과 */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-[#8B7E74] mb-1">하루 이자</p>
                    <p className="text-lg font-bold text-[#FF8A00]">
                      {dailyInterest.toLocaleString()}원
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#8B7E74] mb-1">한 달 이자 (30일)</p>
                    <p className="text-lg font-bold text-[#EF4444]">
                      {monthlyInterest.toLocaleString()}원
                    </p>
                  </div>
                </div>
                <p className="text-xs text-center text-[#8B7E74] mt-3">
                  * 연 {annualRate}% 금리 기준
                </p>
              </div>
            </div>

            {/* 중요 포인트 */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                ⚠️ 중요한 점
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#5C4A3A]">
                  <span className="text-blue-600">•</span>
                  <span>이자는 <span className="font-bold">매일</span> 계산돼요</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#5C4A3A]">
                  <span className="text-blue-600">•</span>
                  <span>빨리 갚을수록 이자가 적어요</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#5C4A3A]">
                  <span className="text-blue-600">•</span>
                  <span>사용하지 않으면 이자가 0원이에요</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* 탭 3: 사용 주의점 */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {/* 장점 vs 단점 대조 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                ⚖️ 장점과 단점을 함께 알아두세요
              </h3>

              {/* 장점 */}
              <div className="bg-green-50 rounded-lg p-3 border border-green-200 mb-3">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <h4 className="text-sm font-bold text-green-800">장점</h4>
                </div>
                <div className="space-y-2 ml-6">
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#059669]">쓴 만큼만 이자를 낸다</span>
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    50만 원만 쓰면 50만 원에만 이자가 붙어요. 한도가 300만 원이어도 안 쓴 금액엔 이자가 없어요.
                  </p>
                </div>
              </div>

              {/* 단점 */}
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-red-600 text-lg">✗</span>
                  <h4 className="text-sm font-bold text-red-800">단점</h4>
                </div>
                <div className="space-y-2 ml-6">
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#EF4444]">매일 이자가 붙는다</span>
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    일반 대출처럼 한 달에 한 번이 아니라, 하루하루 이자가 쌓여요. 갚지 않으면 눈덩이처럼 불어나요.
                  </p>
                </div>
              </div>
            </div>

            {/* 사용 시 주의사항 */}
            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-300">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-sm font-bold text-[#3E2C1C]">
                  이럴 때 조심하세요!
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">
                    1. "어차피 한도 있으니까" 하고 막 쓰기
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → 결국 대출이에요. 갚을 능력이 있을 때만 사용하세요.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">
                    2. 이자만 내고 원금은 안 갚기
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → 원금을 줄여야 이자도 줄어요. 조금씩이라도 원금을 갚아야 해요.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">
                    3. 생활비로 계속 쓰기
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → 진짜 비상 상황에만 써야 해요. 매달 생활비로 쓰면 빠져나오기 어려워요.
                  </p>
                </div>
              </div>
            </div>

            {/* 현명한 사용법 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-sm font-bold text-[#3E2C1C]">
                  이렇게 사용하면 좋아요
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    급여일 전 <span className="font-bold">단기간</span>만 사용하고 바로 갚기
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    진짜 <span className="font-bold">비상 상황</span>에만 사용하기
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    돈이 들어오면 <span className="font-bold">바로 상환</span>하기
                  </p>
                </div>
              </div>
            </div>

            {/* 최종 요약 */}
            <div className="bg-[#3E2C1C] text-white rounded-xl p-4">
              <h3 className="text-sm font-bold mb-2">📌 핵심 정리</h3>
              <p className="text-xs leading-relaxed opacity-90">
                마이너스 통장은 <span className="font-bold">편리한 비상금 봉투</span>지만,
                <span className="font-bold"> 매일 이자가 붙는 대출</span>이에요.
                꼭 필요할 때만 쓰고, 빨리 갚는 게 중요해요!
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default MinusAccountSection;
