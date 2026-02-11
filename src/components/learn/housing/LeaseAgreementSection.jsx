import React, { useState } from 'react';

function LeaseAgreementSection() {
  // 계약서 핫스팟 상태
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // 최종 체크리스트 상태
  const [checklist, setChecklist] = useState({
    idCheck: false,
    registerCheck: false,
    accountCheck: false,
  });

  // 특약 복사 상태
  const [copiedClause, setCopiedClause] = useState(null);

  // 돋보기 툴팁 데이터
  const hotspotData = {
    amount: {
      title: '계약 금액',
      description: '보증금과 월세를 정확히 기재했는지 확인하세요. 계약서와 등기부등본의 금액이 일치해야 합니다!',
    },
    period: {
      title: '계약 기간',
      description: '입주일과 만료일을 명확히 기재하세요. 최소 2년 이상 보장받아야 안정적입니다.',
    },
    special: {
      title: '특약 사항',
      description: '계약서 하단의 특약 사항이 가장 중요해요! 아래 3대 특약을 반드시 넣으세요.',
    },
    signature: {
      title: '서명/날인',
      description: '집주인과 임차인 모두 서명하고 날짜를 기재하세요. 서명 전 모든 내용을 다시 한번 확인!',
    },
  };

  // 3대 특약
  const specialClauses = [
    {
      id: 1,
      title: '전입신고 협조 의무',
      content: '임대인은 임차인의 전입신고 및 확정일자 날인에 적극 협조한다.',
      reason: '전입신고와 확정일자는 내 보증금을 보호하는 가장 중요한 절차예요!',
    },
    {
      id: 2,
      title: '근저당권 말소 의무',
      content: '임대인은 근저당권 등 일체의 권리를 임차인 입주 전까지 말소하고, 말소 완료된 등기부등본을 임차인에게 제공한다.',
      reason: '근저당권이 남아있으면 내 보증금이 위험해질 수 있어요!',
    },
    {
      id: 3,
      title: '보증금 즉시 반환',
      content: '임대인은 임차인 퇴거 시 보증금 전액을 즉시 반환하며, 지연 시 연 12% 이자를 가산하여 지급한다.',
      reason: '보증금 반환이 지연되는 경우를 대비한 안전장치예요!',
    },
  ];

  // 특약 복사 함수
  const copyClause = (content, id) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedClause(id);
      setTimeout(() => setCopiedClause(null), 2000);
    });
  };

  // 체크리스트 토글
  const toggleChecklist = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 모든 항목 체크 여부
  const allChecked = checklist.idCheck && checklist.registerCheck && checklist.accountCheck;

  return (
    <div className="px-6 mt-6 pb-10">
      <div className="space-y-4">
        {/* 인터랙티브 계약서 뷰어 */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3] relative">
          <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 text-center">
            📝 계약서 체크 포인트 (클릭해보세요!)
          </h3>

          {/* 계약서 시뮬레이션 */}
          <div
            className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-300 min-h-[400px]"
            onClick={() => setSelectedHotspot(null)}
          >
            {/* 계약서 타이틀 */}
            <div className="text-center mb-6">
              <h4 className="text-lg font-bold text-[#1E293B]">임대차 계약서</h4>
              <p className="text-[10px] text-gray-500 mt-1">(Lease Agreement)</p>
            </div>

            {/* 계약서 본문 시뮬레이션 */}
            <div className="space-y-4 text-[10px] text-gray-600">
              {/* 제1조 - 돋보기 없음 */}
              <div className="bg-white rounded p-3 border border-gray-200 relative">
                <p className="font-semibold mb-1">제1조 (목적물의 표시)</p>
                <p>소재지: 서울특별시 ○○구 ○○동 123-45</p>
              </div>

              {/* 제2조 - 계약 금액 */}
              <div className="bg-white rounded p-3 border border-gray-200 relative">
                <p className="font-semibold mb-1">제2조 (계약 내용)</p>
                <p>보증금: 금 ________원정</p>
                <p>월세: 금 ________원정</p>

                {/* 돋보기 아이콘 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotspot(selectedHotspot === 'amount' ? null : 'amount');
                  }}
                  className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform bg-[#C9A85C]"
                >
                  <span className="text-white text-sm">🔍</span>
                </button>

                {/* 툴팁 */}
                {selectedHotspot === 'amount' && (
                  <div
                    className="absolute z-10 w-48 bg-[#1E293B] rounded-xl p-3 shadow-2xl right-[-16px] top-full mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-xs font-bold text-white mb-1">{hotspotData.amount.title}</p>
                    <p className="text-[10px] text-gray-200 leading-relaxed">{hotspotData.amount.description}</p>
                    <div className="absolute w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#1E293B] bottom-full right-3"></div>
                  </div>
                )}
              </div>

              {/* 제3조 - 계약 기간 */}
              <div className="bg-white rounded p-3 border border-gray-200 relative">
                <p className="font-semibold mb-1">제3조 (계약 기간)</p>
                <p>20__년 __월 __일부터 20__년 __월 __일까지</p>

                {/* 돋보기 아이콘 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotspot(selectedHotspot === 'period' ? null : 'period');
                  }}
                  className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform bg-[#C9A85C]"
                >
                  <span className="text-white text-sm">🔍</span>
                </button>

                {/* 툴팁 */}
                {selectedHotspot === 'period' && (
                  <div
                    className="absolute z-10 w-48 bg-[#1E293B] rounded-xl p-3 shadow-2xl right-[-16px] top-full mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-xs font-bold text-white mb-1">{hotspotData.period.title}</p>
                    <p className="text-[10px] text-gray-200 leading-relaxed">{hotspotData.period.description}</p>
                    <div className="absolute w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#1E293B] bottom-full right-3"></div>
                  </div>
                )}
              </div>

              {/* 제4조 - 특약 사항 (빨간색) */}
              <div className="bg-white rounded p-3 border border-gray-200 min-h-[60px] relative">
                <p className="font-semibold mb-1">제4조 (특약 사항)</p>
                <p className="text-gray-400">특약 사항을 여기에 기재합니다...</p>

                {/* 돋보기 아이콘 - 빨간색 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotspot(selectedHotspot === 'special' ? null : 'special');
                  }}
                  className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform bg-[#DC2626] animate-pulse"
                >
                  <span className="text-white text-sm">🔍</span>
                </button>

                {/* 툴팁 */}
                {selectedHotspot === 'special' && (
                  <div
                    className="absolute z-10 w-48 bg-[#1E293B] rounded-xl p-3 shadow-2xl right-[-16px] top-full mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-xs font-bold text-white mb-1">{hotspotData.special.title}</p>
                    <p className="text-[10px] text-gray-200 leading-relaxed">{hotspotData.special.description}</p>
                    <div className="absolute w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#1E293B] bottom-full right-3"></div>
                  </div>
                )}
              </div>

              {/* 제5조 - 서명 날인 */}
              <div className="bg-white rounded p-3 border border-gray-200 relative">
                <p className="font-semibold mb-1">제5조 (서명 날인)</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p>임대인: ____________ (인)</p>
                  </div>
                  <div>
                    <p>임차인: ____________ (인)</p>
                  </div>
                </div>

                {/* 돋보기 아이콘 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotspot(selectedHotspot === 'signature' ? null : 'signature');
                  }}
                  className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform bg-[#C9A85C]"
                >
                  <span className="text-white text-sm">🔍</span>
                </button>

                {/* 툴팁 */}
                {selectedHotspot === 'signature' && (
                  <div
                    className="absolute z-10 w-48 bg-[#1E293B] rounded-xl p-3 shadow-2xl right-[-16px] top-full mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-xs font-bold text-white mb-1">{hotspotData.signature.title}</p>
                    <p className="text-[10px] text-gray-200 leading-relaxed">{hotspotData.signature.description}</p>
                    <div className="absolute w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#1E293B] bottom-full right-3"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3대 특약 카드 섹션 */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 border-2 border-emerald-300">
          <h3 className="text-sm font-bold text-emerald-900 mb-3 text-center">
            🛡️ 내 보증금을 지키는 3대 특약
          </h3>
          <p className="text-xs text-emerald-700 text-center mb-4">
            계약서 특약란에 반드시 넣어야 할 문구예요! [복사하기]를 눌러 메모장에 옮겨주세요.
          </p>

          <div className="space-y-3">
            {specialClauses.map((clause) => (
              <div key={clause.id} className="bg-white rounded-xl p-4 border-2 border-emerald-200">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                      <span className="num-label relative top-[2px]">{clause.id}</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-900">{clause.title}</p>
                  </div>
                  <button
                    onClick={() => copyClause(clause.content, clause.id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-colors shrink-0"
                  >
                    {copiedClause === clause.id ? '✓ 복사됨!' : '📋 복사하기'}
                  </button>
                </div>

                <div className="bg-emerald-50 rounded-lg p-3 mb-2 border border-emerald-200">
                  <p className="text-[11px] text-[#1E293B] leading-relaxed">
                    {clause.content}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-xs">💡</span>
                  <p className="text-[10px] text-emerald-700 leading-relaxed">{clause.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최종 체크리스트 */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-400">
          <h3 className="text-sm font-bold text-amber-900 mb-3 text-center">
            ✅ 최종 체크리스트 (Final Check)
          </h3>
          <p className="text-xs text-amber-700 text-center mb-4">
            도장을 찍기 전, 마지막으로 이것만은 꼭 확인하세요!
          </p>

          <div className="space-y-3">
            {/* 체크박스 1 */}
            <div
              onClick={() => toggleChecklist('idCheck')}
              className="bg-white rounded-xl p-4 border-2 border-amber-200 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                    checklist.idCheck
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {checklist.idCheck && <span className="text-white text-sm font-bold">✓</span>}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#1E293B]">집주인 신분증 대조 완료</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    계약서 명의와 신분증 정보가 일치하는지 확인
                  </p>
                </div>
              </div>
            </div>

            {/* 체크박스 2 */}
            <div
              onClick={() => toggleChecklist('registerCheck')}
              className="bg-white rounded-xl p-4 border-2 border-amber-200 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                    checklist.registerCheck
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {checklist.registerCheck && <span className="text-white text-sm font-bold">✓</span>}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#1E293B]">등기부등본 당일 발행본 확인 완료</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    계약 당일 발급받은 최신본으로 근저당권 확인
                  </p>
                </div>
              </div>
            </div>

            {/* 체크박스 3 */}
            <div
              onClick={() => toggleChecklist('accountCheck')}
              className="bg-white rounded-xl p-4 border-2 border-amber-200 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                    checklist.accountCheck
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {checklist.accountCheck && <span className="text-white text-sm font-bold">✓</span>}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#1E293B]">집주인 명의 계좌번호 확인 완료</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    보증금 입금 계좌가 집주인 본인 명의인지 확인
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 축하 메시지 */}
          {allChecked && (
            <div className="mt-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-4 shadow-lg animate-pulse">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🎉</span>
                <p className="text-sm font-bold text-white">축하합니다!</p>
                <span className="text-2xl">🎉</span>
              </div>
              <p className="text-xs text-white text-center leading-relaxed">
                이제 도장을 찍으셔도 좋습니다!
                <br />
                안전한 계약을 준비하셨네요.
              </p>
            </div>
          )}
        </div>

        {/* 추가 꿀팁 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-300">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <div>
              <h4 className="text-sm font-bold text-blue-900 mb-2">계약 당일 꿀팁!</h4>
              <div className="space-y-2">
                <p className="text-xs text-[#1E293B] leading-relaxed">
                  <span className="font-bold text-blue-700">📸 계약서 사진 촬영:</span> 계약서 전체를 사진으로 찍어두세요. 분쟁 시 증거가 됩니다!
                </p>
                <p className="text-xs text-[#1E293B] leading-relaxed">
                  <span className="font-bold text-blue-700">🏠 집 상태 기록:</span> 입주 전 집 상태를 동영상으로 찍어두면 퇴거 시 원상복구 분쟁을 막을 수 있어요.
                </p>
                <p className="text-xs text-[#1E293B] leading-relaxed">
                  <span className="font-bold text-blue-700">💰 계약금 영수증:</span> 계약금을 주고 반드시 영수증을 받으세요. 현금 거래는 위험합니다!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaseAgreementSection;
