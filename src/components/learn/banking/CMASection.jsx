import React, { useState, useEffect } from 'react';

const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;
const BASE_URL =
  'https://apis.data.go.kr/B190017/service/GetSavingsBankFinanceService/getFinanceStateList';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function CMASection() {
  const fmt = (n) => n.toLocaleString();

  // 금액 입력 상태
  const [amount, setAmount] = useState(1_000_000);

  // CMA 금리 데이터
  const [cmaData, setCmaData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 평균 금리 계산용
  const avgCmaRate = cmaData.length > 0
    ? cmaData.reduce((sum, item) => sum + parseFloat(item.dpsAvgIrt || 0), 0) / cmaData.length
    : 2.5;

  const normalRate = 0.1; // 일반 입출금 통장 금리 (0.1%)

  // 하루 이자 계산
  const dailyInterestNormal = Math.round((amount * (normalRate / 100)) / 365);
  const dailyInterestCMA = Math.round((amount * (avgCmaRate / 100)) / 365);
  const dailyDifference = dailyInterestCMA - dailyInterestNormal;

  useEffect(() => {
    const fetchCMAData = async () => {
      try {
        const countUrl = `${BASE_URL}?serviceKey=${SERVICE_KEY}&resultType=json&numOfRows=1&pageNo=1`;
        const countRes = await fetch(countUrl);
        if (!countRes.ok) throw new Error(`HTTP 에러! 상태: ${countRes.status}`);
        const countResult = await countRes.json();
        const totalCount = countResult.getFinanceStateList?.totalCount || 0;

        const lastPage = Math.ceil(totalCount / 10);
        const targetPage = totalCount % 10 !== 0 && lastPage > 1 ? lastPage - 1 : lastPage;
        const url = `${BASE_URL}?serviceKey=${SERVICE_KEY}&resultType=json&numOfRows=10&pageNo=${targetPage}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP 에러! 상태: ${response.status}`);

        const result = await response.json();
        const items = result.getFinanceStateList?.item || [];
        items.sort((a, b) => parseFloat(b.dpsAvgIrt) - parseFloat(a.dpsAvgIrt));
        setCmaData(items.slice(0, 5)); // 상위 5개만
      } catch (error) {
        console.error('CMA API 연동 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCMAData();
  }, []);

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── CMA란? + 이자 계산기 (통합) ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">CMA/파킹통장이란?</h3>

        <div className="bg-[#FFF9F0] rounded-2xl p-4 flex flex-col items-center text-center mb-4">
          <span className="text-2xl mb-2">🅿️</span>
          <p className="text-[11px] font-bold text-[#FF8A00] mb-1">잠깐만 주차해도 이자가 쌓여요!</p>
          <p className="text-[9px] text-[#4A3F35] leading-relaxed">
            <span className="font-bold text-[#FF8A00]">하루만 맡겨도</span> 이자가 붙고, 언제든 자유롭게 입출금할 수 있는 마법의 주차장 같은 통장이에요
          </p>
        </div>

        <h3 className="text-sm font-bold text-[#4A3F35] mb-3 mt-5">💤 오늘 밤 자고 나면 쌓일 이자</h3>

        {/* 금액 입력 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[11px] text-[#4A3F35] font-bold">맡길 금액</label>
            <span className="text-[13px] font-bold text-[#FF8A00]">{fmt(amount)}원</span>
          </div>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full h-2 bg-[#FFEDD5] rounded-lg appearance-none cursor-pointer accent-[#FF8A00]"
          />
          <div className="flex justify-between text-[9px] text-[#8B7E74] mt-1">
            <span>10만</span>
            <span>1,000만</span>
          </div>
        </div>

        {/* 하루 이자 결과 */}
        <div className="bg-[#F0FDF4] rounded-xl p-3 border border-[#059669]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#4A3F35]">CMA 하루 이자 (연 {avgCmaRate.toFixed(1)}%)</span>
            <span className="text-[13px] font-bold text-[#059669]">+{fmt(dailyInterestCMA)}원</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#8B7E74]">일반 통장 (연 {normalRate}%)</span>
            <span className="text-[11px] text-[#8B7E74]">+{fmt(dailyInterestNormal)}원</span>
          </div>
          <div className="h-px bg-[#059669]/20 my-2"></div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#FF8A00]">하루만 주차해도 더 받는 돈</span>
            <span className="text-[12px] font-bold text-[#FF8A00]">+{fmt(dailyDifference)}원</span>
          </div>
        </div>

        <p className="text-[9px] text-[#8B7E74] mt-3 text-center">
          💡 1년이면 <span className="font-bold text-[#FF8A00]">{fmt(dailyDifference * 365)}원</span> 더 벌 수 있어요!
        </p>
      </div>

      {/* ── 일반 통장 vs CMA 금리 비교 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">일반 입출금 통장 vs CMA</h3>
        <p className="text-[11px] text-[#8B7E74] mb-1">{fmt(amount)}원을 1년 맡기면 이만큼 차이나요</p>
        <p className="text-[9px] text-[#8B7E74] mb-5">* 원금 {fmt(amount)}원 기준 (세전)</p>

        <div className="space-y-4">
          {/* 일반 입출금 통장 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🏦</span>
                <span className="text-[11px] font-bold text-[#4A3F35]">일반 입출금</span>
              </div>
              <span className="text-[11px] font-bold text-[#60A5FA]">연 {normalRate}%</span>
            </div>
            <div className="relative">
              <div className="w-full h-10 bg-[#EFF6FF] rounded-xl overflow-hidden flex items-center relative">
                <div
                  className="bg-[#60A5FA] h-full"
                  style={{ width: `${(normalRate / avgCmaRate) * 100}%` }}
                />
                <span className="absolute left-3 text-[10px] font-bold text-[#60A5FA]">
                  {fmt(Math.round(amount * (normalRate / 100)))}원
                </span>
              </div>
            </div>
          </div>

          {/* CMA */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🅿️</span>
                <span className="text-[11px] font-bold text-[#4A3F35]">CMA/파킹통장</span>
              </div>
              <span className="text-[12px] font-bold text-[#059669]">연 {avgCmaRate.toFixed(1)}%</span>
            </div>
            <div className="relative">
              <div className="w-full h-10 bg-[#F0FDF4] rounded-xl overflow-hidden flex items-center">
                <div className="bg-[#34D399] h-full w-full flex items-center justify-end pr-2">
                  <span className="text-[11px] font-bold text-white">{fmt(Math.round(amount * (avgCmaRate / 100)))}원</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 차이 강조 */}
        <div className="mt-4 bg-[#FFF9F0] rounded-xl p-3 border border-[#FFEDD5]/50 text-center">
          <p className="text-[10px] text-[#4A3F35] mb-1">CMA가 <span className="font-bold text-[#FF8A00]">{((avgCmaRate / normalRate) * 100).toFixed(0)}배</span> 더 많은 이자를 줘요!</p>
          <p className="text-[14px] font-bold text-[#FF8A00]">+{fmt(Math.round(amount * ((avgCmaRate - normalRate) / 100)))}원 더 받아요</p>
        </div>
      </div>

      {/* ── CMA 금리 높은 곳 TOP 5 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <div className="flex justify-between items-baseline mb-4">
          <h3 className="text-sm font-bold text-[#4A3F35]">CMA 금리 높은 곳 TOP 5</h3>
          {cmaData.length > 0 && (
            <span className="text-[9px] text-[#8B7E74] whitespace-nowrap ml-2">
              {cmaData[0].ym?.slice(0, 4)}년 {parseInt(cmaData[0].ym?.slice(4))}월 기준
            </span>
          )}
        </div>

        {loading ? (
          <p className="text-xs text-gray-400">데이터를 불러오는 중이에요...</p>
        ) : cmaData.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {cmaData.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl p-3 border ${
                  index === 0
                    ? 'bg-[#FFF9F0] border-[#FFEDD5]'
                    : 'bg-[#FCF9F5] border-[#E5E7EB]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold ${
                        index === 0 ? 'text-[#FF8A00]' : 'text-[#8B7E74]'
                      }`}
                    >
                      {index + 1}위
                    </span>
                    <span className="text-[12px] text-[#4A3F35] font-bold">{item.finIstNm}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[13px] font-bold ${index === 0 ? 'text-[#FF8A00]' : 'text-[#059669]'}`}>
                      {item.dpsAvgIrt}%
                    </span>
                    {parseFloat(item.bisTotCptRto) >= 8 && (
                      <span className="bg-[#D1FAE5] text-[#065F46] text-[9px] px-1.5 py-0.5 rounded-full">
                        안전
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#8B7E74]">금리 데이터를 불러올 수 없어요.</p>
        )}
      </div>

      {/* ── CMA 활용 꿀팁 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">💡 CMA/파킹통장 활용 꿀팁</h3>

        <div className="space-y-2.5">
          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 1</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">비상금 주차장</span>으로 활용하세요. 급하게 쓸 일이 생겨도 바로 뺄 수 있어요!
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 2</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">월급 받는 통장을 CMA로</span> 바꾸면 매일매일 이자가 쌓여요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 3</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              <span className="font-bold">단기 목돈</span>(결혼자금, 전세금 등)을 잠깐 맡겨두기에 최고예요.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#FF8A00] font-bold text-sm shrink-0">TIP 4</span>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              증권사 CMA는 <span className="font-bold">예금자 보호(5천만 원)</span>가 안 되니, 안전한 곳을 선택하세요!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <p className="text-[11px] text-[#8B7E74]">
          * 출처: 예금보험공사 금융기관 현황
        </p>
      </div>
    </div>
  );
}

export default CMASection;
