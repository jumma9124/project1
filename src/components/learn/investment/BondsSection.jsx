import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 공통 스타일 (다른 섹션과 통일)
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function BondsSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [investment, setInvestment] = useState(10000000); // 1000만원
  const [interestRate, setInterestRate] = useState(3.5); // 3.5%
  const [years, setYears] = useState(3); // 3년
  const [showChecklist, setShowChecklist] = useState(false);
  const [showBondRateInfo, setShowBondRateInfo] = useState(false);

  const tabs = ['채권이란?', '수익의 원리', '주식 vs 채권'];

  // 이자 계산 (연 단위)
  const annualInterest = Math.round(investment * (interestRate / 100));
  const totalInterest = annualInterest * years;
  const totalReturn = investment + totalInterest;

  // 오늘의 채권 금리 데이터 (실제로는 API에서 가져와야 함)
  const bondRateData = {
    rate: 3.45, // 국고채 3년물 금리 (%)
    change: 0.05, // 전일 대비 변동 (%)
    bankDepositAvg: 2.95, // 시중 은행 예금 평균 금리 (%)
  };

  const rateDifference = bondRateData.rate - bondRateData.bankDepositAvg;
  const isHigherThanBank = rateDifference > 0;

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 탭 네비게이션 ── */}
      <div className={commonStyles.card}>
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

        {/* 탭 1: 채권이란? */}
        {activeTab === 0 && (
          <div className="space-y-4">
            {/* 오늘의 채권 금리 위젯 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#059669] flex items-center gap-2">
                  <span>📊</span>
                  <span>오늘의 채권 금리</span>
                </h3>
                <div className="text-xs text-[#059669]">
                  ✓ 실시간
                </div>
              </div>

              {/* 국고채 3년물 금리 */}
              <div
                onClick={() => setShowBondRateInfo(!showBondRateInfo)}
                className="rounded-xl p-4 border-2 cursor-pointer hover:opacity-90 transition-opacity bg-white border-green-400"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#3E2C1C]">국고채 3년물</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">💰</span>
                    <span className="text-xs font-bold text-[#059669]">
                      안정적
                    </span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#3E2C1C] mb-1">
                  {bondRateData.rate.toFixed(2)}%
                </p>
                <div className="flex items-center gap-1 mb-3">
                  <span
                    className="text-xs font-bold"
                    style={{ color: bondRateData.change >= 0 ? '#EF4444' : '#2563EB' }}
                  >
                    {bondRateData.change >= 0 ? '▲' : '▼'}
                    {Math.abs(bondRateData.change).toFixed(2)}%p
                  </span>
                  <span className="text-xs text-[#8B7E74]">
                    (전일 대비)
                  </span>
                </div>

                {/* 은행 예금 비교 */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-2.5 border border-orange-200">
                  <p className="text-xs text-center text-[#5C4A3A]">
                    🏦 시중 은행 평균보다{' '}
                    <span className="font-bold text-[#FF8A00]">
                      {isHigherThanBank ? '+' : ''}{rateDifference.toFixed(2)}%p
                    </span>
                    {' '}{isHigherThanBank ? '높아요!' : '낮아요'}
                  </p>
                </div>
              </div>

              {/* 금리 설명 (아코디언) */}
              {showBondRateInfo && (
                <div className="mt-3 bg-white rounded-xl p-4 border border-green-200 animate-fadeIn">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">💡</span>
                    <h4 className="text-sm font-bold text-[#059669]">국고채 금리란?</h4>
                  </div>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed ml-6">
                    국가가 발행한 채권의 이자율이에요.
                    <span className="font-bold text-[#059669]"> 정부가 보증</span>하기 때문에 가장 안전한 투자로 여겨져요.
                    은행 예금보다 금리가 높으면서도 안정적이라 인기가 많답니다!
                  </p>
                </div>
              )}

              {/* 안내 문구 */}
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-xs text-center text-[#8B7E74]">
                  💡 <span className="font-bold text-[#059669]">카드를 클릭</span>하면 자세한 설명을 볼 수 있어요!
                </p>
              </div>
            </div>

            {/* 차용증 비유 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📋</span>
                <div>
                  <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                    💡 차용증으로 이해하기
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    채권은 <span className="font-bold text-blue-600">정기 예금 같은 차용증</span>이에요.
                    국가나 큰 회사가 "돈 빌려줘! 나중에 이자랑 같이 갚을게!"라고 약속하는 증서예요.
                    약속된 <span className="font-bold text-blue-600">확실한 이자</span>를 받을 수 있어서 안정적이에요.
                  </p>
                </div>
              </div>
            </div>

            {/* 채권의 구조 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]" id="category4-bond-section">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                📜 채권 = 차용증 (약속의 증서)
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">1.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#2563EB]">누가 발행하나요?</span> 국가(국채), 지방자치단체(지방채), 기업(회사채)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">2.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#059669]">이자는 언제 받나요?</span> 매년 또는 만기에 한 번에 받아요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">3.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#FF8A00]">원금은 언제 돌려받나요?</span> 만기일에 정확히 받아요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">4.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#8B7E74]">중간에 팔 수 있나요?</span> 채권 시장에서 팔 수 있어요
                  </p>
                </div>
              </div>
            </div>

            {/* 국채 증서 시각화 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-300">
              <div className="text-center mb-3">
                <span className="text-4xl">🏛️</span>
                <h3 className="text-sm font-bold text-[#059669] mt-2">
                  대한민국 국채 (예시)
                </h3>
              </div>
              <div className="bg-white rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8B7E74]">발행자:</span>
                  <span className="font-bold text-[#3E2C1C]">대한민국 정부</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#8B7E74]">액면가:</span>
                  <span className="font-bold text-[#3E2C1C]">10,000,000원</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#8B7E74]">연 이자율:</span>
                  <span className="font-bold text-[#059669]">3.5%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#8B7E74]">만기일:</span>
                  <span className="font-bold text-[#3E2C1C]">2027년 12월 31일</span>
                </div>
                <div className="border-t border-[#E8DDD3] pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8B7E74]">매년 받는 이자:</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">💵</span>
                      <span className="font-bold text-[#059669]">350,000원</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-[#8B7E74] mt-3">
                * 만기 때 원금 1000만 원을 정확히 돌려받아요
              </p>
            </div>

            {/* 채권의 종류 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                📂 채권의 종류
              </h3>
              <div className="space-y-2.5">
                <div className="bg-[#F0FDF4] rounded-lg p-3 border border-green-200">
                  <p className="text-sm font-bold text-[#059669] mb-1">국채 (가장 안전)</p>
                  <p className="text-xs text-[#8B7E74]">
                    국가가 발행. 나라가 망하지 않는 한 100% 안전해요.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-sm font-bold text-[#2563EB] mb-1">지방채</p>
                  <p className="text-xs text-[#8B7E74]">
                    서울시, 경기도 같은 지방정부가 발행. 안전도 높아요.
                  </p>
                </div>
                <div className="bg-[#FFF9F0] rounded-lg p-3 border border-orange-200">
                  <p className="text-sm font-bold text-[#FF8A00] mb-1">회사채</p>
                  <p className="text-xs text-[#8B7E74]">
                    기업이 발행. 회사 신용도에 따라 이자율이 달라요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 2: 수익의 원리 */}
        {activeTab === 1 && (
          <div className="space-y-4">
            {/* 채권 수익 구조 */}
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                💰 채권으로 돈 버는 방법
              </h3>
              <div className="space-y-3">
                {/* 방법 1: 이자 수익 */}
                <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">💵</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#059669] mb-1">
                        1. 이자 수익 (정기적인 현금 흐름)
                      </p>
                      <p className="text-xs text-[#8B7E74] leading-relaxed">
                        약속된 이자를 정기적으로 받아요. 예금 이자처럼 확실해요!
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#F0FDF4] rounded-lg p-3 mt-2">
                    <p className="text-xs text-[#5C4A3A] mb-2">타임라인:</p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">📅 1년차</span>
                        <span className="text-[#8B7E74]">→</span>
                        <span className="font-bold text-[#059669]">+350,000원 (이자)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">📅 2년차</span>
                        <span className="text-[#8B7E74]">→</span>
                        <span className="font-bold text-[#059669]">+350,000원 (이자)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">📅 3년차</span>
                        <span className="text-[#8B7E74]">→</span>
                        <span className="font-bold text-[#059669]">+350,000원 (이자) + 원금</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 방법 2: 매매 차익 */}
                <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">📊</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#2563EB] mb-1">
                        2. 매매 차익 (채권 가격 변동)
                      </p>
                      <p className="text-xs text-[#8B7E74] leading-relaxed">
                        만기 전에 시장에서 채권을 팔아 차익을 얻을 수도 있어요.
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 mt-2">
                    <p className="text-xs text-[#5C4A3A] mb-2">예시:</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8B7E74]">• 100만 원에 채권 매수</span>
                        <span className="font-bold text-[#EF4444]">-1,000,000원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B7E74]">• 105만 원에 채권 매도</span>
                        <span className="font-bold text-[#059669]">+1,050,000원</span>
                      </div>
                      <div className="border-t border-blue-200 pt-1.5 mt-1.5 flex justify-between">
                        <span className="font-bold text-[#3E2C1C]">매매 차익</span>
                        <span className="font-bold text-[#059669]">+50,000원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 이자 계산기 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🧮 채권 수익 시뮬레이션
              </h3>

              {/* 투자 금액 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">투자 금액</span>
                  <span className="text-sm font-bold text-[#FF8A00]">
                    {investment.toLocaleString()}원
                  </span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="100000000"
                  step="1000000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 이자율 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">연 이자율</span>
                  <span className="text-sm font-bold text-[#059669]">
                    {interestRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 투자 기간 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">투자 기간</span>
                  <span className="text-sm font-bold text-[#3E2C1C]">
                    {years}년
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 결과 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-green-200">
                    <span className="text-xs text-[#8B7E74]">원금</span>
                    <span className="text-sm font-bold text-[#3E2C1C]">
                      {investment.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#8B7E74]">매년 받는 이자</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">💵</span>
                      <span className="text-sm font-bold text-[#059669]">
                        {annualInterest.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#8B7E74]">{years}년 총 이자 수익</span>
                    <span className="text-lg font-bold text-[#059669]">
                      +{totalInterest.toLocaleString()}원
                    </span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-2.5 mt-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[#3E2C1C]">만기 시 총 수령액</span>
                      <span className="text-xl font-bold text-[#059669]">
                        {totalReturn.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-[#8B7E74] mt-3">
                  * 원금 + 이자를 정확히 받을 수 있어요
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 탭 3: 주식 vs 채권 */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {/* 저울 UI - 주식 vs 채권 비교 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 text-center">
                ⚖️ 주식 vs 채권 비교 저울
              </h3>

              {/* 저울 시각화 */}
              <div className="relative py-4">
                {/* 중심 받침대 */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-3 h-12 bg-gradient-to-b from-[#6B5D4F] to-[#8B7E74] rounded-t-full"></div>
                  <div className="w-8 h-2 bg-[#8B7E74] rounded-full"></div>
                </div>

                {/* 저울대 */}
                <div className="relative mb-6 flex justify-center">
                  <div className="w-full max-w-xs h-1.5 bg-gradient-to-r from-red-400 via-[#8B7E74] to-blue-400 rounded-full relative">
                    {/* 중심 연결점 */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#6B5D4F] rounded-full border-2 border-white"></div>
                  </div>
                </div>

                {/* 양쪽 비교 */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 왼쪽: 주식 (높은 수익, 높은 위험) */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-3.5 border-2 border-red-300">
                    <div className="text-center mb-2">
                      <span className="text-2xl">📈</span>
                      <h4 className="text-sm font-bold text-[#EF4444] mt-1">주식</h4>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-[#8B7E74] mb-0.5 text-[10px]">수익률</p>
                        <p className="font-bold text-[#EF4444]">높음 ⬆️</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-[#8B7E74] mb-0.5 text-[10px]">위험도</p>
                        <p className="font-bold text-[#EF4444]">높음 ⚠️</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-[#8B7E74] mb-0.5 text-[10px]">변동성</p>
                        <p className="font-bold text-[#EF4444]">크다 📊</p>
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽: 채권 (낮은 수익, 낮은 위험) */}
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-3.5 border-2 border-blue-300">
                    <div className="text-center mb-2">
                      <span className="text-2xl">📜</span>
                      <h4 className="text-sm font-bold text-[#2563EB] mt-1">채권</h4>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-[#8B7E74] mb-0.5 text-[10px]">수익률</p>
                        <p className="font-bold text-[#2563EB]">낮음 →</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-[#8B7E74] mb-0.5 text-[10px]">위험도</p>
                        <p className="font-bold text-[#059669]">낮음 ✓</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-[#8B7E74] mb-0.5 text-[10px]">변동성</p>
                        <p className="font-bold text-[#059669]">작다 📉</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-center text-[#8B7E74] mt-4">
                💡 채권은 변동성이 낮아서 안정적이지만, 수익도 낮아요!
              </p>
            </div>

            {/* 상세 비교표 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                📊 항목별 상세 비교
              </h3>
              <div className="space-y-3">
                {/* 수익 구조 */}
                <div className="bg-[#FFF9F0] rounded-lg p-3">
                  <p className="text-xs font-bold text-[#3E2C1C] mb-2">💰 수익 구조</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[#EF4444] font-bold">주식:</p>
                      <p className="text-[#8B7E74]">주가 상승 + 배당금</p>
                    </div>
                    <div>
                      <p className="text-[#2563EB] font-bold">채권:</p>
                      <p className="text-[#8B7E74]">확정 이자</p>
                    </div>
                  </div>
                </div>

                {/* 원금 보장 */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-[#3E2C1C] mb-2">🛡️ 원금 보장</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[#EF4444] font-bold">주식:</p>
                      <p className="text-[#8B7E74]">보장 없음 ❌</p>
                    </div>
                    <div>
                      <p className="text-[#059669] font-bold">채권:</p>
                      <p className="text-[#8B7E74]">만기 시 보장 ✓</p>
                    </div>
                  </div>
                </div>

                {/* 수익률 범위 */}
                <div className="bg-[#FFF9F0] rounded-lg p-3">
                  <p className="text-xs font-bold text-[#3E2C1C] mb-2">📈 예상 수익률</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[#EF4444] font-bold">주식:</p>
                      <p className="text-[#8B7E74]">-50% ~ +100%</p>
                    </div>
                    <div>
                      <p className="text-[#2563EB] font-bold">채권:</p>
                      <p className="text-[#8B7E74]">2% ~ 5%</p>
                    </div>
                  </div>
                </div>

                {/* 적합한 투자자 */}
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-[#3E2C1C] mb-2">👤 누구에게 적합할까?</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[#EF4444] font-bold">주식:</p>
                      <p className="text-[#8B7E74]">위험 감수 가능, 장기 투자자</p>
                    </div>
                    <div>
                      <p className="text-[#059669] font-bold">채권:</p>
                      <p className="text-[#8B7E74]">안정성 중시, 예측 가능한 수익 원하는 분</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 전문가 조언 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-sm font-bold text-[#3E2C1C]">
                  초보자를 위한 조합 팁
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold">주식 70% + 채권 30%</span> (공격적, 젊은 층)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold">주식 50% + 채권 50%</span> (균형형, 중년층)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold">주식 30% + 채권 70%</span> (보수적, 은퇴 준비)
                  </p>
                </div>
              </div>
            </div>

            {/* 최종 조언 */}
            <div className="bg-[#3E2C1C] text-white rounded-xl p-4">
              <h3 className="text-sm font-bold mb-2">📌 핵심 정리</h3>
              <p className="text-xs leading-relaxed opacity-90">
                채권은 <span className="font-bold">정기 예금처럼 안정적인 투자</span>예요.
                주식보다 수익은 낮지만 <span className="font-bold">원금 손실 위험이 적고</span>,
                <span className="font-bold"> 예측 가능한 수익</span>을 원할 때 좋아요!
              </p>
            </div>

            {/* 어디서 살 수 있나요? */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🏪 어디서 살 수 있나요?
              </h3>

              {/* 3가지 옵션 카드 */}
              <div className="space-y-3 mb-4">
                {/* 증권사 앱 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📱</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#2563EB] mb-1">증권사 앱</h4>
                      <p className="text-xs text-[#5C4A3A] leading-relaxed">
                        소액으로 쇼핑하듯 구매!
                      </p>
                      <p className="text-[10px] text-[#8B7E74] mt-1">
                        예: 삼성증권, 키움증권, 미래에셋 등
                      </p>
                    </div>
                  </div>
                </div>

                {/* 은행 앱 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏦</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#059669] mb-1">은행 앱</h4>
                      <p className="text-xs text-[#5C4A3A] leading-relaxed">
                        익숙한 계좌로 안전하게!
                      </p>
                      <p className="text-[10px] text-[#8B7E74] mt-1">
                        예: 카카오뱅크, 토스뱅크, KB국민은행 등
                      </p>
                    </div>
                  </div>
                </div>

                {/* 채권 ETF */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#FF8A00] mb-1">채권 ETF</h4>
                      <p className="text-xs text-[#5C4A3A] leading-relaxed">
                        주식처럼 사고팔기 편하게!
                      </p>
                      <p className="text-[10px] text-[#8B7E74] mt-1">
                        예: KODEX 국고채3년, TIGER 미국채 등
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 체크리스트 아코디언 */}
              <div className="border-t border-[#E8DDD3] pt-3">
                <button
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="w-full flex items-center justify-between py-2 px-3 bg-[#FFF9F0] hover:bg-[#FFEDD5] rounded-lg transition-colors"
                >
                  <span className="text-xs font-bold text-[#FF8A00]">
                    ✓ 채권 살 때 꼭 확인해요!
                  </span>
                  <span className="text-[#FF8A00]">
                    {showChecklist ? '▲' : '▼'}
                  </span>
                </button>

                {showChecklist && (
                  <div className="mt-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-orange-200 animate-fadeIn">
                    <div className="space-y-3">
                      {/* 만기일 */}
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#FF8A00] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#3E2C1C] mb-1">만기일</p>
                          <p className="text-xs text-[#5C4A3A] leading-relaxed">
                            언제 원금을 돌려받는지 확인하세요. 급하게 쓸 돈은 단기 채권으로!
                          </p>
                        </div>
                      </div>

                      {/* 이자율 */}
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#FF8A00] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#3E2C1C] mb-1">이자율 (수익률)</p>
                          <p className="text-xs text-[#5C4A3A] leading-relaxed">
                            같은 채권이라도 이자율이 다를 수 있어요. 비교해서 선택하세요!
                          </p>
                        </div>
                      </div>

                      {/* 신용등급 */}
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#FF8A00] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#3E2C1C] mb-1">신용등급</p>
                          <p className="text-xs text-[#5C4A3A] leading-relaxed">
                            AAA, AA, A 등급 확인! 등급이 낮으면 이자는 높지만 위험해요.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <p className="text-xs text-center text-[#8B7E74]">
                        💡 초보자는 <span className="font-bold text-[#FF8A00]">국채(AAA 등급)</span>부터 시작하는 게 안전해요!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 다음 페이지 이동 버튼 */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-300">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-xl">💡</span>
                <div className="flex-1">
                  <p className="text-sm text-[#3E2C1C] leading-relaxed mb-3">
                    <span className="font-bold text-[#FF8A00]">주식도 채권도 어렵다면?</span><br/>
                    <span className="text-xs text-[#8B7E74]">주식과 채권을 한 번에 투자할 수 있는 <span className="font-bold text-[#FF8A00]">ETF</span>를 확인해 보세요!</span>
                  </p>
                  <button
                    onClick={() => navigate('/learn/20')}
                    className="w-full bg-[#FF8A00] hover:bg-[#E67A00] text-white rounded-lg py-2.5 px-4 text-sm font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>20번 ETF 알아보기</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default BondsSection;
