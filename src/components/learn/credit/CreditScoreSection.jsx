import React, { useState } from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function CreditScoreSection() {
  const fmt = (n) => n.toLocaleString();

  // 예시 신용점수 (실제로는 API나 사용자 입력으로 받을 수 있음)
  const [creditScore] = useState(850);
  const [showTips, setShowTips] = useState(false);

  // 점수 구간별 등급 및 색상 결정
  const getScoreInfo = (score) => {
    if (score >= 900) {
      return { grade: '최우량', color: '#10B981', bgColor: '#F0FDF4', borderColor: '#D1FAE5' };
    } else if (score >= 800) {
      return { grade: '우량', color: '#059669', bgColor: '#F0FDF4', borderColor: '#D1FAE5' };
    } else if (score >= 700) {
      return { grade: '양호', color: '#F59E0B', bgColor: '#FFF9F0', borderColor: '#FFEDD5' };
    } else if (score >= 600) {
      return { grade: '보통', color: '#F97316', bgColor: '#FFF9F0', borderColor: '#FFEDD5' };
    } else {
      return { grade: '주의', color: '#EF4444', bgColor: '#FEF2F2', borderColor: '#FEE2E2' };
    }
  };

  const scoreInfo = getScoreInfo(creditScore);

  // 게이지 각도 계산 (0~180도, 1000점 만점 기준)
  const gaugeAngle = (creditScore / 1000) * 180;

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 신용점수 게이지 차트 ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4 text-center">내 신용점수</h3>

        {/* 게이지 차트 영역 */}
        <div className="relative flex flex-col items-center mb-6">
          <svg width="280" height="160" viewBox="0 0 280 160" className="mx-auto">
            {/* 배경 게이지 (회색) */}
            <path
              d="M 40 140 A 100 100 0 0 1 240 140"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="24"
              strokeLinecap="round"
            />

            {/* 구간별 색상 게이지 */}
            {/* 빨간색 구간 (0-600) */}
            <path
              d="M 40 140 A 100 100 0 0 1 100 48"
              fill="none"
              stroke="#FEE2E2"
              strokeWidth="24"
              strokeLinecap="round"
            />

            {/* 주황색 구간 (600-700) */}
            <path
              d="M 100 48 A 100 100 0 0 1 140 40"
              fill="none"
              stroke="#FFEDD5"
              strokeWidth="24"
              strokeLinecap="round"
            />

            {/* 노란색 구간 (700-800) */}
            <path
              d="M 140 40 A 100 100 0 0 1 180 48"
              fill="none"
              stroke="#FEF3C7"
              strokeWidth="24"
              strokeLinecap="round"
            />

            {/* 초록색 구간 (800-1000) */}
            <path
              d="M 180 48 A 100 100 0 0 1 240 140"
              fill="none"
              stroke="#D1FAE5"
              strokeWidth="24"
              strokeLinecap="round"
            />

            {/* 실제 점수 바늘 */}
            <g transform={`rotate(${gaugeAngle - 90} 140 140)`}>
              <line
                x1="140"
                y1="140"
                x2="140"
                y2="60"
                stroke={scoreInfo.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="140" cy="140" r="6" fill={scoreInfo.color} />
            </g>
          </svg>

          {/* 중앙 점수 표시 */}
          <div className="absolute bottom-8 flex flex-col items-center">
            <span className="text-[32px] font-bold" style={{ color: scoreInfo.color }}>
              {creditScore}
            </span>
            <span className="text-[11px] text-[#8B7E74]">/ 1000점</span>
          </div>
        </div>

        {/* 등급 표시 */}
        <div
          className="rounded-xl p-4 text-center border"
          style={{
            backgroundColor: scoreInfo.bgColor,
            borderColor: scoreInfo.borderColor
          }}
        >
          <p className="text-[11px] text-[#4A3F35] mb-1">현재 등급</p>
          <p className="text-[18px] font-bold" style={{ color: scoreInfo.color }}>
            {scoreInfo.grade}
          </p>
        </div>

        {/* 구간별 범례 */}
        <div className="mt-4 grid grid-cols-5 gap-1 text-center">
          <div>
            <div className="w-full h-2 bg-[#FEE2E2] rounded mb-1"></div>
            <span className="text-[8px] text-[#8B7E74]">0-600</span>
          </div>
          <div>
            <div className="w-full h-2 bg-[#FFEDD5] rounded mb-1"></div>
            <span className="text-[8px] text-[#8B7E74]">600-700</span>
          </div>
          <div>
            <div className="w-full h-2 bg-[#FEF3C7] rounded mb-1"></div>
            <span className="text-[8px] text-[#8B7E74]">700-800</span>
          </div>
          <div>
            <div className="w-full h-2 bg-[#D1FAE5] rounded mb-1"></div>
            <span className="text-[8px] text-[#8B7E74]">800-900</span>
          </div>
          <div>
            <div className="w-full h-2 bg-[#10B981] rounded mb-1"></div>
            <span className="text-[8px] text-[#8B7E74]">900-1000</span>
          </div>
        </div>
      </div>

      {/* ── 점수 변동 요인 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">점수가 변하는 이유</h3>

        <div className="space-y-3">
          {/* UP 요인 */}
          <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#DBEAFE]/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">📈</span>
              <p className="text-[12px] font-bold text-[#2563EB]">점수가 올라가는 요인 (UP)</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#2563EB] text-sm shrink-0">✓</span>
                <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                  <span className="font-bold">카드값·대출 제때 갚기</span> - 연체 없이 납부하면 신뢰도 UP!
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#2563EB] text-sm shrink-0">✓</span>
                <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                  <span className="font-bold">장기 신용 유지</span> - 카드를 오래 쓸수록 신용 이력이 쌓여요.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#2563EB] text-sm shrink-0">✓</span>
                <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                  <span className="font-bold">통신비·공과금 내역 제출</span> - 꼬박꼬박 낸 기록도 점수에 반영돼요!
                </p>
              </div>
            </div>
          </div>

          {/* DOWN 요인 */}
          <div className="bg-[#FEF2F2] rounded-xl p-4 border border-[#FEE2E2]/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">📉</span>
              <p className="text-[12px] font-bold text-[#EF4444]">점수가 떨어지는 요인 (DOWN)</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#EF4444] text-sm shrink-0">✗</span>
                <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                  <span className="font-bold">연체·미납</span> - 한 번만 늦어도 점수가 크게 떨어져요.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#EF4444] text-sm shrink-0">✗</span>
                <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                  <span className="font-bold">단기간 여러 대출 신청</span> - 급하게 여기저기 대출 문의하면 위험 신호!
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#EF4444] text-sm shrink-0">✗</span>
                <p className="text-[11px] text-[#4A3F35] leading-relaxed">
                  <span className="font-bold">현금서비스·카드론 자주 사용</span> - 돈이 부족하다는 신호로 보여요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 내 신용점수 올리는 법 (토글 버튼) ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <h3 className="text-sm font-bold text-[#4A3F35]">내 신용점수 올리는 법</h3>
          </div>
          <span className={`text-[#FF8A00] text-sm transition-transform duration-300 ${showTips ? 'rotate-180' : ''}`}>
            ∨
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            showTips ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="space-y-3">
            <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFEDD5]/50">
              <p className="text-[11px] font-bold text-[#FF8A00] mb-2">1. 통신비 납부 내역 제출하기</p>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                휴대폰 요금, 인터넷 요금을 꼬박꼬박 낸 기록을 신용평가사에 제출하면 점수가 올라갈 수 있어요.
              </p>
            </div>

            <div className="bg-[#EFF6FF] rounded-xl p-4 border border-[#DBEAFE]/50">
              <p className="text-[11px] font-bold text-[#2563EB] mb-2">2. 체크카드보다 신용카드 사용하기</p>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                신용카드를 적당히 쓰고 제때 갚으면 신용 이력이 쌓여요. 체크카드는 신용점수에 영향이 없어요.
              </p>
            </div>

            <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
              <p className="text-[11px] font-bold text-[#059669] mb-2">3. 오래된 카드 해지하지 않기</p>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                오래 쓴 카드일수록 신용 이력이 길어져서 점수에 유리해요. 안 쓰더라도 해지하지 말고 놔두세요.
              </p>
            </div>

            <div className="bg-[#FCF9F5] rounded-xl p-4 border border-[#E5E7EB]/50">
              <p className="text-[11px] font-bold text-[#4A3F35] mb-2">4. 한도 대비 사용액 줄이기</p>
              <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                카드 한도의 30% 이하로 쓰는 게 이상적이에요. 한도를 꽉꽉 채워 쓰면 점수가 떨어질 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 신용관리 3계명 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">🛡️ 신용관리 3계명</h3>

        <div className="space-y-2.5">
          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">제1계명: 절대 연체하지 마세요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  한 번의 연체가 수년간 기록으로 남아요. 자동이체를 꼭 설정하세요!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">제2계명: 빚은 최소한으로 유지하세요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  대출이 많을수록 점수가 낮아져요. 여유가 생기면 빨리 갚는 게 최선이에요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#D1FAE5]/50">
            <div className="flex items-start gap-2">
              <span className="text-[#059669] text-sm shrink-0">✓</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#059669] mb-1">제3계명: 정기적으로 점수를 확인하세요</p>
                <p className="text-[10px] text-[#4A3F35] leading-relaxed">
                  NICE신용평가, KCB 등에서 무료로 조회할 수 있어요. 3개월마다 체크하세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CreditScoreSection;
