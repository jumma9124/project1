import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JeonseVsRentSection() {
  const navigate = useNavigate();

  // 시뮬레이터 입력값
  const [jeonseDeposit, setJeonseDeposit] = useState(30000); // 전세금 (만원)
  const [loanRate, setLoanRate] = useState(4.5); // 대출 금리 (%)
  const [jeonseMaintenance, setJeonseMaintenance] = useState(15); // 전세 월 관리비 (만원)
  const [rentDeposit, setRentDeposit] = useState(5000); // 월세 보증금 (만원)
  const [monthlyRent, setMonthlyRent] = useState(60); // 월세 (만원)
  const [rentMaintenance, setRentMaintenance] = useState(15); // 월세 월 관리비 (만원)
  const savingsRate = 3.0; // 예금 이율 (고정)

  // 실질 주거비 계산
  const jeonseMonthly = (jeonseDeposit * loanRate) / 100 / 12 + jeonseMaintenance;
  const rentMonthly = monthlyRent + (rentDeposit * savingsRate) / 100 / 12 + rentMaintenance;
  const difference = Math.abs(jeonseMonthly - rentMonthly);
  const isCheaper = jeonseMonthly < rentMonthly ? 'jeonse' : 'rent';

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-screen-sm mx-auto">
      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-y-auto px-4 pb-10 mt-2">
        <div className="space-y-4">
          {/* 비교 시뮬레이터 */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
            <h3 className="text-sm font-bold text-[#3E2C1C] mb-4">
              💰 실질 주거비 비교 계산기
            </h3>

            {/* 전세 vs 월세 대결 UI */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* 전세 (파란색) */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-300">
                <div className="text-center mb-3">
                  <span className="text-2xl">🏠</span>
                  <p className="text-sm font-bold text-blue-700 mt-1">전세</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-blue-600 font-semibold">전세금 (만원)</label>
                    <input
                      type="number"
                      value={jeonseDeposit}
                      onChange={(e) => setJeonseDeposit(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-blue-600 font-semibold">대출 금리 (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={loanRate}
                      onChange={(e) => setLoanRate(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                      <span>🏠</span>
                      <span>월 관리비 (만원)</span>
                    </label>
                    <input
                      type="number"
                      value={jeonseMaintenance}
                      onChange={(e) => setJeonseMaintenance(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
                    />
                  </div>
                </div>
                <div className="mt-3 bg-white rounded-lg p-2 border border-blue-200">
                  <p className="text-[9px] text-blue-600 mb-1">한 달 실질 주거비</p>
                  <p className="text-base font-bold text-blue-700 relative top-[2px]">
                    <span className="num-label">{jeonseMonthly.toFixed(1)}</span><span className="text-xs">만원</span>
                  </p>
                </div>
              </div>

              {/* 월세 (주황색) */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-300">
                <div className="text-center mb-3">
                  <span className="text-2xl">🏘️</span>
                  <p className="text-sm font-bold text-orange-700 mt-1">월세</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-orange-600 font-semibold">보증금 (만원)</label>
                    <input
                      type="number"
                      value={rentDeposit}
                      onChange={(e) => setRentDeposit(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-orange-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-orange-600 font-semibold">월세 (만원)</label>
                    <input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-orange-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-orange-600 font-semibold flex items-center gap-1">
                      <span>🏠</span>
                      <span>월 관리비 (만원)</span>
                    </label>
                    <input
                      type="number"
                      value={rentMaintenance}
                      onChange={(e) => setRentMaintenance(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-orange-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 mt-1"
                    />
                  </div>
                </div>
                <div className="mt-3 bg-white rounded-lg p-2 border border-orange-200">
                  <p className="text-[9px] text-orange-600 mb-1">한 달 실질 주거비</p>
                  <p className="text-base font-bold text-orange-700 relative top-[2px]">
                    <span className="num-label">{rentMonthly.toFixed(1)}</span><span className="text-xs">만원</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 비교 결과 */}
            <div className={`rounded-xl p-4 border-2 ${
              isCheaper === 'jeonse'
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300'
                : 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300'
            }`}>
              <p className="text-sm font-bold text-center text-[#3E2C1C] mb-2">
                💡 최종 선택 가이드
              </p>
              <p className="text-base font-bold text-center text-[#3E2C1C] mb-2">
                {isCheaper === 'jeonse' ? '🏠 전세' : '🏘️ 월세'}가 한 달에 <span className="num-label">{difference.toFixed(1)}</span>만원 더 저렴해요!
              </p>
              <p className="text-[10px] text-center text-[#64748B]">
                * 예금 이율 {savingsRate}% 기준, 관리비 포함 계산
              </p>
            </div>
          </div>

          {/* 장단점 비교 */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8DDD3]">
            <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
              ⚖️ 장단점 비교
            </h3>

            <div className="space-y-3">
              {/* 전세 */}
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏠</span>
                  <h4 className="text-sm font-bold text-blue-700">전세</h4>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <span className="text-green-600 text-xs font-bold relative top-[2px]">✓</span>
                    <p className="text-xs text-[#3E2C1C]">큰 보증금을 맡기고 월세 없이 살 수 있어요</p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-green-600 text-xs font-bold relative top-[2px]">✓</span>
                    <p className="text-xs text-[#3E2C1C]">목돈이 있다면 장기적으로 유리해요</p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-red-600 text-xs font-bold relative top-[2px]">✗</span>
                    <p className="text-xs text-[#3E2C1C]">초기 자금 부담이 크고, 대출 이자가 발생할 수 있어요</p>
                  </div>
                </div>
              </div>

              {/* 월세 */}
              <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏘️</span>
                  <h4 className="text-sm font-bold text-orange-700">월세</h4>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <span className="text-green-600 text-xs font-bold relative top-[2px]">✓</span>
                    <p className="text-xs text-[#3E2C1C]">적은 보증금으로 시작할 수 있어요</p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-green-600 text-xs font-bold relative top-[2px]">✓</span>
                    <p className="text-xs text-[#3E2C1C]">이사가 자유롭고 유동성이 좋아요</p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-red-600 text-xs font-bold relative top-[2px]">✗</span>
                    <p className="text-xs text-[#3E2C1C]">매달 월세를 내야 하고, 장기적으로 비용이 더 들 수 있어요</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 꿀팁 */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 border-2 border-yellow-300">
            <div className="flex items-start gap-2">
              <span className="text-xl">💡</span>
              <div>
                <h4 className="text-sm font-bold text-amber-800 mb-2">꿀팁!</h4>
                <div className="space-y-2">
                  <p className="text-xs text-[#3E2C1C] leading-relaxed">
                    전세 대출 이자가 월세보다 싸다면 전세가 유리하지만, <span className="font-bold text-red-600">보증금 보험 가입은 필수</span>입니다!
                    집주인이 보증금을 못 돌려줄 때를 대비해야 해요.
                  </p>
                  <p className="text-xs text-[#3E2C1C] leading-relaxed">
                    <span className="font-bold text-orange-600">🏠 관리비는 제2의 월세!</span> 월세는 관리비가 제2의 월세가 될 수 있으니 계약 전에 평균 관리비를 꼭 확인하세요!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JeonseVsRentSection;
