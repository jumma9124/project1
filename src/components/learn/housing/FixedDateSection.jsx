import React, { useState } from 'react';

function FixedDateSection() {
  // 체크리스트 상태
  const [checklist, setChecklist] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  // 축하 애니메이션 상태
  const [celebrateStep, setCelebrateStep] = useState(null);

  // 확정일자 날짜 (계산기)
  const [selectedDate, setSelectedDate] = useState('');

  // 체크리스트 토글 핸들러
  const toggleCheck = (step) => {
    setChecklist((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));

    // 체크할 때만 축하 애니메이션
    if (!checklist[step]) {
      setCelebrateStep(step);
      setTimeout(() => setCelebrateStep(null), 1000);
    }
  };

  // 효력 발생일 계산
  const getEffectiveDate = () => {
    if (!selectedDate) return null;
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1); // 다음 날
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const effectiveDate = getEffectiveDate();

  return (
    <div className="px-6 mt-6 pb-10">
      <div className="space-y-4">
        {/* 전입신고 vs 확정일자 비교 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
          <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 text-center">
            📊 전입신고 vs 확정일자, 뭐가 다를까?
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* 전입신고 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-300">
              <div className="text-center mb-3">
                <span className="text-2xl">📝</span>
                <p className="text-sm font-bold text-gray-700 mt-1">전입신고</p>
              </div>
              <div className="space-y-2 text-[10px] text-[#3E2C1C]">
                <div className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <p>주소지를 옮겼다는 <span className="font-bold">신고</span></p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <p>주민센터나 온라인으로 신청</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <p>대항력 발생 (나는 여기 산다!)</p>
                </div>
              </div>
            </div>

            {/* 확정일자 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 border-2 border-blue-400">
              <div className="text-center mb-3">
                <span className="text-2xl">🔒</span>
                <p className="text-sm font-bold text-blue-700 mt-1">확정일자</p>
              </div>
              <div className="space-y-2 text-[10px] text-[#3E2C1C]">
                <div className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <p>계약서에 받는 <span className="font-bold text-blue-700">날짜 도장</span></p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <p>주민센터에서만 받을 수 있어요</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <p className="font-bold text-blue-700">우선변제권 발생 (내가 먼저!)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 포인트 */}
          <div className="mt-4 bg-blue-50 rounded-xl p-3 border border-blue-200">
            <p className="text-xs text-[#3E2C1C] text-center leading-relaxed">
              💡 <span className="font-bold text-blue-700">전입신고</span>만 하면 "나 여기 살아요"만 증명돼요.
              <span className="font-bold text-blue-700"> 확정일자</span>까지 받아야 "돈 떼이면 내가 먼저 받을래요!"가 가능해요!
            </p>
          </div>
        </div>

        {/* 이사 당일 3단계 미션 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
          <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 text-center">
            ✅ 이사 당일 3단계 미션
          </h3>
          <p className="text-xs text-[#64748B] text-center mb-4">
            체크박스를 눌러 미션을 완료하세요!
          </p>

          <div className="space-y-3">
            {/* 1단계 */}
            <div className="relative">
              <div
                onClick={() => toggleCheck('step1')}
                className={`rounded-xl p-4 border-2 transition-all cursor-pointer ${
                  checklist.step1
                    ? 'bg-green-50 border-green-400'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                      checklist.step1
                        ? 'bg-green-500 border-green-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {checklist.step1 && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#3E2C1C] mb-1">
                      <span className="num-label relative top-[2px]">1</span>단계: 짐 옮기고 도어락 비번 바꾸기
                    </p>
                    <p className="text-[10px] text-[#64748B]">
                      보안은 기본! 전 세입자가 비번을 알고 있을 수 있어요.
                    </p>
                  </div>
                </div>
              </div>
              {celebrateStep === 'step1' && (
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                  🎉
                </div>
              )}
            </div>

            {/* 2단계 */}
            <div className="relative">
              <div
                onClick={() => toggleCheck('step2')}
                className={`rounded-xl p-4 border-2 transition-all cursor-pointer ${
                  checklist.step2
                    ? 'bg-green-50 border-green-400'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                      checklist.step2
                        ? 'bg-green-500 border-green-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {checklist.step2 && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#3E2C1C] mb-1">
                      <span className="num-label relative top-[2px]">2</span>단계: 주민센터 가서 전입신고 하기
                    </p>
                    <p className="text-[10px] text-[#64748B]">
                      신분증 + 계약서만 있으면 OK! 온라인도 가능해요.
                    </p>
                  </div>
                </div>
              </div>
              {celebrateStep === 'step2' && (
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                  🎉
                </div>
              )}
            </div>

            {/* 3단계 */}
            <div className="relative">
              <div
                onClick={() => toggleCheck('step3')}
                className={`rounded-xl p-4 border-2 transition-all cursor-pointer ${
                  checklist.step3
                    ? 'bg-green-50 border-green-400'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                      checklist.step3
                        ? 'bg-green-500 border-green-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {checklist.step3 && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#3E2C1C] mb-1">
                      <span className="num-label relative top-[2px]">3</span>단계: 계약서에 확정일자 도장 받기
                    </p>
                    <p className="text-[10px] text-[#64748B]">
                      가장 중요한 단계! 이걸 받아야 우선변제권이 생겨요.
                    </p>
                  </div>
                </div>
              </div>
              {celebrateStep === 'step3' && (
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                  🎉
                </div>
              )}
            </div>
          </div>

          {/* 완료 메시지 */}
          {checklist.step1 && checklist.step2 && checklist.step3 && (
            <div className="mt-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-400">
              <p className="text-sm font-bold text-green-700 text-center">
                🎊 축하합니다! 모든 미션을 완료했어요!
              </p>
              <p className="text-xs text-center text-green-600 mt-1">
                이제 내 보증금이 안전하게 보호됩니다!
              </p>
            </div>
          )}
        </div>

        {/* 나의 효력 발생일 계산기 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
          <h3 className="text-sm font-bold text-[#3E2C1C] mb-4">
            🗓️ 나의 효력 발생일 계산기
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            확정일자를 받은 날짜를 선택하면, 우선변제권 효력 발생 시점을 알려드려요!
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-blue-600 font-semibold block mb-2">
                확정일자 받은 날짜
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {effectiveDate && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-300">
                <p className="text-xs text-blue-700 mb-2 text-center">
                  우선변제권 효력 발생 시점
                </p>
                <p className="text-lg font-bold text-blue-800 text-center">
                  {effectiveDate} <span className="text-base">0시</span>
                </p>
                <p className="text-[10px] text-[#64748B] text-center mt-2">
                  💡 확정일자 다음 날부터 효력이 발생해요!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 우선변제권이란? */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border-2 border-yellow-400">
          <h3 className="text-sm font-bold text-amber-900 mb-3 text-center">
            💰 우선변제권이 뭔가요?
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-amber-200">
              <p className="text-xs text-[#3E2C1C] leading-relaxed mb-2">
                집주인이 집을 팔거나 경매로 넘어갔을 때,
                <span className="font-bold text-amber-800"> 다른 채권자보다 먼저</span> 보증금을 돌려받을 수 있는 권리예요.
              </p>
              <p className="text-xs text-[#3E2C1C] leading-relaxed">
                확정일자가 <span className="font-bold text-red-600">빠를수록</span> 우선순위가 높아요!
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <p className="text-[10px] font-bold text-amber-800 mb-2">📌 실전 예시</p>
              <div className="text-[10px] text-[#3E2C1C] space-y-1">
                <p>
                  • A씨 확정일자: <span className="num-label font-bold relative top-[2px]">2024</span>년
                  <span className="num-label font-bold relative top-[2px]"> 1</span>월
                  <span className="num-label font-bold relative top-[2px]"> 5</span>일
                </p>
                <p>
                  • B씨 확정일자: <span className="num-label font-bold relative top-[2px]">2024</span>년
                  <span className="num-label font-bold relative top-[2px]"> 3</span>월
                  <span className="num-label font-bold relative top-[2px]"> 10</span>일
                </p>
                <p className="text-amber-800 font-bold mt-2">
                  → A씨가 B씨보다 먼저 보증금을 받아요!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 인터넷 등기소 바로가기 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
          <h3 className="text-sm font-bold text-[#3E2C1C] mb-3 text-center">
            🌐 온라인으로 신청하기
          </h3>
          <p className="text-xs text-[#64748B] text-center mb-4">
            전입신고는 온라인으로도 가능해요! (확정일자는 주민센터 방문 필수)
          </p>

          <a
            href="https://www.gov.kr/portal/service/serviceInfo/PTR000050118"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-4 font-bold text-sm text-center transition-all shadow-lg active:scale-95"
          >
            🏛️ 정부24 전입신고 바로가기 →
          </a>
        </div>

        {/* 꿀팁 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-400">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <div>
              <h4 className="text-sm font-bold text-green-800 mb-2">꿀팁!</h4>
              <div className="space-y-2">
                <p className="text-xs text-[#3E2C1C] leading-relaxed">
                  <span className="font-bold text-green-700">이사 당일</span>에 모든 걸 끝내세요!
                  전입신고와 확정일자는 <span className="font-bold text-red-600">같은 날</span> 받는 게 가장 안전해요.
                </p>
                <p className="text-xs text-[#3E2C1C] leading-relaxed">
                  확정일자 도장이 <span className="font-bold text-green-700">계약서에 잘 찍혔는지</span> 꼭 확인하세요!
                  날짜가 선명하게 보여야 해요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FixedDateSection;
