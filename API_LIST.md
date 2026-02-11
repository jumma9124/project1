# 공공 API 사용 현황

## 1. Yahoo Finance API — 주식 페이지
- **파일:** `src/hooks/useMarketData.js`
- **사용처:** `src/components/learn/StocksSection.jsx`
- **API Endpoint:** `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`
- **프록시:** Vite 프록시 `/api/yahoo/` 경유 (`vite.config.js`)
- **데이터:** 코스피(^KS11), 코스닥(^KQ11) 실시간 지수, 등락률, 전일 종가
- **갱신 주기:** 60초마다 자동 갱신
- **실패 시:** 목(mock) 데이터 표시

## 2. 공공데이터포털 - 저축은행 금융 API — CMA / 은행안전성 페이지
- **파일:** `src/components/learn/CMASection.jsx`, `src/components/learn/BankSafetySection.jsx`
- **API Endpoint:** `https://apis.data.go.kr/B190017/service/GetSavingsBankFinanceService/getFinanceStateList`
- **API Key:** `06b3477db7333064915456425b02c1111869ed411d0c1b277de5d212ea7464be` (소스코드 하드코딩)
- **데이터:** CMA/파킹통장 금리 TOP5, 은행명, 평균예금금리, BIS비율, 연체율
- **갱신 주기:** 컴포넌트 마운트 시 1회 호출

## 3. 공공데이터포털 - ISA 정보 API — ISA 페이지
- **파일:** `src/components/learn/ISASection.jsx`
- **API Endpoint:** `https://apis.data.go.kr/1160100/GetISAInfoService_V2`
  - `/getMPBenefitRateInfo_V2` (MP 수익률)
  - `/getJoinStatus_V2` (가입현황)
- **API Key:** `06b3477db7333064915456425b02c1111869ed411d0c1b277de5d212ea7464be` (소스코드 하드코딩)
- **데이터:** ISA MP 수익률 TOP5 (금융사별 1년 수익률), 업권별 가입현황 통계
- **갱신 주기:** 컴포넌트 마운트 시 1회 호출

## 4. 공공데이터포털 - 청약 통계 API — 주택청약 페이지
- **파일:** `src/components/learn/SubscriptionGraphSection.jsx`
- **API Endpoint:**
  - `https://api.odcloud.kr/api/ApplyhomeBnkbStatSvc/v1/getBnkbAcnutAllStat` (청약통장 현황)
  - `https://api.odcloud.kr/api/ApplyhomeStatSvc/v1/getAPTReqstAreaStat` (지역별/연령대별 청약 신청)
- **API Key:** `06b3477db7333064915456425b02c1111869ed411d0c1b277de5d212ea7464be` (소스코드 하드코딩)
- **데이터:** 청약통장 가입 통계, 지역별 아파트 청약 신청 현황 (30대 이하/40대/50대/60대 이상)
- **갱신 주기:** 컴포넌트 마운트 시 1회 호출

## 5. 금융감독원 FinLife API — 예금 페이지 (비활성)
- **파일:** `src/components/learn/DepositSection.jsx`
- **API Endpoint:** `https://finlife.fss.or.kr/depositProductsSearch.json`
- **프록시:** Vite 프록시 `/finlifeapi` 경유 (`vite.config.js`)
- **API Key:** `.env` 파일의 `VITE_FINLIFE_API_KEY`
- **의도:** 정기예금 금리 TOP5 (은행명, 상품명, 기본금리, 우대금리)
- **상태:** 주석 처리됨 (API 인증키 활성화 대기 중)

---

## 참고사항
- API 키가 컴포넌트 파일에 직접 하드코딩되어 있음 → `.env` 파일로 통일 권장
- 적금 페이지(7번) 금리 TOP5 영역은 현재 비어있는 상태
