import React, { useState, useEffect } from 'react';

const SERVICE_KEY = '06b3477db7333064915456425b02c1111869ed411d0c1b277de5d212ea7464be';

// 공통 스타일
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
  title: "text-sm font-bold text-[#4A3F35] mb-4 flex items-center",
};

function SubscriptionGraphSection() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [ageData, setAgeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showTitleTip, setShowTitleTip] = useState(false);

  // 청약 가점 계산기 상태
  const [noHousePeriod, setNoHousePeriod] = useState('0'); // 무주택 기간 (년)
  const [dependents, setDependents] = useState('0'); // 부양가족 수
  const [savingsPeriod, setSavingsPeriod] = useState('0'); // 통장 가입 기간 (년)

  // 특별공급 팝업 상태
  const [selectedSpecial, setSelectedSpecial] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 청약통장 통계 데이터
        const subscriptionUrl = `https://api.odcloud.kr/api/ApplyhomeBnkbStatSvc/v1/getBnkbAcnutAllStat?serviceKey=${SERVICE_KEY}&page=1&perPage=100&returnType=JSON`;
        const subscriptionResponse = await fetch(subscriptionUrl);
        if (!subscriptionResponse.ok) throw new Error(`HTTP 에러! 상태: ${subscriptionResponse.status}`);
        const subscriptionResult = await subscriptionResponse.json();
        const items = subscriptionResult.data || [];
        const filtered = items.filter((i) => i.DPST_ITEM_NM === '종합저축');
        const latestYm = filtered.length > 0 ? filtered[0].DELNG_OCCRRNC_YM : null;
        const latestData = filtered.filter((i) => i.DELNG_OCCRRNC_YM === latestYm);
        setSubscriptionData(latestData);

        // 연령대별 청약 신청자 데이터
        const ageUrl = `https://api.odcloud.kr/api/ApplyhomeStatSvc/v1/getAPTReqstAreaStat?serviceKey=${SERVICE_KEY}&page=1&perPage=1000&returnType=JSON`;
        const ageResponse = await fetch(ageUrl);
        if (!ageResponse.ok) throw new Error(`HTTP 에러! 상태: ${ageResponse.status}`);
        const ageResult = await ageResponse.json();
        const ageItems = ageResult.data || [];

        // 지역별로 가장 최신 데이터만 필터링
        const latestByRegion = {};
        ageItems.forEach(item => {
          const region = item.SUBSCRPT_AREA_CODE_NM;
          if (!latestByRegion[region] || item.STAT_DE > latestByRegion[region].STAT_DE) {
            latestByRegion[region] = item;
          }
        });

        // 각 지역의 연령대별 순위 계산
        const processedAgeData = {};
        Object.keys(latestByRegion).forEach(region => {
          const data = latestByRegion[region];
          const ages = [
            { label: '30대 이하', value: data.AGE_30 || 0 },
            { label: '40대', value: data.AGE_40 || 0 },
            { label: '50대', value: data.AGE_50 || 0 },
            { label: '60대 이상', value: data.AGE_60 || 0 }
          ].sort((a, b) => b.value - a.value);

          processedAgeData[region] = ages;
        });

        setAgeData(processedAgeData);
      } catch (error) {
        console.error('API 연동 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 청약 가점 계산 함수
  const calculateScore = () => {
    const noHouseScore = parseInt(noHousePeriod) * 2; // 무주택 기간 (최대 32점)
    const dependentsScore = parseInt(dependents) * 5; // 부양가족 (최대 35점)
    const savingsScore = parseInt(savingsPeriod) * 1; // 통장 가입 기간 (최대 17점)
    return Math.min(noHouseScore + dependentsScore + savingsScore, 84);
  };

  const totalScore = calculateScore();

  const handleBodyClick = () => {
    setSelectedRegion(null);
    setSelectedInfo(null);
    setShowTitleTip(false);
    setSelectedSpecial(null);
  };

  return (
    <>
      <div className="px-6 mt-6" onClick={handleBodyClick}>
        <div
          className="bg-white rounded-tl-[2.5rem] rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-br-0 p-6 shadow-sm border border-[#FFEDD5]/30 cursor-pointer relative"
          onClick={(e) => {
            e.stopPropagation();
            setShowTitleTip(!showTitleTip);
            setSelectedRegion(null);
            setSelectedInfo(null);
          }}
        >
          {showTitleTip && (
            <div className="absolute top-4 left-6 bg-[#4A3F35] rounded-lg px-3 py-2 whitespace-nowrap z-20">
              <p className="text-[11px] text-white tracking-tighter">
                한 번 해지하면 그동안 쌓인 '시간 점수'가 모두 사라지니 절대 해지하지 마세요!
              </p>
              <div className="absolute top-full left-3 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-[#4A3F35]"></div>
            </div>
          )}
          <div className="flex justify-between items-end">
            <h3 className={commonStyles.title}>지역별 청약 대기 줄서기 현황</h3>
            <span className="text-[10px] text-gray-400">단위: 만 명</span>
          </div>

          {loading ? (
            <p className="text-xs text-gray-400">데이터를 불러오는 중이에요...</p>
          ) : subscriptionData.length > 0 ? (
            <div className="space-y-8">
              {subscriptionData.map((item, index) => {
                const rank1 = Math.round((item.RNK1_ACNUT_CO || 0) / 10000);
                const rank2 = Math.round((item.RNK2_ACNUT_CO || 0) / 10000);
                const total = rank1 + rank2;
                const rank1Width = total > 0 ? (rank1 / total) * 100 : 0;

                return (
                  <div key={index} className="relative">
                    <div className="flex justify-between mb-2 items-center">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRegion(selectedRegion === index ? null : index);
                            setSelectedInfo(null);
                            setShowTitleTip(false);
                          }}
                          className="text-sm text-[#4A3F35] hover:text-[#FF8A00] transition-colors"
                        >
                          {item.SUBSCRPT_AREA_CODE_NM}
                        </button>
                        {selectedRegion === index && (() => {
                          const tooltipTexts = {
                            '서울': '청약통장은 \'얼마\'를 넣느냐보다 \'얼마나 일찍\' 시작했느냐가 당첨을 결정해요',
                            '인천·경기': '매달 10만원씩 꾸준히 넣는 것이 가장 유리해요',
                            '5대광역시': '공공은 \'오래, 꾸준히\' 넣은 사람이, 민영은 \'가점과 추첨\'으로 당첨자가 결정돼요',
                            '기타지역': '내 집 마련이 처음이라면 공공을, 큰 평수나 브랜드 아파트를 원한다면 민영을 노려보세요'
                          };
                          const tooltipText = tooltipTexts[item.SUBSCRPT_AREA_CODE_NM] || '매달 10만원씩 꾸준히 넣는 것이 가장 유리해요';

                          return (
                            <div className="absolute bottom-full left-0 mb-2 bg-[#4A3F35] rounded-lg px-3 py-2 whitespace-nowrap z-10">
                              <p className="text-[11px] text-white tracking-tighter">
                                {tooltipText}
                              </p>
                              <div className="absolute top-full left-3 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-[#4A3F35]"></div>
                            </div>
                          );
                        })()}
                      </div>
                      <span className="text-[11px] text-[#4A3F35] opacity-70">
                        총 {total}만 명 중{' '}
                        <strong className="text-[#FF8A00]">{rank1}만 명</strong>이 1순위
                      </span>
                    </div>

                    <div
                      className="h-4 w-full bg-[#FFEDD5]/30 rounded-full overflow-hidden cursor-pointer relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInfo(selectedInfo === index ? null : index);
                        setSelectedRegion(null);
                        setShowTitleTip(false);
                      }}
                    >
                      <div
                        className="h-full bg-[#FF8A00] rounded-full transition-all duration-1000"
                        style={{ width: `${rank1Width}%` }}
                      />
                    </div>

                    {selectedInfo === index && (() => {
                      // 지역명 매핑
                      const regionMap = {
                        '서울': '서울',
                        '인천·경기': '경기',
                        '5대광역시': '부산',
                        '기타지역': '충남'
                      };
                      const mappedRegion = regionMap[item.SUBSCRPT_AREA_CODE_NM] || '서울';
                      const regionAgeData = ageData[mappedRegion] || [];

                      return (
                        <div className="mt-2 w-full bg-[#FFF9F0] border border-[#FFEDD5] p-4 rounded-2xl">
                          <p className="text-xs text-[#4A3F35] font-bold mb-2">
                            {item.SUBSCRPT_AREA_CODE_NM} 연령대별 청약 순위
                          </p>
                          {regionAgeData.length > 0 ? (
                            <div className="space-y-1.5">
                              {regionAgeData.map((age, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="text-xs text-[#4A3F35]">{age.label}</span>
                                  <span className={`text-xs font-semibold ${idx === 0 ? 'text-[#FF8A00]' : 'text-[#4A3F35]'}`}>
                                    {idx + 1}순위
                                  </span>
                                  {idx === 0 && (
                                    <span className="text-[10px] text-gray-500">
                                      가장 많이 신청했어요! ({age.value.toLocaleString()}명)
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400">연령대별 데이터를 불러오는 중이에요...</p>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400">데이터를 불러올 수 없어요.</p>
          )}

          <p className="mt-6 text-[10px] text-gray-400 text-center">
            * 1순위가 많을수록 내 집 마련 경쟁이 치열하다는 뜻이에요!
          </p>
        </div>
      </div>

      {/* 청약 가점 계산기 (컴팩트 버전) */}
      <div className="px-6 mt-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#FFEDD5]/30">
          <h3 className="text-sm font-bold text-[#4A3F35] mb-3 flex items-center">
            🧮 청약 가점 계산기
          </h3>

          {/* 2단 레이아웃: 좌측 점수, 우측 입력폼 */}
          <div className="grid grid-cols-[120px_1fr] gap-4 mb-3">
            {/* 좌측: 원형 게이지 스타일 점수 */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-3 flex flex-col items-center justify-center shadow-md">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-1.5 shadow-inner">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-700">
                    <span className="num-label relative top-[2px]">{totalScore}</span>
                  </p>
                  <p className="text-[8px] text-gray-500">점</p>
                </div>
              </div>
              <p className="text-[9px] text-white font-semibold">내 총 가점</p>
              <p className="text-[8px] text-blue-100">/ <span className="num-label relative top-[1px]">84</span>점</p>
            </div>

            {/* 우측: 입력 폼들 (작은 카드 형태) */}
            <div className="space-y-2">
              {/* 무주택 기간 */}
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                <label className="text-[9px] text-blue-700 font-semibold block mb-1">
                  무주택 기간 (최대 <span className="num-label relative top-[1px]">32</span>점)
                </label>
                <select
                  value={noHousePeriod}
                  onChange={(e) => setNoHousePeriod(e.target.value)}
                  className="w-full px-2 py-1 text-[11px] border border-blue-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  <option value="0">0년 (0점)</option>
                  <option value="1">1년 (2점)</option>
                  <option value="2">2년 (4점)</option>
                  <option value="3">3년 (6점)</option>
                  <option value="4">4년 (8점)</option>
                  <option value="5">5년 (10점)</option>
                  <option value="6">6년 (12점)</option>
                  <option value="7">7년 (14점)</option>
                  <option value="8">8년 (16점)</option>
                  <option value="9">9년 (18점)</option>
                  <option value="10">10년 (20점)</option>
                  <option value="11">11년 (22점)</option>
                  <option value="12">12년 (24점)</option>
                  <option value="13">13년 (26점)</option>
                  <option value="14">14년 (28점)</option>
                  <option value="15">15년 (30점)</option>
                  <option value="16">16년 이상 (32점)</option>
                </select>
              </div>

              {/* 부양가족 수 */}
              <div className="bg-orange-50 rounded-lg p-2 border border-orange-200">
                <label className="text-[9px] text-orange-700 font-semibold block mb-1">
                  부양가족 수 (최대 <span className="num-label relative top-[1px]">35</span>점)
                </label>
                <select
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                  className="w-full px-2 py-1 text-[11px] border border-orange-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-orange-400"
                >
                  <option value="0">0명 (0점)</option>
                  <option value="1">1명 (5점)</option>
                  <option value="2">2명 (10점)</option>
                  <option value="3">3명 (15점)</option>
                  <option value="4">4명 (20점)</option>
                  <option value="5">5명 (25점)</option>
                  <option value="6">6명 (30점)</option>
                  <option value="7">7명 이상 (35점)</option>
                </select>
              </div>

              {/* 통장 가입 기간 */}
              <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                <label className="text-[9px] text-green-700 font-semibold block mb-1">
                  통장 가입 기간 (최대 <span className="num-label relative top-[1px]">17</span>점)
                </label>
                <select
                  value={savingsPeriod}
                  onChange={(e) => setSavingsPeriod(e.target.value)}
                  className="w-full px-2 py-1 text-[11px] border border-green-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-green-400"
                >
                  <option value="0">6개월 미만 (0점)</option>
                  <option value="1">6개월~1년 (1점)</option>
                  <option value="2">1년~2년 (2점)</option>
                  <option value="3">2년~3년 (3점)</option>
                  <option value="4">3년~4년 (4점)</option>
                  <option value="5">4년~5년 (5점)</option>
                  <option value="6">5년~6년 (6점)</option>
                  <option value="7">6년~7년 (7점)</option>
                  <option value="8">8년~9년 (8점)</option>
                  <option value="9">9년~10년 (9점)</option>
                  <option value="10">10년~11년 (10점)</option>
                  <option value="11">11년~12년 (11점)</option>
                  <option value="12">12년~13년 (12점)</option>
                  <option value="13">13년~14년 (13점)</option>
                  <option value="14">14년~15년 (14점)</option>
                  <option value="15">15년 이상 (15점)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-2.5 border border-yellow-200">
            <p className="text-[9px] text-[#4A3F35] leading-relaxed">
              💡 청약 가점은 무주택 기간, 부양가족 수, 통장 가입 기간을 합산해서 계산돼요.
              점수가 높을수록 당첨 확률이 높아집니다!
            </p>
          </div>
        </div>
      </div>

      {/* 특별공급 카드 섹션 */}
      <div className="px-6 mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#FFEDD5]/30">
          <h3 className="text-sm font-bold text-[#4A3F35] mb-4 flex items-center">
            ⭐ 특별공급 안내
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            일반공급보다 경쟁률이 낮은 특별공급! 자격 요건을 확인해보세요.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* 생애최초 */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSpecial(selectedSpecial === 'first' ? null : 'first');
              }}
              className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-400 cursor-pointer hover:shadow-lg transition-all relative"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⭐</span>
                <p className="text-sm font-bold text-amber-800">생애최초</p>
              </div>
              <p className="text-[10px] text-[#4A3F35]">사회초년생 추천!</p>
              {selectedSpecial === 'first' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-amber-800 rounded-xl p-4 z-10 shadow-2xl">
                  <p className="text-xs text-white font-bold mb-2">✓ 자격 요건</p>
                  <div className="space-y-1 text-[10px] text-white">
                    <p>• 과거에 주택을 소유한 적이 없어야 함</p>
                    <p>• 소득 기준: 도시근로자 월평균 소득 <span className="num-label relative top-[2px]">130</span>% 이하</p>
                    <p>• 청약통장 <span className="num-label relative top-[2px]">2</span>년 이상 가입</p>
                  </div>
                  <div className="absolute top-0 left-4 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-amber-800 -translate-y-full"></div>
                </div>
              )}
            </div>

            {/* 신혼부부 */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSpecial(selectedSpecial === 'newlywed' ? null : 'newlywed');
              }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border-2 border-pink-300 cursor-pointer hover:shadow-lg transition-all relative"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💑</span>
                <p className="text-sm font-bold text-pink-800">신혼부부</p>
              </div>
              <p className="text-[10px] text-[#4A3F35]">결혼 <span className="num-label relative top-[2px]">7</span>년 이내</p>
              {selectedSpecial === 'newlywed' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-pink-800 rounded-xl p-4 z-10 shadow-2xl">
                  <p className="text-xs text-white font-bold mb-2">✓ 자격 요건</p>
                  <div className="space-y-1 text-[10px] text-white">
                    <p>• 혼인 기간 <span className="num-label relative top-[2px]">7</span>년 이내</p>
                    <p>• 소득 기준: 도시근로자 월평균 소득 <span className="num-label relative top-[2px]">140</span>% 이하</p>
                    <p>• 청약통장 가입 (지역별 상이)</p>
                  </div>
                  <div className="absolute top-0 left-4 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-pink-800 -translate-y-full"></div>
                </div>
              )}
            </div>

            {/* 다자녀 */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSpecial(selectedSpecial === 'multichild' ? null : 'multichild');
              }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-300 cursor-pointer hover:shadow-lg transition-all relative"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">👨‍👩‍👧‍👦</span>
                <p className="text-sm font-bold text-green-800">다자녀</p>
              </div>
              <p className="text-[10px] text-[#4A3F35]">자녀 <span className="num-label relative top-[2px]">3</span>명 이상</p>
              {selectedSpecial === 'multichild' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-green-800 rounded-xl p-4 z-10 shadow-2xl">
                  <p className="text-xs text-white font-bold mb-2">✓ 자격 요건</p>
                  <div className="space-y-1 text-[10px] text-white">
                    <p>• 미성년 자녀 <span className="num-label relative top-[2px]">3</span>명 이상 (태아 포함)</p>
                    <p>• 소득 기준: 없음</p>
                    <p>• 청약통장 가입 (지역별 상이)</p>
                  </div>
                  <div className="absolute top-0 left-4 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-green-800 -translate-y-full"></div>
                </div>
              )}
            </div>

            {/* 노부모 부양 */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSpecial(selectedSpecial === 'parents' ? null : 'parents');
              }}
              className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border-2 border-purple-300 cursor-pointer hover:shadow-lg transition-all relative"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">👴</span>
                <p className="text-sm font-bold text-purple-800">노부모 부양</p>
              </div>
              <p className="text-[10px] text-[#4A3F35]"><span className="num-label relative top-[2px]">65</span>세 이상 부양</p>
              {selectedSpecial === 'parents' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-purple-800 rounded-xl p-4 z-10 shadow-2xl">
                  <p className="text-xs text-white font-bold mb-2">✓ 자격 요건</p>
                  <div className="space-y-1 text-[10px] text-white">
                    <p>• <span className="num-label relative top-[2px]">65</span>세 이상 직계존속 부양 (<span className="num-label relative top-[2px]">3</span>년 이상)</p>
                    <p>• 소득 기준: 없음</p>
                    <p>• 청약 가점 높은 순으로 당첨</p>
                  </div>
                  <div className="absolute top-0 left-4 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-purple-800 -translate-y-full"></div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-[10px] text-[#4A3F35] leading-relaxed">
              💡 특별공급은 일반공급보다 경쟁률이 낮아 당첨 확률이 높아요!
              조건에 맞는다면 꼭 신청해보세요.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 mt-2.5 flex justify-end">
        <p className="text-[11px] text-[#8B7E74]">
          * 출처: 한국부동산원 청약홈
          {subscriptionData.length > 0 &&
            ` (${subscriptionData[0].DELNG_OCCRRNC_YM?.slice(0, 4)}년 ${parseInt(subscriptionData[0].DELNG_OCCRRNC_YM?.slice(4))}월 기준)`}
        </p>
      </div>
    </>
  );
}

export default SubscriptionGraphSection;
