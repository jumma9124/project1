import { useState, useEffect } from 'react';

/**
 * Yahoo Finance API를 통해 한국 시장 지수 데이터를 가져오는 커스텀 훅
 *
 * KOSPI: ^KS11
 * KOSDAQ: ^KQ11
 */
const useMarketData = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock 데이터 (API 실패 시 폴백용)
  const mockData = {
    kospi: {
      name: '코스피',
      value: 2567.89,
      changeRate: 1.23,
      changeValue: 31.2,
    },
    kosdaq: {
      name: '코스닥',
      value: 745.32,
      changeRate: -0.87,
      changeValue: -6.5,
    },
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);

        // Yahoo Finance API 엔드포인트
        // Vite proxy를 통해 CORS 이슈 해결
        const symbols = ['^KS11', '^KQ11']; // KOSPI, KOSDAQ

        const fetchPromises = symbols.map(async (symbol) => {
          const isDev = import.meta.env.DEV;
          const url = isDev
            ? `/api/yahoo/v8/finance/chart/${symbol}?interval=1d&range=1d`
            : `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`)}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Failed to fetch ${symbol}`);
          }

          return response.json();
        });

        const [kospiResponse, kosdaqResponse] = await Promise.all(fetchPromises);

        // KOSPI 데이터 파싱
        const kospiQuote = kospiResponse.chart.result[0].meta;
        const kospiPreviousClose = kospiQuote.chartPreviousClose || kospiQuote.previousClose;
        const kospiCurrentPrice = kospiQuote.regularMarketPrice;
        const kospiChange = kospiCurrentPrice - kospiPreviousClose;
        const kospiChangePercent = (kospiChange / kospiPreviousClose) * 100;

        // KOSDAQ 데이터 파싱
        const kosdaqQuote = kosdaqResponse.chart.result[0].meta;
        const kosdaqPreviousClose = kosdaqQuote.chartPreviousClose || kosdaqQuote.previousClose;
        const kosdaqCurrentPrice = kosdaqQuote.regularMarketPrice;
        const kosdaqChange = kosdaqCurrentPrice - kosdaqPreviousClose;
        const kosdaqChangePercent = (kosdaqChange / kosdaqPreviousClose) * 100;

        const data = {
          kospi: {
            name: '코스피',
            value: parseFloat(kospiCurrentPrice.toFixed(2)),
            changeRate: parseFloat(kospiChangePercent.toFixed(2)),
            changeValue: parseFloat(kospiChange.toFixed(2)),
          },
          kosdaq: {
            name: '코스닥',
            value: parseFloat(kosdaqCurrentPrice.toFixed(2)),
            changeRate: parseFloat(kosdaqChangePercent.toFixed(2)),
            changeValue: parseFloat(kosdaqChange.toFixed(2)),
          },
        };

        setMarketData(data);
        setError(null);
      } catch (err) {
        console.error('Market data fetch error:', err);
        setError(err.message);
        // API 실패 시 mock 데이터 사용
        setMarketData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    // 1분마다 데이터 갱신 (시장 운영 시간에만 실제로 변경됨)
    const interval = setInterval(fetchMarketData, 60000);

    return () => clearInterval(interval);
  }, []);

  return { marketData, loading, error };
};

export default useMarketData;
