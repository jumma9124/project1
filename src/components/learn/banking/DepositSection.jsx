import React from 'react';

const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

// ── 이자 계산 상수 ──
const PRINCIPAL = 10_000_000;
const RATE = 0.035;
const TAX_RATE = 0.154;

const periods = [
  { label: '6개월', months: 6 },
  { label: '1년', months: 12 },
  { label: '2년', months: 24 },
];

const interestData = periods.map(({ label, months }) => {
  const gross = Math.round(PRINCIPAL * RATE * (months / 12));
  const tax = Math.round(gross * TAX_RATE);
  const net = gross - tax;
  return { label, months, gross, net };
});

const maxGross = interestData[interestData.length - 1].gross;

// ── 금융감독원 금융상품통합비교공시 API (Vite 프록시 경유) ──
const FINLIFE_BASE = '/finlifeapi';

function DepositSection() {
  const fmt = (n) => n.toLocaleString();

  // ── API 연동 로직 (인증키 발급 후 활성화 예정) ──
  /*
  const [topRates, setTopRates] = useState([]);
  const [rateLoading, setRateLoading] = useState(true);
  const [rateError, setRateError] = useState(false);

  useEffect(() => {
    const fetchDepositRates = async () => {
      try {
        const apiKey = import.meta.env.VITE_FINLIFE_API_KEY;
        if (!apiKey) {
          setRateError(true);
          return;
        }

        const url = `${FINLIFE_BASE}/depositProductsSearch.json?auth=${apiKey}&topFinGrpNo=020000&pageNo=1`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const baseList = data.result?.baseList || [];
        const optionList = data.result?.optionList || [];

        const baseMap = {};
        baseList.forEach((b) => {
          baseMap[`${b.fin_co_no}_${b.fin_prdt_cd}`] = b;
        });

        const filtered = optionList
          .filter((o) => String(o.save_trm) === '12' && o.intr_rate2 != null)
          .sort((a, b) => parseFloat(b.intr_rate2) - parseFloat(a.intr_rate2));

        const seen = new Set();
        const unique = [];
        for (const opt of filtered) {
          const base = baseMap[`${opt.fin_co_no}_${opt.fin_prdt_cd}`];
          const bankName = base?.kor_co_nm || '알 수 없음';
          if (!seen.has(bankName)) {
            seen.add(bankName);
            unique.push({
              bank: bankName,
              product: base?.fin_prdt_nm || '',
              baseRate: parseFloat(opt.intr_rate || 0),
              topRate: parseFloat(opt.intr_rate2 || 0),
            });
          }
          if (unique.length >= 5) break;
        }

        setTopRates(unique);
      } catch (err) {
        console.error('정기예금 API 연동 실패:', err);
        setRateError(true);
      } finally {
        setRateLoading(false);
      }
    };

    fetchDepositRates();
  }, []);

  const maxTopRate = topRates.length > 0
    ? Math.max(...topRates.map((d) => d.topRate))
    : 0;
  */

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 예금이란? ── */}
      <div className={commonStyles.card}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-4">예금이란?</h3>

        <div className="bg-[#EFF6FF] rounded-2xl p-5 flex flex-col items-center text-center mb-4">
          <span className="text-3xl mb-2">🏦</span>
          <p className="text-[12px] font-bold text-[#2563EB] mb-1.5">정기예금</p>
          <p className="text-[10px] text-[#4A3F35] leading-relaxed">
            <span className="font-bold text-[#2563EB]">목돈</span>을 은행에 맡기고<br />
            정해진 기간이 지나면<br />
            <span className="font-bold text-[#2563EB]">원금 + 이자</span>를 돌려받는 상품이에요
          </p>
        </div>

        {/* 가입 흐름 */}
        <p className="text-[11px] font-bold text-[#4A3F35] mb-2">예금은 이렇게 진행돼요</p>
        <div className="flex items-center gap-1.5 text-[10px]">
          <div className="bg-[#FFF9F0] rounded-lg px-2.5 py-2.5 text-center flex-1 border border-[#FFEDD5]/50">
            <p className="font-bold text-[#FF8A00]">STEP 1</p>
            <p className="text-[#4A3F35] mt-0.5">목돈 입금</p>
          </div>
          <span className="text-[#8B7E74] font-bold shrink-0">→</span>
          <div className="bg-[#FFF9F0] rounded-lg px-2.5 py-2.5 text-center flex-1 border border-[#FFEDD5]/50">
            <p className="font-bold text-[#FF8A00]">STEP 2</p>
            <p className="text-[#4A3F35] mt-0.5">약정 기간 유지</p>
          </div>
          <span className="text-[#8B7E74] font-bold shrink-0">→</span>
          <div className="bg-[#F0FDF4] rounded-lg px-2.5 py-2.5 text-center flex-1 border border-[#059669]/20">
            <p className="font-bold text-[#059669]">STEP 3</p>
            <p className="text-[#4A3F35] mt-0.5">원금+이자 수령</p>
          </div>
        </div>
      </div>

      {/* ── 실시간 정기예금 금리 TOP 5 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">12개월 정기예금 금리 TOP 5</h3>
        <p className="text-[11px] text-[#8B7E74] mb-4">최고 우대금리 기준, 은행권</p>

        <div className="py-8 text-center">
          <p className="text-xs text-[#8B7E74]">금리 데이터를 불러올 수 없어요.</p>
        </div>
      </div>

      {/* ── 기간별 이자 막대 그래프 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-1">1,000만원을 예금하면 이자가 얼마일까?</h3>
        <p className="text-[11px] text-[#8B7E74] mb-5">연 3.5% 단리 기준, 기간별 세전·세후 이자</p>

        <div className="flex items-end justify-center gap-6 mb-4" style={{ height: '200px' }}>
          {interestData.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#2563EB]">{fmt(d.gross)}원</span>
              <span className="text-[9px] text-[#8B7E74]">세후 {fmt(d.net)}원</span>
              <div
                className="w-14 bg-gradient-to-t from-[#2563EB] to-[#60A5FA] rounded-t-xl relative"
                style={{ height: `${Math.max(24, Math.round((d.gross / maxGross) * 130))}px` }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#2563EB]/30 rounded-t-xl"
                  style={{ height: `${Math.round(((d.gross - d.net) / d.gross) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-[#4A3F35]">{d.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#FFF9F0] rounded-xl px-4 py-3 border border-[#FFEDD5]/50">
          <p className="text-[11px] text-[#4A3F35] leading-relaxed text-center">
            이자에는 <span className="font-bold text-[#DC2626]">15.4%</span>의 이자소득세가 붙어요.<br />
            <span className="text-[10px] text-[#8B7E74]">예) 1년 이자 350,000원 → 세금 53,900원 → 실수령 296,100원</span>
          </p>
        </div>
      </div>

      {/* ── 예금 종류 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">예금의 종류</h3>

        <div className="space-y-3">
          <div className="bg-[#EFF6FF] rounded-xl px-4 py-3">
            <p className="text-[11px] font-bold text-[#2563EB] mb-1">정기예금</p>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              목돈을 정해진 기간(6개월~3년) 동안 맡기는 상품이에요. 금리가 높지만 중간에 빼면 이자가 크게 줄어요.
            </p>
          </div>

          <div className="bg-[#EFF6FF] rounded-xl px-4 py-3">
            <p className="text-[11px] font-bold text-[#2563EB] mb-1">자유입출금 예금</p>
            <p className="text-[11px] text-[#4A3F35] leading-relaxed">
              언제든 넣고 뺄 수 있는 통장이에요. 편리하지만 이자가 거의 없어서 생활비 관리용으로 적합해요.
            </p>
          </div>
        </div>
      </div>

      {/* ── 꿀팁 체크 카드 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <h3 className="text-sm font-bold text-[#4A3F35] mb-3">예금 가입 전 꼭 알아두세요!</h3>

        <div className="space-y-3">
          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">중도해지 = 이자 손해</span> — 만기 전에 빼면 약속한 금리가 아닌 아주 낮은 금리가 적용돼요. 급하게 쓸 돈은 넣지 마세요!
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">예금자보호 5,000만원</span> — 은행이 망해도 1인당 5,000만원까지는 보호받을 수 있어요. 큰 금액은 나눠서 넣는 것도 방법!
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">금리 비교는 필수</span> — 같은 예금이라도 은행마다 금리가 달라요. 인터넷은행이나 저축은행이 시중은행보다 금리가 높은 경우가 많아요.
            </p>
          </div>

          <div className="bg-[#F0FDF4] rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-[#059669] font-bold text-sm mt-0.5 shrink-0">✓</span>
            <p className="text-xs text-[#4A3F35] leading-relaxed">
              <span className="font-bold">자동 재예치 확인</span> — 만기 후 자동으로 재가입되는 설정이 있는지 확인하세요. 금리가 바뀔 수 있어요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositSection;
