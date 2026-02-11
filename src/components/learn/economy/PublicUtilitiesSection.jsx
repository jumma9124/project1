import React, { useState } from 'react';

function PublicUtilitiesSection() {
  const [selectedVote, setSelectedVote] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // D-Day 계산 함수
  const calculateDDay = (dueDay) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    let dueDate;
    if (dueDay === '말일') {
      dueDate = new Date(currentYear, currentMonth + 1, 0); // 이번 달 마지막 날
    } else {
      const day = parseInt(dueDay);
      dueDate = new Date(currentYear, currentMonth, day);
      if (dueDate < today) {
        dueDate = new Date(currentYear, currentMonth + 1, day);
      }
    }

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 가상 고지서 데이터 (1인가구 평균 포함)
  const bills = [
    {
      type: '전기세',
      icon: '⚡',
      amount: 45200,
      lastMonth: 42800,
      dueDay: '20',
      avg: '3~5만원',
      avgMin: 30000,
      avgMax: 50000,
      avgTip: '여름/겨울 냉난방비 주의!',
      color: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-300',
      iconBg: 'bg-yellow-100',
      textColor: 'text-yellow-700',
    },
    {
      type: '가스비',
      icon: '🔥',
      amount: 32500,
      lastMonth: 58900,
      dueDay: '25',
      avg: '1~6만원',
      avgMin: 10000,
      avgMax: 60000,
      avgTip: '겨울철 난방비 폭탄 주의!',
      color: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-300',
      iconBg: 'bg-orange-100',
      textColor: 'text-orange-700',
    },
    {
      type: '수도요금',
      icon: '💧',
      amount: 18300,
      lastMonth: 17800,
      dueDay: '말일',
      avg: '1~2만원',
      avgMin: 10000,
      avgMax: 20000,
      avgTip: '비교적 안정적이에요',
      color: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-300',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-700',
    },
  ];

  // 평균 대비 비교 함수
  const getCompareStatus = (amount, avgMin, avgMax) => {
    const avgMid = (avgMin + avgMax) / 2;
    if (amount < avgMin) {
      return { text: '평균보다 저렴해요!', color: 'text-green-600', icon: '😊' };
    } else if (amount > avgMax) {
      return { text: '평균보다 많이 나왔어요', color: 'text-red-500', icon: '😅' };
    } else if (amount <= avgMid) {
      return { text: '평균 범위 내 (절약 중!)', color: 'text-green-600', icon: '👍' };
    } else {
      return { text: '평균 범위 내 (조금 높아요)', color: 'text-orange-500', icon: '🤔' };
    }
  };

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const lastMonthTotal = bills.reduce((sum, bill) => sum + bill.lastMonth, 0);
  const difference = totalAmount - lastMonthTotal;

  // 가장 가까운 납부일 찾기
  const nextDueInfo = bills.reduce((closest, bill) => {
    const dDay = calculateDDay(bill.dueDay);
    if (!closest || dDay < closest.dDay) {
      return { type: bill.type, dDay, icon: bill.icon };
    }
    return closest;
  }, null);

  const handleVote = (option) => {
    setSelectedVote(option);
    setShowResult(true);
  };

  return (
    <div className="px-6 mt-2 pb-10 space-y-4">
      {/* 핵심 메시지 */}
      <p className="text-sm font-medium text-center text-[#DC2626] italic">
        *매달 날아오는 우리 집 생활 성적표예요!*
      </p>

      {/* 공공요금 설명 카드 */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
        <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 flex items-center gap-2">
          <span className="text-lg">📋</span> 공공요금이란?
        </h3>

        <div className="bg-[#FFF8F0] rounded-xl p-4">
          <p className="text-xs text-[#5C4A3A] leading-relaxed">
            전기, 수도, 가스처럼 <span className="font-bold text-[#3E2C1C]">국가나 지방자치단체</span>가
            제공하는 서비스의 요금이에요.<br /><br />
            매달 사용한 만큼 요금이 나오고, <span className="font-bold text-[#059669]">자동이체</span>를
            설정하면 연체 걱정 없이 편하게 낼 수 있어요!
          </p>
        </div>
      </div>

      {/* 이번 달 총 요금 요약 + D-Day */}
      <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] rounded-2xl p-5 border-2 border-[#FFEDD5]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[#8B7E74] mb-1">이번 달 예상 공공요금</p>
            <p className="text-3xl font-bold text-[#3E2C1C]">
              {totalAmount.toLocaleString('ko-KR')}
              <span className="text-base font-medium">원</span>
            </p>
            <p className={`text-xs mt-1 ${difference > 0 ? 'text-red-500' : 'text-green-600'}`}>
              지난달 대비 {difference > 0 ? '▲' : '▼'} {Math.abs(difference).toLocaleString('ko-KR')}원
            </p>
          </div>

          {/* D-Day 배지 */}
          {nextDueInfo && (
            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#FFEDD5] text-center min-w-[80px]">
              <p className="text-[9px] text-[#8B7E74]">다음 납부</p>
              <p className="text-lg font-bold text-[#DC2626]">D-{nextDueInfo.dDay}</p>
              <p className="text-[10px] text-[#5C4A3A]">{nextDueInfo.icon} {nextDueInfo.type}</p>
            </div>
          )}
        </div>
      </div>

      {/* 가상 고지서 UI - 탭 형태 */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
        <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 flex items-center gap-2">
          <span className="text-lg">🧾</span> 이번 달 고지서
        </h3>

        {/* 탭 버튼 */}
        <div className="flex gap-2 mb-4">
          {bills.map((bill, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === index
                  ? `bg-gradient-to-r ${bill.color} ${bill.borderColor} border-2 ${bill.textColor}`
                  : 'bg-[#F5F5F5] text-[#8B7E74] border-2 border-transparent hover:bg-[#EFEFEF]'
              }`}
            >
              <span className="mr-1">{bill.icon}</span>
              {bill.type}
            </button>
          ))}
        </div>

        {/* 선택된 고지서 카드 */}
        {(() => {
          const bill = bills[activeTab];
          const diff = bill.amount - bill.lastMonth;
          const dDay = calculateDDay(bill.dueDay);
          const compareStatus = getCompareStatus(bill.amount, bill.avgMin, bill.avgMax);

          return (
            <div
              className={`bg-gradient-to-r ${bill.color} rounded-2xl p-5 border-2 ${bill.borderColor} relative overflow-hidden`}
            >
              {/* 고지서 패턴 장식 */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <div className="w-full h-full border-l-2 border-b-2 border-dashed border-gray-400 transform rotate-45 translate-x-10 -translate-y-10"></div>
              </div>

              <div className="relative z-10">
                {/* 상단: 아이콘 + 타입 + D-Day */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${bill.iconBg} rounded-xl flex items-center justify-center`}>
                      <span className="text-2xl">{bill.icon}</span>
                    </div>
                    <div>
                      <p className={`text-base font-bold ${bill.textColor}`}>{bill.type}</p>
                      <p className="text-[10px] text-[#8B7E74]">
                        납부기한: 매월 {bill.dueDay === '말일' ? '말일' : `${bill.dueDay}일`}
                      </p>
                    </div>
                  </div>

                  {/* D-Day 배지 */}
                  <div className={`px-3 py-1 rounded-full ${dDay <= 3 ? 'bg-red-100' : dDay <= 7 ? 'bg-orange-100' : 'bg-green-100'}`}>
                    <span className={`text-xs font-bold ${dDay <= 3 ? 'text-red-600' : dDay <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
                      D-{dDay}
                    </span>
                  </div>
                </div>

                {/* 금액 + 1인가구 평균 */}
                <div className="bg-white/60 rounded-xl p-4 mb-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-[#8B7E74] mb-1">이번 달 요금</p>
                      <p className="text-2xl font-bold text-[#3E2C1C]">
                        {bill.amount.toLocaleString('ko-KR')}
                        <span className="text-xs font-medium">원</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-[#8B7E74]">1인가구 월평균</p>
                      <p className="text-sm font-bold text-[#2563EB]">{bill.avg}</p>
                    </div>
                  </div>

                  {/* 평균 대비 비교 문구 */}
                  <div className={`mt-3 text-center py-2 rounded-lg bg-white/80`}>
                    <span className={`text-xs font-bold ${compareStatus.color}`}>
                      {compareStatus.icon} {compareStatus.text}
                    </span>
                  </div>
                </div>

                {/* 지난달 비교 */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8B7E74]">지난달: {bill.lastMonth.toLocaleString('ko-KR')}원</span>
                  <span className={diff > 0 ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>
                    {diff > 0 ? '▲' : '▼'} {Math.abs(diff).toLocaleString('ko-KR')}원
                  </span>
                </div>
              </div>

              {/* 바코드 장식 */}
              <div className="mt-4 flex items-center gap-[2px] justify-center opacity-20">
                {[...Array(35)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-600"
                    style={{
                      width: Math.random() > 0.5 ? '2px' : '1px',
                      height: '24px',
                    }}
                  ></div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* 총 월평균 팁 */}
        <div className="mt-4 bg-[#FEF3C7] rounded-xl p-3">
          <p className="text-[10px] text-[#92400E] text-center">
            💡 <span className="font-bold">팁!</span> 1인가구 공공요금 월평균 <span className="font-bold">8~12만원</span> 정도 예상하면 생활비 계획 세우기 좋아요!
          </p>
        </div>
      </div>

      {/* 자동이체 vs 직접납부 */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
        <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 flex items-center gap-2">
          <span className="text-lg">💳</span> 어떻게 내면 좋을까?
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-b from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="text-center mb-2">
              <span className="text-2xl">🔄</span>
            </div>
            <p className="text-xs font-bold text-green-700 text-center mb-2">자동이체</p>
            <ul className="text-[10px] text-[#5C4A3A] space-y-1">
              <li>✓ 연체 걱정 NO</li>
              <li>✓ 할인 혜택 있음</li>
              <li>✓ 신경 쓸 일 없음</li>
            </ul>
          </div>

          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="text-center mb-2">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-xs font-bold text-blue-700 text-center mb-2">직접 납부</p>
            <ul className="text-[10px] text-[#5C4A3A] space-y-1">
              <li>✓ 사용량 체크 가능</li>
              <li>✓ 이상 요금 발견</li>
              <li>✓ 절약 의식 UP</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 투표 섹션 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200">
        <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 text-center">
          나는 공공요금을 어떻게 낼까요?
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleVote('auto')}
            disabled={showResult}
            className={`rounded-xl p-4 transition-all duration-300 ${
              selectedVote === 'auto'
                ? 'bg-green-100 border-2 border-green-400 scale-105'
                : 'bg-white border-2 border-[#E8DDD3] hover:border-green-300 hover:bg-green-50'
            } ${showResult && selectedVote !== 'auto' ? 'opacity-50' : ''}`}
          >
            <div className="text-3xl mb-2">✅</div>
            <p className="text-xs font-bold text-[#3E2C1C] leading-tight">
              자동이체<br />신청했어요
            </p>
          </button>

          <button
            onClick={() => handleVote('manual')}
            disabled={showResult}
            className={`rounded-xl p-4 transition-all duration-300 ${
              selectedVote === 'manual'
                ? 'bg-blue-100 border-2 border-blue-400 scale-105'
                : 'bg-white border-2 border-[#E8DDD3] hover:border-blue-300 hover:bg-blue-50'
            } ${showResult && selectedVote !== 'manual' ? 'opacity-50' : ''}`}
          >
            <div className="text-3xl mb-2">📄</div>
            <p className="text-xs font-bold text-[#3E2C1C] leading-tight">
              직접 꼼꼼히<br />낼래요
            </p>
          </button>
        </div>

        {showResult && (
          <div className="mt-4 bg-white rounded-xl p-4 text-center">
            {selectedVote === 'auto' ? (
              <p className="text-xs text-[#5C4A3A]">
                편리한 선택이에요! 💚<br />
                연체 걱정 없이 자동으로 납부되니<br />
                <span className="font-bold text-[#059669]">다른 곳에 신경 쓸 수 있어요!</span>
              </p>
            ) : (
              <p className="text-xs text-[#5C4A3A]">
                꼼꼼한 성격이시네요! 💙<br />
                매달 사용량을 확인하면<br />
                <span className="font-bold text-[#2563EB]">절약 습관도 기를 수 있어요!</span>
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default PublicUtilitiesSection;
