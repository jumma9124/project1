import React from 'react';
import { useParams } from 'react-router-dom';
import LearnDetailLayout from './LearnDetailLayout';
import contentData from '../../data/contentData';

// 카테고리1: 세금과 월급
import SalaryPayslipSection from '../../components/learn/salary/SalaryPayslipSection';
import NetPayCalculatorSection from '../../components/learn/salary/NetPayCalculatorSection';
import YearEndTaxSection from '../../components/learn/salary/YearEndTaxSection';
import DeductionCompareSection from '../../components/learn/salary/DeductionCompareSection';
import ExpenseTrackerSection from '../../components/learn/salary/ExpenseTrackerSection';

// 카테고리2: 은행과 저축
import DepositSection from '../../components/learn/banking/DepositSection';
import SavingsSection from '../../components/learn/banking/SavingsSection';
import InterestCompareSection from '../../components/learn/banking/InterestCompareSection';
import TaxFreeSection from '../../components/learn/banking/TaxFreeSection';
import CMASection from '../../components/learn/banking/CMASection';
import ISASection from '../../components/learn/banking/ISASection';

// 카테고리3: 대출
import CreditScoreSection from '../../components/learn/credit/CreditScoreSection';
import PrincipalSection from '../../components/learn/credit/PrincipalSection';
import PrincipalInterestSection from '../../components/learn/credit/PrincipalInterestSection';
import LoanTypesSection from '../../components/learn/credit/LoanTypesSection';
import MinusAccountSection from '../../components/learn/credit/MinusAccountSection';
import DSRSection from '../../components/learn/credit/DSRSection';

// 카테고리4: 투자
import StocksSection from '../../components/learn/investment/StocksSection';
import BondsSection from '../../components/learn/investment/BondsSection';
import ETFSection from '../../components/learn/investment/ETFSection';
import DividendsSection from '../../components/learn/investment/DividendsSection';

// 카테고리5: 부동산
import JeonseVsRentSection from '../../components/learn/housing/JeonseVsRentSection';
import PropertyRegisterSection from '../../components/learn/housing/PropertyRegisterSection';
import FixedDateSection from '../../components/learn/housing/FixedDateSection';
import SubscriptionGraphSection from '../../components/learn/housing/SubscriptionGraphSection';
import LeaseAgreementSection from '../../components/learn/housing/LeaseAgreementSection';

// 카테고리6: 경제 환경
import InflationSection from '../../components/learn/economy/InflationSection';
import PublicUtilitiesSection from '../../components/learn/economy/PublicUtilitiesSection';

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

    switch (itemId) {
      case 1:
        // 세전/세후 → 가상 급여명세서
        return <SalaryPayslipSection />;
      case 2:
        // 실수령액 → 실수령액 계산기
        return <NetPayCalculatorSection />;
      case 3:
        // 연말정산 → 환급 결과 카드
        return <YearEndTaxSection />;
      case 4:
        // 소득공제/세액공제 → 개념 비교
        return <DeductionCompareSection />;
      case 5:
        // 고정지출/변동지출 → 지출 트래커
        return <ExpenseTrackerSection />;
      case 6:
        // 예금 → 예금 소개 + 이자 계산
        return <DepositSection />;
      case 7:
        // 적금 → 적금 소개 + 누적 차트
        return <SavingsSection />;
      case 8:
        // 단리 vs 복리 → 라인 차트 + 슬라이더
        return <InterestCompareSection />;
      case 9:
        // 비과세 → 세금 비교 시각화
        return <TaxFreeSection />;
      case 10:
        // ISA → 수익률 및 가입현황
        return <ISASection
          showIndustryTip={showIsaIndustryTip}
          setShowIndustryTip={setShowIsaIndustryTip}
          showTaxTip={showIsaGraphTaxTip}
          setShowTaxTip={setShowIsaGraphTaxTip}
          onTipOpen={() => setShowIsaTaxTip(false)}
        />;
      case 11:
        // CMA/파킹통장 → 일일 이자 계산 + 금리 비교
        return <CMASection />;
      case 12:
        // 신용점수 → 게이지 차트 + 변동 요인
        return <CreditScoreSection />;
      case 13:
        // 원금 → 비교 시각화 + 수어 피드백
        return <PrincipalSection />;
      case 14:
        // 원리금 → 공식 시각화 + 월 납부액 계산
        return <PrincipalInterestSection />;
      case 15:
        // 대출의 종류 → 탭 UI + 사회초년생 맞춤 설명
        return <LoanTypesSection />;
      case 16:
        // 마이너스 통장 → 탭 UI + 이자 계산 + 주의사항
        return <MinusAccountSection />;
      case 17:
        // DSR → 탭 UI + 40% 법칙 + 합산 대출
        return <DSRSection />;
      case 18:
        // 주식 → 탭 UI + 피자 조각 비유 + 수익 구조
        return <StocksSection />;
      case 19:
        // 채권 → 탭 UI + 차용증 비유 + 저울 UI 비교
        return <BondsSection />;
      case 20:
        // ETF → 탭 UI + 뷔페 접시 비유 + 바구니 들여다보기 인터랙션
        return <ETFSection />;
      case 21:
        // 배당금 → 탭 UI + 나무 비유 + 배당금 계산기 + 코스 완주 축하
        return <DividendsSection />;
      case 22:
        // 전세 vs 월세 → 비교 시뮬레이터 + 장단점 비교
        return <JeonseVsRentSection />;
      case 23:
        // 등기부등본 → 탭 UI + 위험 단어 찾기 + 안전 진단기
        return <PropertyRegisterSection />;
      case 24:
        // 확정일자 → 전입신고 vs 확정일자 비교 + 체크리스트 + 효력 발생일 계산기
        return <FixedDateSection />;
      case 25:
        // 주택청약 → 지역별 청약 막대 그래프
        return <SubscriptionGraphSection />;
      case 26:
        // 임대차계약서 → 인터랙티브 계약서 뷰어 + 특약 복사 + 최종 체크리스트
        return <LeaseAgreementSection />;
      case 27:
        // 인플레이션 → 물가 상승 시각화 + 투표 버튼
        return <InflationSection />;
      case 28:
        // 공공요금 → 가상 고지서 UI + 자동이체 투표
        return <PublicUtilitiesSection />;
      default:
        // 나머지 항목: 기본 안내 UI
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
