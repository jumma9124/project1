import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import LearnDetailLayout from './LearnDetailLayout';
import contentData from '../../data/contentData';

// lazy import: 각 섹션 컴포넌트를 필요할 때만 로드
const sectionComponents = {
  1: lazy(() => import('../../components/learn/salary/SalaryPayslipSection')),
  2: lazy(() => import('../../components/learn/salary/NetPayCalculatorSection')),
  3: lazy(() => import('../../components/learn/salary/YearEndTaxSection')),
  4: lazy(() => import('../../components/learn/salary/DeductionCompareSection')),
  5: lazy(() => import('../../components/learn/salary/ExpenseTrackerSection')),
  6: lazy(() => import('../../components/learn/banking/DepositSection')),
  7: lazy(() => import('../../components/learn/banking/SavingsSection')),
  8: lazy(() => import('../../components/learn/banking/InterestCompareSection')),
  9: lazy(() => import('../../components/learn/banking/TaxFreeSection')),
  10: lazy(() => import('../../components/learn/banking/ISASection')),
  11: lazy(() => import('../../components/learn/banking/CMASection')),
  12: lazy(() => import('../../components/learn/credit/CreditScoreSection')),
  13: lazy(() => import('../../components/learn/credit/PrincipalSection')),
  14: lazy(() => import('../../components/learn/credit/PrincipalInterestSection')),
  15: lazy(() => import('../../components/learn/credit/LoanTypesSection')),
  16: lazy(() => import('../../components/learn/credit/MinusAccountSection')),
  17: lazy(() => import('../../components/learn/credit/DSRSection')),
  18: lazy(() => import('../../components/learn/investment/StocksSection')),
  19: lazy(() => import('../../components/learn/investment/BondsSection')),
  20: lazy(() => import('../../components/learn/investment/ETFSection')),
  21: lazy(() => import('../../components/learn/investment/DividendsSection')),
  22: lazy(() => import('../../components/learn/housing/JeonseVsRentSection')),
  23: lazy(() => import('../../components/learn/housing/PropertyRegisterSection')),
  24: lazy(() => import('../../components/learn/housing/FixedDateSection')),
  25: lazy(() => import('../../components/learn/housing/SubscriptionGraphSection')),
  26: lazy(() => import('../../components/learn/housing/LeaseAgreementSection')),
  27: lazy(() => import('../../components/learn/economy/InflationSection')),
  28: lazy(() => import('../../components/learn/economy/PublicUtilitiesSection')),
};

// 모든 상세 페이지(LearnDetailPage)에 공통 적용할 스타일 가이드
const commonStyles = {
  container: "bg-[#FCF9F5] px-4 py-6 flex flex-col gap-6", // 전체 배경색 및 섹션 간격
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30", // 모든 카드 공통 규격
  title: "text-sm font-bold text-[#4A3F35] mb-4 flex items-center", // 모든 섹션 타이틀 공통
  summaryBar: "border-l-4 border-[#FFEDD5] pl-4 text-xs leading-relaxed" // 요약 텍스트 포인트 바
};

