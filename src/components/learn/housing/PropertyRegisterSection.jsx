import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PropertyRegisterSection() {
  const navigate = useNavigate();

  // 탭 상태
  const [activeTab, setActiveTab] = useState('표제부');
  const [hoveredSection, setHoveredSection] = useState(null);

  // 레드 플래그 슬라이더 인덱스
  const [redFlagIndex, setRedFlagIndex] = useState(0);

  // 보증금 안전 계산기 입력값
  const [marketPrice, setMarketPrice] = useState(50000); // 매매 시세 (만원)
  const [mortgageAmount, setMortgageAmount] = useState(30000); // 근저당권 금액 (만원)
  const [myDeposit, setMyDeposit] = useState(25000); // 내 보증금 (만원)

  // 근저당권 툴팁 상태
  const [showMortgageTip, setShowMortgageTip] = useState(null);

  // 보증금 안전 비율 계산
  const calculateSafetyRatio = () => {
    if (marketPrice === 0) return 0;
    return ((mortgageAmount + myDeposit) / marketPrice) * 100;
  };

  const safetyRatio = calculateSafetyRatio();

  const getSafetyLevel = () => {
    if (safetyRatio <= 70) {
      return {
        level: '안전',
        color: '#10B981',
        message: '비교적 안심할 수 있는 집이에요.',
        icon: '✅',
      };
    }
    if (safetyRatio <= 80) {
      return {
        level: '주의',
        color: '#F59E0B',
        message: '보증보험 가입을 강력히 추천해요.',
        icon: '⚠️',
      };
    }
    return {
      level: '위험',
      color: '#EF4444',
      message: '깡통전세 위험이 커요. 다른 집을 알아보는 게 어떨까요?',
      icon: '🚨',
    };
  };

  const safetyInfo = getSafetyLevel();

  // 레드 플래그 사전
  const redFlags = [
    { keyword: '압류', description: '국가가 재산을 강제로 빼앗을 수 있어요. 절대 계약 금지!' },
    { keyword: '신탁', description: '집 주인이 바뀔 수 있어요. 신탁해지 확인 필수!' },
    { keyword: '가압류', description: '소송 중! 나중에 압류로 바뀔 수 있어요.' },
    { keyword: '가등기', description: '다른 사람이 집을 가져갈 권리가 있어요. 위험!' },
    { keyword: '경매', description: '이미 경매 진행 중. 절대 계약하지 마세요!' },
  ];

  // 섹션별 체크포인트
  const sectionCheckpoints = {
    표제부: [
      '주소와 면적이 계약서와 일치하는지 확인',
      '건물 구조(철근콘크리트 등)가 맞는지 체크',
      '전유면적과 공용면적을 합친 총면적 확인',
    ],
    갑구: [
      '소유권 이전 내역에서 현 집주인이 맞는지 확인',
      '압류, 가압류, 가등기가 있는지 반드시 체크',
      '최근 소유권 변동 이력 확인 (자주 바뀌면 주의)',
    ],
    을구: [
      '근저당권 설정액(채권최고액)이 얼마인지 확인',
      '근저당권자가 은행인지, 개인인지 체크',
      '근저당권 설정일과 말소일 확인 (말소 안됐으면 위험)',
    ],
  };

  // 레드 플래그 슬라이더 핸들러
  const handlePrevRedFlag = () => {
    setRedFlagIndex((prev) => (prev === 0 ? redFlags.length - 1 : prev - 1));
  };

  const handleNextRedFlag = () => {
    setRedFlagIndex((prev) => (prev === redFlags.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="px-6 mt-6 pb-10">
      <div className="space-y-4">
        {/* 타이틀 */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-5 border-2 border-indigo-200">
          <h2 className="text-lg font-bold text-indigo-800 text-center mb-2">
            📋 실전 계약 가이드: 등기부등본 완전 분석
          </h2>
          <p className="text-xs text-center text-[#64748B]">
            각 영역에 마우스를 올려 체크포인트를 확인하세요!
          </p>
        </div>

        {/* 인터랙티브 서류 뷰어 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
          <h3 className="text-sm font-bold text-[#3E2C1C] mb-4">
            📄 등기부등본 실전 분석
          </h3>

          <div className="space-y-2">
            {['표제부', '갑구', '을구'].map((section) => (
              <div
                key={section}
                className="relative"
                onMouseEnter={() => setHoveredSection(section)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    hoveredSection === section
                      ? 'bg-indigo-50 border-indigo-400 shadow-lg'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-indigo-800">{section}</span>
                    <span className="text-xs text-gray-500">
                      {hoveredSection === section ? '체크포인트 보기 ▼' : '마우스 올려보기 ▶'}
                    </span>
                  </div>

                  {/* 을구 근저당권 예시 */}
                  {section === '을구' && (
                    <div className="mt-3 bg-white rounded-lg p-3 border border-orange-200">
                      <p className="text-[10px] text-orange-600 font-bold mb-1">예시: 근저당권 설정</p>
                      <div className="space-y-1 text-[10px] text-gray-700">
                        <p>• 채권최고액: <span className="num-label font-bold text-red-600">36,000</span>만원</p>
                        <p>• 근저당권자: ○○은행</p>
                        <p className="text-[9px] text-gray-500 mt-2">
                          * 채권최고액은 실제 대출금의 약 1.2배로 설정됩니다
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 체크포인트 툴팁 */}
                {hoveredSection === section && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-indigo-800 rounded-xl p-4 z-10 shadow-2xl">
                    <p className="text-xs text-white font-bold mb-2">✓ 반드시 확인할 3가지</p>
                    <div className="space-y-2">
                      {sectionCheckpoints[section].map((checkpoint, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-400 font-bold shrink-0">{idx + 1}.</span>
                          <p className="text-[11px] text-white leading-relaxed">{checkpoint}</p>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-0 left-8 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-indigo-800 -translate-y-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 레드 플래그 사전 (카드 슬라이더) */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
          <h3 className="text-sm font-bold text-[#3E2C1C] mb-4">
            🚫 절대 계약 금지! 레드 플래그 사전
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            등기부등본에서 이 단어가 보이면 즉시 계약을 중단하세요!
          </p>

          <div className="relative">
            {/* 슬라이더 카드 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5 border-2 border-red-300 min-h-[140px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🚨</span>
                <h4 className="text-lg font-bold text-red-700">{redFlags[redFlagIndex].keyword}</h4>
              </div>
              <p className="text-sm text-red-800 leading-relaxed">
                {redFlags[redFlagIndex].description}
              </p>
            </div>

            {/* 슬라이더 컨트롤 */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrevRedFlag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-700 transition-all"
              >
                ← 이전
              </button>
              <div className="flex gap-2">
                {redFlags.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === redFlagIndex ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextRedFlag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-700 transition-all"
              >
                다음 →
              </button>
            </div>
          </div>
        </div>

        {/* 보증금 안전 계산기 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
          <h3 className="text-sm font-bold text-[#3E2C1C] mb-4">
            🧮 보증금 안전 계산기
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            깡통전세를 피하기 위한 필수 계산! 안전 비율을 확인하세요.
          </p>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-[10px] text-indigo-600 font-semibold">
                매매 시세 (만원)
              </label>
              <input
                type="number"
                value={marketPrice}
                onChange={(e) => setMarketPrice(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1"
              />
            </div>

            <div>
              <label className="text-[10px] text-orange-600 font-semibold">
                근저당권 금액 (을구의 채권최고액, 만원)
              </label>
              <input
                type="number"
                value={mortgageAmount}
                onChange={(e) => setMortgageAmount(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 mt-1"
              />
            </div>

            <div>
              <label className="text-[10px] text-blue-600 font-semibold">
                내 보증금 (만원)
              </label>
              <input
                type="number"
                value={myDeposit}
                onChange={(e) => setMyDeposit(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
              />
            </div>
          </div>

          {/* 계산 결과 */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-600">안전 비율</p>
              <p className="text-base font-bold" style={{ color: safetyInfo.color }}>
                <span className="num-label">{safetyRatio.toFixed(1)}</span>%
              </p>
            </div>

            {/* 프로그레스 바 */}
            <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500"
                style={{
                  width: `${Math.min(safetyRatio, 100)}%`,
                  backgroundColor: safetyInfo.color,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white drop-shadow-lg">
                  (근저당권 + 내 보증금) ÷ 매매 시세
                </span>
              </div>
            </div>

            {/* 70%, 80% 마커 */}
            <div className="flex justify-between text-[9px] text-gray-500 mb-3">
              <span>0%</span>
              <span className="text-green-600 font-bold">70%</span>
              <span className="text-orange-600 font-bold">80%</span>
              <span>100%</span>
            </div>
          </div>

          {/* 안전 레벨 피드백 */}
          <div
            className="rounded-xl p-4 border-2"
            style={{
              backgroundColor: `${safetyInfo.color}15`,
              borderColor: safetyInfo.color,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{safetyInfo.icon}</span>
              <p className="text-sm font-bold" style={{ color: safetyInfo.color }}>
                {safetyInfo.level}
              </p>
            </div>
            <p className="text-xs text-[#3E2C1C] leading-relaxed">{safetyInfo.message}</p>
          </div>
        </div>

        {/* 근저당권 집중 탐구 */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border-2 border-yellow-400">
          <h3 className="text-sm font-bold text-amber-900 mb-4 text-center">
            🚨 내 보증금을 위협하는 '근저당권'이란?
          </h3>

          {/* 핵심 개념 설명 */}
          <div className="bg-white rounded-xl p-4 border border-amber-200 mb-4">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-xl">🏦</span>
              <div className="flex-1">
                <p className="text-xs text-[#3E2C1C] leading-relaxed mb-2">
                  <span className="font-bold text-amber-800">근저당권</span>은 쉽게 말해
                  <span className="font-bold text-red-600"> "집을 담보로 은행이 먼저 챙겨갈 돈의 번호표"</span>예요.
                </p>
                <p className="text-xs text-[#3E2C1C] leading-relaxed">
                  집주인이 은행에서 돈을 빌리면서 집을 담보로 잡힌 거라, 만약 집주인이 빚을 못 갚아서 집이 경매로 넘어가면
                  <span className="font-bold text-red-600"> 은행이 가장 먼저</span> 돈을 가져가요!
                </p>
              </div>
            </div>

            {/* 채권최고액 설명 */}
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">💰</span>
                <p className="text-[10px] font-bold text-amber-800">
                  '채권최고액'이 뭔가요?
                  <button
                    onClick={() => setShowMortgageTip(showMortgageTip === 'bond' ? null : 'bond')}
                    className="ml-1 text-amber-600 hover:text-amber-800"
                  >
                    {showMortgageTip === 'bond' ? '▼' : '▶'}
                  </button>
                </p>
              </div>
              {showMortgageTip === 'bond' && (
                <div className="text-[10px] text-[#3E2C1C] leading-relaxed space-y-1">
                  <p>
                    • 실제 대출금의 약 <span className="num-label font-bold text-red-600 relative top-[2px]">120~130</span>%로 설정돼요
                  </p>
                  <p>
                    • 예: 대출 <span className="num-label font-bold relative top-[2px]">3</span>억 → 채권최고액
                    <span className="num-label font-bold text-red-600 relative top-[2px]"> 3.6</span>억~
                    <span className="num-label font-bold text-red-600 relative top-[2px]">3.9</span>억
                  </p>
                  <p>
                    • 이자와 연체료까지 포함한 최대 금액이에요!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 경매 시 분배 우선순위 시각화 */}
          <div className="bg-white rounded-xl p-4 border-2 border-red-300 mb-4">
            <h4 className="text-xs font-bold text-red-700 mb-3 text-center">
              ⚠️ 집이 경매로 넘어가면 이렇게 분배돼요!
            </h4>

            <div className="space-y-3">
              {/* 1위: 은행 (근저당권) */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                    1위
                  </div>
                  <p className="text-xs font-bold text-red-700">🏦 은행 (근저당권자)</p>
                </div>
                <div className="ml-10">
                  <div className="h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center px-3 relative">
                    <p className="text-white text-xs font-bold">
                      채권최고액 전액 우선 회수
                    </p>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rotate-45"></div>
                  </div>
                </div>
              </div>

              {/* 2위: 나 (세입자) */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                    2위
                  </div>
                  <p className="text-xs font-bold text-orange-700">🙋 나 (세입자 보증금)</p>
                </div>
                <div className="ml-10">
                  <div className="h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center px-3 relative">
                    <p className="text-white text-[11px] font-bold">
                      은행이 가져가고 남은 돈에서 받음
                    </p>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rotate-45"></div>
                  </div>
                </div>
              </div>

              {/* 3위: 집주인 */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                    3위
                  </div>
                  <p className="text-xs font-bold text-gray-600">🏠 집주인</p>
                </div>
                <div className="ml-10">
                  <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg flex items-center px-3">
                    <p className="text-white text-[10px] font-bold">
                      은행과 세입자가 받고 남은 돈
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 시뮬레이션 예시 */}
            <div className="mt-4 bg-red-50 rounded-lg p-3 border border-red-200">
              <p className="text-[10px] font-bold text-red-700 mb-2">💡 실전 예시</p>
              <div className="text-[10px] text-[#3E2C1C] space-y-1">
                <p>
                  • 경매 낙찰가: <span className="num-label font-bold relative top-[2px]">5</span>억 원
                </p>
                <p>
                  • 근저당권 채권최고액: <span className="num-label font-bold text-red-600 relative top-[2px]">3.6</span>억 원
                  <span className="text-red-600 font-bold">→ 은행이 먼저 가져감</span>
                </p>
                <p>
                  • 내 보증금: <span className="num-label font-bold text-orange-600 relative top-[2px]">2</span>억 원
                  <span className="text-orange-600 font-bold">→ 남은 1.4억에서 받음</span>
                </p>
                <p className="text-red-600 font-bold mt-2">
                  ⚠️ 결과: 나는 <span className="num-label relative top-[2px]">0.6</span>억 원(<span className="num-label relative top-[2px]">6,000</span>만 원)을 못 받아요!
                </p>
              </div>
            </div>
          </div>

          {/* 말소 체크 중요성 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-400">
            <div className="flex items-start gap-2">
              <span className="text-2xl">✅</span>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-green-800 mb-2">
                  가장 중요한 건 '말소' 표시!
                  <button
                    onClick={() => setShowMortgageTip(showMortgageTip === 'cancel' ? null : 'cancel')}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    {showMortgageTip === 'cancel' ? '▼' : '▶'}
                  </button>
                </h4>
                {showMortgageTip === 'cancel' && (
                  <div className="text-[10px] text-[#3E2C1C] leading-relaxed space-y-2 mb-3">
                    <p>
                      <span className="font-bold text-green-700">'말소'</span>는 근저당권이
                      <span className="font-bold text-green-700"> 완전히 사라졌다는 뜻</span>이에요.
                    </p>
                    <p>
                      등기부등본에 빨간 줄이 그어져 있고 <span className="font-bold">'말소'</span> 또는
                      <span className="font-bold"> '해지'</span>라고 적혀 있으면 안전해요!
                    </p>
                    <p className="text-red-600 font-bold">
                      ⚠️ 말소 표시가 없다면 = 아직 은행 빚이 남아있다는 뜻!
                    </p>
                  </div>
                )}
                <div className="bg-white rounded-lg p-3 border border-green-300">
                  <p className="text-xs font-bold text-green-700 text-center">
                    💬 내 등기부에는 빨간 줄이 있나요?
                  </p>
                  <p className="text-[10px] text-[#64748B] text-center mt-1">
                    계약 전 반드시 확인하세요!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 체크포인트 타임라인 */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-5 border-2 border-yellow-300">
          <h3 className="text-sm font-bold text-amber-800 mb-4 text-center">
            ✅ 체크포인트
          </h3>
          <p className="text-xs text-[#3E2C1C] mb-4 text-center">
            등기부등본은 총 <span className="font-bold text-amber-800">3번</span> 확인해야 합니다!
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                1
              </div>
              <div className="flex-1 bg-white rounded-lg p-3 border border-blue-200">
                <p className="text-xs font-bold text-blue-700">계약 전</p>
                <p className="text-[10px] text-[#64748B] mt-1">집주인 확인 & 압류/가압류 체크</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                2
              </div>
              <div className="flex-1 bg-white rounded-lg p-3 border border-orange-200">
                <p className="text-xs font-bold text-orange-700">잔금 전</p>
                <p className="text-[10px] text-[#64748B] mt-1">근저당권 추가 여부 확인</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                3
              </div>
              <div className="flex-1 bg-white rounded-lg p-3 border border-green-200">
                <p className="text-xs font-bold text-green-700">입주 후</p>
                <p className="text-[10px] text-[#64748B] mt-1">새 소유주 등록 & 확정일자 받기</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyRegisterSection;
