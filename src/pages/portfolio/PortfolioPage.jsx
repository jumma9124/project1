import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// HTML 이스케이프 함수 (XSS 방지)
const escapeHtml = (str) => {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, (c) => map[c]);
};

// 자산 클래스별 정보
const assetInfo = {
  현금: { color: '#10B981', icon: '💵' },
  채권: { color: '#3B82F6', icon: '📜' },
  주식: { color: '#EF4444', icon: '📈' },
  ETF: { color: '#F59E0B', icon: '🧺' },
  달러: { color: '#10B981', icon: '💵' },
  기타: { color: '#8B5CF6', icon: '💎' },
};

function PortfolioPage() {
  const navigate = useNavigate();
  const chartRef = useRef(null);

  // 사용자 자산 목록
  const [assets, setAssets] = useState([
    { id: 1, type: '주식', name: '삼성전자', amount: 5000000 },
    { id: 2, type: '채권', name: '국고채', amount: 3000000 },
    { id: 3, type: '현금', name: '예금', amount: 2000000 },
  ]);

  const [isRebalancing, setIsRebalancing] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // 자산 추가
  const addAsset = () => {
    const newAsset = {
      id: Date.now(),
      type: '주식',
      name: '',
      amount: 0,
    };
    setAssets([...assets, newAsset]);
  };

  // 자산 삭제
  const deleteAsset = (id) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  // 자산 수정
  const updateAsset = (id, field, value) => {
    setIsRebalancing(true);
    setAssets(assets.map(asset =>
      asset.id === id ? { ...asset, [field]: value } : asset
    ));

    setTimeout(() => {
      setIsRebalancing(false);
    }, 300);
  };

  // 총 자산 계산
  const totalAmount = assets.reduce((sum, asset) => sum + Number(asset.amount || 0), 0);

  // 자산 종류별 합계 및 비중 계산
  const calculateAllocation = () => {
    const allocation = {};

    assets.forEach(asset => {
      if (!allocation[asset.type]) {
        allocation[asset.type] = 0;
      }
      allocation[asset.type] += Number(asset.amount || 0);
    });

    const allocationWithPercentage = {};
    Object.entries(allocation).forEach(([type, amount]) => {
      allocationWithPercentage[type] = {
        amount,
        percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0,
      };
    });

    return allocationWithPercentage;
  };

  const allocation = calculateAllocation();

  // 도넛 차트용 각도 계산
  const calculateAngles = () => {
    let startAngle = 0;
    const segments = [];

    Object.entries(allocation).forEach(([type, data]) => {
      if (data.percentage > 0) {
        const angle = (data.percentage / 100) * 360;
        segments.push({
          type,
          startAngle,
          endAngle: startAngle + angle,
          percentage: data.percentage,
          amount: data.amount,
          ...assetInfo[type],
        });
        startAngle += angle;
      }
    });

    return segments;
  };

  const segments = calculateAngles();

  // SVG 경로 생성
  const createArc = (startAngle, endAngle, innerRadius = 70, outerRadius = 100) => {
    const start = polarToCartesian(100, 100, outerRadius, endAngle);
    const end = polarToCartesian(100, 100, outerRadius, startAngle);
    const innerStart = polarToCartesian(100, 100, innerRadius, endAngle);
    const innerEnd = polarToCartesian(100, 100, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      'L', innerEnd.x, innerEnd.y,
      'A', innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // 포트폴리오 타입 판별
  const getPortfolioType = () => {
    const stockPercentage = allocation['주식']?.percentage || 0;
    if (stockPercentage >= 60) return '성장 추구형';
    if (stockPercentage >= 30) return '밸런스형';
    return '안정 지향형';
  };

  // 리스크 레벨 계산
  const getRiskLevel = () => {
    const riskAssets = (allocation['주식']?.percentage || 0) + (allocation['ETF']?.percentage || 0);
    if (riskAssets >= 70) return { level: '고위험', color: '#DC2626' };
    if (riskAssets >= 40) return { level: '중위험', color: '#F59E0B' };
    return { level: '저위험', color: '#10B981' };
  };

  // 자산 역할 설명
  const getAssetRole = (type) => {
    const roles = {
      '주식': '자산 증식 (고수익 추구)',
      '채권': '안전판 (안정적 수익)',
      'ETF': '분산 투자 (리스크 관리)',
      '현금': '유동성 확보 (비상 자금)',
      '달러': '경제 위기 방어 및 환차익 추구',
      '기타': '대체 투자 (포트폴리오 다각화)',
    };
    return roles[type] || '기타 자산';
  };

  // 미래 자산 예측 (연 5% 수익, 10년)
  const getFutureValue = () => {
    const rate = 0.05;
    const years = 10;
    return totalAmount * Math.pow(1 + rate, years);
  };

  // PDF 생성
  const generatePDF = async () => {
    setIsGeneratingPDF(true);

    try {
      const today = new Date();
      const dateStr = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const reportNumber = `WMR-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-001`;

      const portfolioType = getPortfolioType();
      const riskInfo = getRiskLevel();
      const futureValue = getFutureValue();

      // 달러 비중 체크
      const dollarPercentage = allocation['달러']?.percentage || 0;
      const hasForeignAssets = dollarPercentage >= 10;

      // 자산 종류 개수에 따라 페이지 나눔 여백 계산
      const assetTypeCount = Object.entries(allocation).filter(([_, data]) => data.percentage > 0).length;
      const pageBreakMargin = Math.max(100, 600 - (assetTypeCount * 80));

      // PDF용 HTML 컨텐츠 생성
      const pdfContent = document.createElement('div');
      pdfContent.style.width = '800px';
      pdfContent.style.padding = '50px';
      pdfContent.style.backgroundColor = '#ffffff';
      pdfContent.style.fontFamily = "'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";
      pdfContent.style.position = 'absolute';
      pdfContent.style.left = '-9999px';
      pdfContent.style.printColorAdjust = 'exact';
      pdfContent.style.webkitPrintColorAdjust = 'exact';

      // 차트(SVG)만 복제하고 범례는 제외
      let chartHTML = '';
      if (chartRef.current) {
        const svgElement = chartRef.current.querySelector('svg');
        if (svgElement) {
          chartHTML = `<div style="display: flex; justify-content: center;">${svgElement.outerHTML}</div>`;
        }
      }

      pdfContent.innerHTML = `
        <style>
          * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .num-label { position: relative; top: 2px; }
        </style>

        <!-- Header -->
        <div style="border-bottom: 3px solid #1E293B; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #1E293B, #475569); border-radius: 8px; margin-bottom: 10px;"></div>
            <h1 style="font-size: 24px; font-weight: 700; color: #1E293B; margin: 0;">Wealth Management Report</h1>
            <p style="font-size: 13px; color: #64748B; margin: 5px 0 0 0;">자산 관리 보고서</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 11px; color: #64748B; margin: 0 0 5px 0;">Report No.</p>
            <p style="font-size: 13px; font-weight: 600; color: #1E293B; margin: 0 0 10px 0;">${reportNumber}</p>
            <p style="font-size: 11px; color: #64748B; margin: 0;">${dateStr}</p>
          </div>
        </div>

        <!-- Section 1: 요약 -->
        <div style="background: linear-gradient(135deg, #F8FAFC, #F1F5F9); border-left: 4px solid #C9A85C; padding: 25px; margin-bottom: 30px; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <div>
              <p style="font-size: 12px; color: #64748B; margin: 0 0 5px 0;">포트폴리오 유형</p>
              <h2 style="font-size: 22px; font-weight: 700; color: #1E293B; margin: 0;">${portfolioType}</h2>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 12px; color: #64748B; margin: 0 0 5px 0;">총 자산</p>
              <h2 style="font-size: 28px; font-weight: 700; color: #C9A85C; margin: 0;" class="num-label">${totalAmount.toLocaleString('ko-KR')}<span style="font-size: 16px;">원</span></h2>
            </div>
          </div>
          ${hasForeignAssets ? `
          <div style="background: linear-gradient(135deg, #ECFDF5, #D1FAE5); border: 1px solid #10B981; border-radius: 6px; padding: 12px; margin-top: 15px;">
            <p style="font-size: 12px; color: #065F46; margin: 0; font-weight: 600;">✓ 외화 자산을 통한 리스크 분산이 우수합니다</p>
          </div>
          ` : ''}
        </div>

        <!-- Section 2: 시각 분석 -->
        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #1E293B; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #E2E8F0;">자산 배분 현황</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px;">
            <div style="transform: scale(0.95); transform-origin: center; padding: 10px 0;">
              ${chartHTML}
            </div>
            <div>
              <h4 style="font-size: 14px; font-weight: 700; color: #1E293B; margin: 0 0 15px 0;">자산별 역할</h4>
              ${Object.entries(allocation).filter(([_, data]) => data.percentage > 0).map(([type, data]) => `
                <div style="margin-bottom: 12px; padding: 14px; background: #F8FAFC; border-radius: 8px; border-left: 4px solid ${assetInfo[type]?.color};">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                    <span style="font-size: 14px; font-weight: 700; color: #1E293B;">${type}</span>
                    <div style="display: flex; align-items: baseline; gap: 8px;">
                      <span style="font-size: 16px; font-weight: 700; color: #1E293B;" class="num-label">${data.amount.toLocaleString('ko-KR')}원</span>
                      <span style="font-size: 12px; font-weight: 500; color: #94A3B8;" class="num-label">${data.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <p style="font-size: 11px; color: #64748B; margin: 0;">${getAssetRole(type)}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Section 3: 상세 내역 (새 페이지) -->
        <div style="margin-top: ${pageBreakMargin}px; margin-bottom: 30px; padding-top: 30px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #1E293B; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #E2E8F0;">자산 세부 내역</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #1E293B;">
                <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #ffffff; border: 1px solid #334155;">No.</th>
                <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #ffffff; border: 1px solid #334155;">자산 종류</th>
                <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #ffffff; border: 1px solid #334155;">자산명</th>
                <th style="padding: 12px; text-align: right; font-size: 12px; font-weight: 600; color: #ffffff; border: 1px solid #334155;">금액</th>
                <th style="padding: 12px; text-align: right; font-size: 12px; font-weight: 600; color: #ffffff; border: 1px solid #334155;">비중</th>
              </tr>
            </thead>
            <tbody>
              ${assets.map((asset, index) => {
                const percentage = totalAmount > 0 ? (asset.amount / totalAmount * 100).toFixed(1) : 0;
                const isDollar = asset.type === '달러';
                return `
                <tr style="background: ${index % 2 === 0 ? '#F8FAFC' : '#ffffff'};">
                  <td style="padding: 10px; font-size: 12px; color: #64748B; border: 1px solid #E2E8F0;">${index + 1}</td>
                  <td style="padding: 10px; font-size: 12px; color: #1E293B; font-weight: 600; border: 1px solid #E2E8F0;">${escapeHtml(asset.type)}${isDollar ? ' ($)' : ''}</td>
                  <td style="padding: 10px; font-size: 12px; color: #475569; border: 1px solid #E2E8F0;">${escapeHtml(asset.name)}</td>
                  <td style="padding: 10px; font-size: 12px; color: #1E293B; font-weight: 600; text-align: right; border: 1px solid #E2E8F0;" class="num-label">${Number(asset.amount).toLocaleString('ko-KR')}원</td>
                  <td style="padding: 10px; font-size: 13px; color: ${assetInfo[asset.type]?.color}; font-weight: 700; text-align: right; border: 1px solid #E2E8F0;" class="num-label">${percentage}%</td>
                </tr>
              `}).join('')}
              <tr style="background: #F1F5F9; border-top: 2px solid #1E293B;">
                <td colspan="3" style="padding: 12px; font-size: 14px; color: #1E293B; font-weight: 700; border: 1px solid #E2E8F0;">총 자산</td>
                <td colspan="2" style="padding: 12px; font-size: 15px; color: #C9A85C; font-weight: 700; text-align: right; border: 1px solid #E2E8F0;" class="num-label">${totalAmount.toLocaleString('ko-KR')}원</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 리스크 진단 & 미래 시뮬레이션 -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div style="background: #FFF7ED; border: 1px solid #FDBA74; border-radius: 8px; padding: 20px;">
            <h4 style="font-size: 14px; font-weight: 700; color: #1E293B; margin: 0 0 10px 0;">리스크 진단</h4>
            <p style="font-size: 12px; color: #64748B; margin: 0 0 8px 0;">현재 포트폴리오의 위험도는</p>
            <p style="font-size: 20px; font-weight: 700; color: ${riskInfo.color}; margin: 0;" class="num-label">${riskInfo.level}</p>
            <p style="font-size: 11px; color: #64748B; margin: 8px 0 0 0;">수준입니다</p>
          </div>
          <div style="background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 8px; padding: 20px;">
            <h4 style="font-size: 14px; font-weight: 700; color: #1E293B; margin: 0 0 10px 0;">미래 시뮬레이션</h4>
            <p style="font-size: 12px; color: #64748B; margin: 0 0 8px 0;">연 5% 수익 가정 시, 10년 뒤</p>
            <p style="font-size: 18px; font-weight: 700; color: #10B981; margin: 0;" class="num-label">${Math.round(futureValue).toLocaleString('ko-KR')}원</p>
            <p style="font-size: 11px; color: #64748B; margin: 8px 0 0 0;">예상 자산 규모</p>
          </div>
        </div>

        <!-- Disclaimer -->
        <div style="background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 15px; margin-top: 40px;">
          <p style="font-size: 9px; color: #94A3B8; line-height: 1.6; margin: 0;">
            <strong>면책 조항:</strong> 본 보고서는 정보 제공 목적으로 작성되었으며, 투자 권유나 법적 조언을 의도하지 않습니다.
            투자 결정은 본인의 판단과 책임 하에 이루어져야 하며, 과거 수익률이 미래 수익을 보장하지 않습니다.
            본 보고서에 포함된 시뮬레이션 및 예측치는 가정에 기반한 것으로 실제 결과와 다를 수 있습니다.
          </p>
        </div>
      `;

      // 임시로 DOM에 추가
      document.body.appendChild(pdfContent);

      // HTML을 이미지로 변환 (고해상도)
      const canvas = await html2canvas(pdfContent, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // DOM에서 제거
      document.body.removeChild(pdfContent);

      // PDF 생성
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // 첫 페이지
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // 추가 페이지가 필요한 경우
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // PDF 저장
      pdf.save(`Wealth_Report_${reportNumber}.pdf`);
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col max-w-screen-sm mx-auto">
      {/* 헤더 */}
      <header className="mx-4 mt-4 py-4 px-4 rounded-2xl flex items-center justify-between">
        <div className="w-6 h-6" />
        <h1 className="text-xl text-[#3E2C1C]">Portfolio</h1>
        <button onClick={() => navigate(-1)} className="text-[#8B7E74] text-xs">
          닫기
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-y-auto px-4 pb-10 mt-4">
        <div className="space-y-4">
          {/* 타이틀 카드 */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
            <div className="text-center">
              <div className="text-4xl mb-2">🧺</div>
              <h2 className="text-lg font-bold text-[#3E2C1C] mb-1">
                나의 황금 바구니 짜기
              </h2>
              <p className="text-xs text-[#8B7E74]">
                나만의 자산을 관리하고 포트폴리오를 구성해보세요
              </p>
            </div>
          </div>

          {/* 자산 입력 섹션 */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8DDD3]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#3E2C1C]">
                📝 내 자산 입력
              </h3>
              <button
                onClick={addAsset}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 text-xs font-bold transition-colors flex items-center gap-1"
              >
                <span>➕</span>
                <span>자산 추가</span>
              </button>
            </div>

            {/* 자산 목록 */}
            <div className="space-y-2">
              {assets.map((asset) => (
                <div key={asset.id} className="bg-[#FFF8F0] rounded-xl p-3 border border-[#E8DDD3]">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    {/* 자산 종류 */}
                    <div className="col-span-3">
                      <select
                        value={asset.type}
                        onChange={(e) => updateAsset(asset.id, 'type', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-[#E8DDD3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        {Object.keys(assetInfo).map((type) => (
                          <option key={type} value={type}>
                            {assetInfo[type].icon} {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 자산명 */}
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={asset.name}
                        onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                        placeholder="자산명"
                        className="w-full px-2 py-1.5 text-xs border border-[#E8DDD3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    {/* 금액 */}
                    <div className="col-span-4">
                      <input
                        type="number"
                        value={asset.amount || ''}
                        onChange={(e) => updateAsset(asset.id, 'amount', e.target.value)}
                        placeholder={asset.type === '달러' ? '환산금액 (원화)' : '금액'}
                        className="w-full px-2 py-1.5 text-xs border border-[#E8DDD3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {asset.type === '달러' && (
                        <p className="text-[9px] text-[#10B981] mt-0.5">💱 환율 1,350원 기준</p>
                      )}
                    </div>

                    {/* 삭제 버튼 */}
                    <div className="col-span-1">
                      <button
                        onClick={() => deleteAsset(asset.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 총 자산 */}
            <div className="mt-3 pt-3 border-t border-[#E8DDD3]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#3E2C1C]">총 자산</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-blue-600 relative top-[2px]">
                    {totalAmount.toLocaleString('ko-KR')}
                  </span>
                  <span className="text-xs text-[#8B7E74]">원</span>
                </div>
              </div>
            </div>
          </div>

          {/* 도넛 차트 */}
          <div ref={chartRef} className="bg-white rounded-2xl p-6 border border-[#E8DDD3]">
            <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 text-center">
              📊 자산 배분 현황
            </h3>

            {/* SVG 도넛 차트 */}
            {totalAmount > 0 ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <svg
                      width="200"
                      height="200"
                      viewBox="0 0 200 200"
                      className={`transform transition-all duration-500 ${
                        isRebalancing ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                      }`}
                    >
                      {segments.map((segment, index) => (
                        <path
                          key={`${segment.type}-${index}`}
                          d={createArc(segment.startAngle, segment.endAngle)}
                          fill={segment.color}
                          className="transition-all duration-500"
                          style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                          }}
                        />
                      ))}
                      {/* 중앙 흰색 원 */}
                      <circle cx="100" cy="100" r="65" fill="#FFF8F0" />
                      {/* 중앙 텍스트 */}
                      <text
                        x="100"
                        y="88"
                        textAnchor="middle"
                        className="text-xs fill-[#8B7E74]"
                      >
                        Total
                      </text>
                      <text
                        x="100"
                        y="115"
                        textAnchor="middle"
                        className="text-2xl font-bold fill-[#3E2C1C]"
                      >
                        100%
                      </text>
                    </svg>
                  </div>
                </div>

                {/* 범례 */}
                <div className="space-y-2">
                  {segments.map((segment, index) => (
                    <div
                      key={`legend-${segment.type}-${index}`}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-500 ${
                        isRebalancing ? 'opacity-50' : 'opacity-100'
                      }`}
                      style={{
                        backgroundColor: segment.color + '10',
                        borderColor: segment.color + '40',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{segment.icon}</span>
                        <span className="text-sm font-bold text-[#3E2C1C]">
                          {segment.type}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-baseline gap-1">
                          <span
                            className="text-lg font-bold relative top-[2px]"
                            style={{ color: segment.color }}
                          >
                            {segment.percentage.toFixed(1)}
                          </span>
                          <span className="text-xs text-[#8B7E74]">%</span>
                        </div>
                        <span className="text-xs text-[#8B7E74]">
                          {segment.amount.toLocaleString('ko-KR')}원
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-[#8B7E74] text-sm">
                자산을 입력하면 차트가 표시됩니다
              </div>
            )}
          </div>

          {/* PDF 다운로드 버튼 */}
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF || totalAmount === 0}
            className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-4 px-6 font-bold transition-all shadow-md ${
              isGeneratingPDF || totalAmount === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">📄</span>
              <span>{isGeneratingPDF ? 'PDF 생성 중...' : '나의 투자 포트폴리오 저장하기 (PDF)'}</span>
            </div>
          </button>

          {/* 데이터 안내 문구 */}
          <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
            <p className="text-xs text-center text-[#8B7E74]">
              ⚠️ 입력하신 데이터는 기기에만 일시적으로 저장되며, 페이지를 새로고침하면 사라집니다
            </p>
          </div>

          {/* 추가 정보 */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8DDD3]">
            <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
              📚 포트폴리오 관리 팁
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold relative top-[2px]">1.</span>
                <p className="text-sm text-[#5C4A3A]">
                  <span className="font-bold text-[#2563EB]">정기적인 점검:</span> 최소 분기마다 한 번씩 포트폴리오를 확인하세요
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold relative top-[2px]">2.</span>
                <p className="text-sm text-[#5C4A3A]">
                  <span className="font-bold text-[#2563EB]">목표 비중 유지:</span> 시장 변동으로 비중이 크게 벗어나면 리밸런싱하세요
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold relative top-[2px]">3.</span>
                <p className="text-sm text-[#5C4A3A]">
                  <span className="font-bold text-[#2563EB]">장기 투자:</span> 단기 변동에 흔들리지 말고 장기 목표를 유지하세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