function LearnDetailPage() {
  const { id } = useParams();
  const item = contentData[id];
  const [showIsaTaxTip, setShowIsaTaxTip] = React.useState(false);
  const [showIsaIndustryTip, setShowIsaIndustryTip] = React.useState(false);
  const [showIsaGraphTaxTip, setShowIsaGraphTaxTip] = React.useState(false);
  const [showIsaWarning, setShowIsaWarning] = React.useState(false);

  // video 객체 — videoUrl이 있으면 재생, 없으면 준비중 placeholder 표시
  const video = item
    ? {
        title: item.title,
        description: item.description,
        url: item.videoUrl || 'placeholder',
      }
    : null;

  // 항목별 하단 데이터 섹션
  const renderDataSection = () => {
    if (!item) return null;

    const itemId = parseInt(id);
    const SectionComponent = sectionComponents[itemId];

    if (!SectionComponent) {
      return (
        <div className="px-6 mt-6 pb-10">
          <div className={`${commonStyles.card} text-center`}>
            <p className="text-sm text-[#8B7E74]">
              이 항목의 데이터는 준비 중이에요!
            </p>
          </div>
        </div>
      );
    }

    // ISA(10번)는 추가 props 전달
    const extraProps = itemId === 10 ? {
      showIndustryTip: showIsaIndustryTip,
      setShowIndustryTip: setShowIsaIndustryTip,
      showTaxTip: showIsaGraphTaxTip,
      setShowTaxTip: setShowIsaGraphTaxTip,
      onTipOpen: () => setShowIsaTaxTip(false),
    } : {};

    return (
      <Suspense fallback={<div className="px-6 mt-6 text-center text-xs text-[#8B7E74]">로딩 중...</div>}>
        <SectionComponent {...extraProps} />
      </Suspense>
    );
  };

  const handleBodyClick = () => {
    setShowIsaTaxTip(false);
    setShowIsaIndustryTip(false);
    setShowIsaGraphTaxTip(false);
  };

  return (
    <LearnDetailLayout video={video}>
      <div onClick={handleBodyClick}>
        {/* 공통: 요약 bullet 포인트 */}
        {item && (
          <>

            <div className={`px-6 ${video ? 'pt-8' : 'pt-6'} pb-2`}>
              <div
                className={`bg-[#FFF9F0] rounded-[1.5rem] p-5 border border-[#FFEDD5]/50 ${parseInt(id) === 10 ? 'cursor-pointer relative' : ''}`}
                onClick={(e) => {
                  if (parseInt(id) === 10) {
                    e.stopPropagation();
                    setShowIsaTaxTip(!showIsaTaxTip);
                    setShowIsaIndustryTip(false);
                    setShowIsaGraphTaxTip(false);
                  }
                }}
              >
                {parseInt(id) === 10 && showIsaTaxTip && (
                  <div className="absolute top-4 right-6 bg-[#4A3F35] rounded-lg px-3 py-2 whitespace-nowrap z-20">
                    <p className="text-[11px] text-white tracking-tighter">
                      ISA는 수익에서 손실을 뺀 '순수익'에 대해서만 세금을 계산해서 훨씬 유리해요!
                    </p>
                    <div className="absolute top-full right-3 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-[#4A3F35]"></div>
                  </div>
                )}
                <div className={commonStyles.summaryBar}>
                  <div className="space-y-2">
                    {item.bullets.map((text, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[#4A3F35] font-normal shrink-0">{i + 1}.</span>
                        <span className="text-[#4A3F35] flex-1">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 카테고리별 데이터 영역 (ISA는 그래프를 경고 카드보다 먼저 표시) */}
            {renderDataSection()}

            {/* ISA 전용: 꼭 확인하세요 버튼 */}
            {parseInt(id) === 10 && (
              <div className="px-6 mt-6 pb-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowIsaWarning(!showIsaWarning);
                  }}
                  className="w-full bg-[#FFF9F0] border border-[#FFEDD5] rounded-xl px-4 py-3 flex items-center justify-center hover:bg-[#FFEDD5]/30 transition-colors"
                >
                  <span className="text-sm font-bold text-[#FF8A00]">⚠️ 꼭 확인하세요!!</span>
                </button>

                {showIsaWarning && (
                  <div className="mt-3 bg-white rounded-2xl p-5 shadow-sm border border-[#FFEDD5]/30 space-y-4">
                    {/* 1. 나는 어떤 ISA가 맞을까? */}
                    <div>
                      <h4 className="text-sm font-bold text-[#4A3F35] mb-2"><span className="text-[#059669]">✓</span> 나는 어떤 ISA가 맞을까?</h4>
                      <div className="space-y-2 text-xs text-[#4A3F35]">
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-[#FF8A00] shrink-0">중개형 (강력 추천!):</span>
                          <span>내가 직접 주식이나 ETF를 골라 투자하고 싶을 때.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold shrink-0">신탁형:</span>
                          <span>은행 예적금 위주로 안전하게 굴리고 싶을 때.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold shrink-0">일임형:</span>
                          <span>전문가에게 알아서 굴려달라고 맡기고 싶을 때.</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#FFEDD5]"></div>

                    {/* 2. 돈을 언제 뺄 수 있을까? */}
                    <div>
                      <h4 className="text-sm font-bold text-[#4A3F35] mb-2"><span className="text-[#059669]">✓</span> 돈을 언제 뺄 수 있을까?</h4>
                      <p className="text-xs text-[#4A3F35]">
                        최소 3년은 유지해야 세금 혜택을 다 받을 수 있어요! 급하게 쓸 돈은 신중히 넣어주세요.
                      </p>
                    </div>

                    <div className="border-t border-[#FFEDD5]"></div>

                    {/* 3. 비과세 한도가 얼마일까? */}
                    <div>
                      <h4 className="text-sm font-bold text-[#4A3F35] mb-2"><span className="text-[#059669]">✓</span> 비과세 한도가 얼마일까?</h4>
                      <div className="space-y-1 text-xs text-[#4A3F35]">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#FF8A00]">일반형:</span>
                          <span>200만 원까지 수익에 대해 세금을 한 푼도 안 내요!</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#FF8A00]">서민형:</span>
                          <span>400만 원까지 수익에 대해 세금을 한 푼도 안 내요!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </LearnDetailLayout>
  );
}

export default LearnDetailPage;
