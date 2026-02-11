import React, { useState, useEffect } from 'react';

const SERVICE_KEY = '06b3477db7333064915456425b02c1111869ed411d0c1b277de5d212ea7464be';
const BASE_URL =
  'https://apis.data.go.kr/B190017/service/GetSavingsBankFinanceService/getFinanceStateList';

// 공통 스타일
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
  title: "text-sm font-bold text-[#4A3F35] mb-4 flex items-center",
};

function BankSafetySection() {
  const [bankData, setBankData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBisTipIdx, setShowBisTipIdx] = useState(null);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const countUrl = `${BASE_URL}?serviceKey=${SERVICE_KEY}&resultType=json&numOfRows=1&pageNo=1`;
        const countRes = await fetch(countUrl);
        if (!countRes.ok) throw new Error(`HTTP 에러! 상태: ${countRes.status}`);
        const countResult = await countRes.json();
        const totalCount = countResult.getFinanceStateList?.totalCount || 0;

        const lastPage = Math.ceil(totalCount / 5);
        const targetPage = totalCount % 5 !== 0 && lastPage > 1 ? lastPage - 1 : lastPage;
        const url = `${BASE_URL}?serviceKey=${SERVICE_KEY}&resultType=json&numOfRows=5&pageNo=${targetPage}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP 에러! 상태: ${response.status}`);

        const result = await response.json();
        const items = result.getFinanceStateList?.item || [];
        items.sort((a, b) => parseFloat(b.dpsAvgIrt) - parseFloat(a.dpsAvgIrt));
        setBankData(items);
      } catch (error) {
        console.error('CMA API 연동 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBankData();
  }, []);

  const handleBodyClick = () => setShowBisTipIdx(null);

  return (
    <div onClick={handleBodyClick}>
      <div className="px-6 mt-6">
        <div className={commonStyles.card}>
          <div className="flex justify-between items-baseline">
            <h3 className={commonStyles.title}>
              CMA 금리 높은 곳, 안전성도 체크해 보세요!
            </h3>
            {bankData.length > 0 && (
              <span className="text-[9px] text-[#8B7E74] whitespace-nowrap ml-2">
                {bankData[0].ym?.slice(0, 4)}년 {parseInt(bankData[0].ym?.slice(4))}월 기준
              </span>
            )}
          </div>

          {loading ? (
            <p className="text-xs text-gray-400">데이터를 불러오는 중이에요...</p>
          ) : (
            <div className="space-y-4">
              {bankData.map((bank, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center border-b border-dashed border-[#FFEDD5] pb-2">
                    <div>
                      <p className="text-sm text-[#4A3F35]">{bank.finIstNm}</p>
                      <p className="text-[10px] text-gray-500">예금금리: {bank.dpsAvgIrt}%</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowBisTipIdx(showBisTipIdx === index ? null : index);
                          }}
                          className="text-[10px] text-[#C4956A] underline underline-offset-2"
                        >
                          BIS {bank.bisTotCptRto}% (연체율 {bank.ovduRt}%)
                        </button>
                        {showBisTipIdx === index && (
                          <div className="absolute bottom-full right-0 mb-2 bg-[#4A3F35] rounded-lg px-3 py-2 whitespace-nowrap z-10">
                            <p className="text-[11px] text-white tracking-tighter">
                              은행의 기초체력 점수에요! 8%를 넘으면 아주 튼튼해요!
                            </p>
                            <div className="absolute top-full right-3 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-[#4A3F35]"></div>
                          </div>
                        )}
                      </div>
                      {parseFloat(bank.bisTotCptRto) >= 8 ? (
                        <span className="bg-[#D1FAE5] text-[#065F46] text-[10px] px-2 py-0.5 rounded-full">
                          안전
                        </span>
                      ) : (
                        <span className="bg-[#FEE2E2] text-[#991B1B] text-[10px] px-2 py-0.5 rounded-full">
                          주의
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-10 mt-2.5 flex justify-end">
        <p className="text-[11px] text-[#8B7E74]">
          * 출처: 예금보험공사 · 1인당 최고 5천만 원까지 예금자 보호
        </p>
      </div>
    </div>
  );
}

export default BankSafetySection;
