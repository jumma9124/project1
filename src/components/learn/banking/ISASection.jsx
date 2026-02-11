import React, { useState, useEffect } from 'react';

const SERVICE_KEY = '06b3477db7333064915456425b02c1111869ed411d0c1b277de5d212ea7464be';
const BASE_URL = 'https://apis.data.go.kr/1160100/GetISAInfoService_V2';

// 공통 스타일
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
  title: "text-sm font-bold text-[#4A3F35] mb-4 flex items-center",
};

function ISASection({
  showIndustryTip,
  setShowIndustryTip,
  showTaxTip,
  setShowTaxTip,
  onTipOpen
}) {
  const [profitRateData, setProfitRateData] = useState([]);
  const [joinStatusData, setJoinStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ISA MP 대표수익률 데이터 (최근 1년 기준)
        const profitUrl = `${BASE_URL}/getMPBenefitRateInfo_V2?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&resultType=json`;
        const profitResponse = await fetch(profitUrl);
        if (!profitResponse.ok) throw new Error(`HTTP 에러! 상태: ${profitResponse.status}`);
        const profitResult = await profitResponse.json();

        const profitItems = profitResult.response?.body?.items?.item || [];
        const profitArray = Array.isArray(profitItems) ? profitItems : [profitItems];

        // 최근 1년 수익률만 필터링하고, 회사별로 그룹화
        const companyProfits = {};
        profitArray.forEach(item => {
          if (item.trm === '1년' && item.cmpyNm) {
            if (!companyProfits[item.cmpyNm] || parseFloat(item.bnfRt || 0) > parseFloat(companyProfits[item.cmpyNm].bnfRt || 0)) {
              companyProfits[item.cmpyNm] = item;
            }
          }
        });

        // 수익률 높은 순으로 정렬
        const sortedProfits = Object.values(companyProfits)
          .sort((a, b) => parseFloat(b.bnfRt || 0) - parseFloat(a.bnfRt || 0))
          .slice(0, 5);

        setProfitRateData(sortedProfits);

        // ISA 가입현황 데이터
        const joinUrl = `${BASE_URL}/getJoinStatus_V2?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&resultType=json`;
        const joinResponse = await fetch(joinUrl);
        if (!joinResponse.ok) throw new Error(`HTTP 에러! 상태: ${joinResponse.status}`);
        const joinResult = await joinResponse.json();

        const joinItems = joinResult.response?.body?.items?.item || [];
        const joinArray = Array.isArray(joinItems) ? joinItems : [joinItems];

        // 최신 데이터만 필터링하고 업권별로 합산
        const latestDate = joinArray.length > 0 ? joinArray[0].basDt : null;
        const latestJoinData = joinArray.filter(item => item.basDt === latestDate);

        const ctgSummary = {};
        latestJoinData.forEach(item => {
          const ctg = item.ctg || '기타';
          if (!ctgSummary[ctg]) {
            ctgSummary[ctg] = { ctg, jnpnCnt: 0, invAmt: 0, basDt: item.basDt };
          }
          ctgSummary[ctg].jnpnCnt += parseInt(item.jnpnCnt || 0);
          ctgSummary[ctg].invAmt += parseInt(item.invAmt || 0);
        });

        // 가입자 수 기준으로 내림차순 정렬
        const sortedJoinData = Object.values(ctgSummary)
          .sort((a, b) => b.jnpnCnt - a.jnpnCnt);

        setJoinStatusData(sortedJoinData);
      } catch (error) {
        console.error('ISA API 연동 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBodyClick = () => {
    setShowTaxTip(false);
    setShowIndustryTip(false);
  };

  return (
    <div onClick={handleBodyClick}>
      {/* ISA/MP 대표수익률 섹션 */}
      <div className="px-6 mt-8">
        <div className={commonStyles.card}>
          <div className="flex justify-between items-baseline">
            <div className="flex items-center gap-1.5 mb-4">
              <h3 className="text-sm font-bold text-[#4A3F35] flex items-center">
                1년 수익률 높은 금융사 TOP5
              </h3>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowIndustryTip(!showIndustryTip);
                    setShowTaxTip(false);
                    onTipOpen();
                  }}
                  className="text-red-500 text-sm font-bold"
                >
                  !
                </button>
                {showIndustryTip && (() => {
                  // 증권과 은행 데이터만 필터링
                  const filtered = joinStatusData.filter(item =>
                    item.ctg === '증권' || item.ctg === '은행'
                  );
                  return (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#4A3F35] rounded-lg px-3 py-2 whitespace-nowrap z-10">
                      <div className="text-[11px] text-white tracking-tighter">
                        {filtered.map((item, idx) => (
                          <div key={idx}>
                            {item.ctg} → {(item.invAmt / 1000000000000).toFixed(1)}조
                          </div>
                        ))}
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-[#4A3F35]"></div>
                    </div>
                  );
                })()}
              </div>
            </div>
            {profitRateData.length > 0 && profitRateData[0].basDt && (
              <span className="text-[9px] text-[#8B7E74] whitespace-nowrap ml-2">
                {profitRateData[0].basDt?.slice(0, 4)}년 {parseInt(profitRateData[0].basDt?.slice(4, 6))}월 기준
              </span>
            )}
          </div>

          {loading ? (
            <p className="text-xs text-gray-400">데이터를 불러오는 중이에요...</p>
          ) : profitRateData.length > 0 ? (
            <>
              {/* 세금혜택 버튼 */}
              <div className="flex justify-end mb-4">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTaxTip(!showTaxTip);
                      setShowIndustryTip(false);
                      onTipOpen();
                    }}
                    className="text-[10px] text-[#C4956A] underline underline-offset-2"
                  >
                    세금혜택 알아보기
                  </button>
                  {showTaxTip && (
                    <div className="absolute bottom-full right-0 mb-2 bg-[#4A3F35] rounded-lg px-3 py-2 whitespace-nowrap z-10">
                      <p className="text-[11px] text-white tracking-tighter">
                        ISA는 수익에서 손실을 뺀 '순수익'에 대해서만 세금을 계산해서 훨씬 유리해요!
                      </p>
                      <div className="absolute top-full right-3 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-[#4A3F35]"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* 세로 막대 그래프 */}
              <div className="flex justify-between gap-3">
                {profitRateData.map((item, index) => {
                  const maxRate = Math.max(...profitRateData.map(d => Math.abs(parseFloat(d.bnfRt || 0))));
                  const rate = parseFloat(item.bnfRt || 0);
                  const barHeight = maxRate > 0 ? (Math.abs(rate) / maxRate) * 140 : 0;
                  const isPositive = rate >= 0;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      {/* 세로 막대 컨테이너 */}
                      <div className="w-full flex flex-col justify-end items-center relative" style={{ height: '140px' }}>
                        {/* 수익률 표시 - 막대 끝에 위치 */}
                        <div className="absolute" style={{ bottom: `${barHeight}px` }}>
                          <span className={`text-xs font-bold ${isPositive ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                            {isPositive ? '+' : ''}{rate}%
                          </span>
                        </div>

                        {/* 세로 막대 */}
                        <div
                          className={`w-full rounded-t-lg transition-all duration-1000 ${
                            index === 0
                              ? 'bg-[#FF8A00]'
                              : isPositive
                                ? 'bg-[#34D399]'
                                : 'bg-[#F87171]'
                          }`}
                          style={{ height: `${barHeight}px` }}
                        />
                      </div>

                      {/* 회사명과 순위 */}
                      <div className="text-center">
                        <span className={`text-xs font-bold ${index === 0 ? 'text-[#FF8A00]' : 'text-[#4A3F35]'}`}>
                          {index + 1}위
                        </span>
                        <p className="text-[10px] text-[#4A3F35] mt-1 break-words">{item.cmpyNm}</p>
                        <p className="text-[9px] text-gray-500">{item.mpTp}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-400">데이터를 불러올 수 없어요.</p>
          )}
        </div>
      </div>

      <div className="px-6 pb-2 mt-4 flex justify-end">
        <p className="text-[11px] text-[#8B7E74]">
          * 출처: 금융위원회 ISA 통계
        </p>
      </div>
    </div>
  );
}

export default ISASection;
