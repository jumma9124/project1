# 금융관련 페이지

> 농인 사회초년생을 위한 금융 교육 플랫폼

## 프로젝트 개요

어려운 금융 용어를 농인(청각장애인) 사회초년생이 공공장소(지하철 등)에서도 부담 없이 배울 수 있도록 애니메이션 기반으로 설명하는 금융 교육 앱입니다.

### 핵심 가치
1. **배리어프리(Barrier-free)**: 시각적 비유를 통한 직관적 이해
2. **프라이버시 보호**: 금융 공부가 아닌 일반 애니메이션처럼 보이는 디자인
3. **참여형 검증**: 사용자가 직접 수어의 정확성을 투표하고 피드백

### 타겟 사용자
- 금융 자립을 시작하는 2030 농인 사회초년생

---

## 배포 정보

| 항목 | URL |
|------|-----|
| **GitHub Repository** | https://github.com/jumma9124/project1 |
| **GitHub Pages** | https://jumma9124.github.io/project1 |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| **Framework** | React 19.2.4 |
| **Build Tool** | Vite 7.3.1 |
| **Styling** | Tailwind CSS 4.1.18 |
| **Routing** | React Router DOM 7.13.0 |
| **Storage** | Firebase Storage |
| **PDF 생성** | html2pdf.js, jsPDF, html2canvas |
| **배포** | GitHub Pages (gh-pages) |

---

## 프로젝트 구조

```
src/
├── App.jsx                          # 메인 라우터
├── main.jsx                         # 앱 진입점
├── index.css                        # 전역 스타일
├── firebase.js                      # Firebase 설정
│
├── components/
│   └── learn/
│       ├── salary/                  # 카테고리1: 월급과 세금
│       │   ├── SalaryPayslipSection.jsx      # 1. 세전/세후
│       │   ├── NetPayCalculatorSection.jsx   # 2. 실수령액
│       │   ├── YearEndTaxSection.jsx         # 3. 연말정산
│       │   ├── DeductionCompareSection.jsx   # 4. 소득공제/세액공제
│       │   └── ExpenseTrackerSection.jsx     # 5. 고정/변동지출
│       │
│       ├── banking/                 # 카테고리2: 은행과 저축
│       │   ├── DepositSection.jsx            # 6. 예금
│       │   ├── SavingsSection.jsx            # 7. 적금
│       │   ├── InterestCompareSection.jsx    # 8. 단리 vs 복리
│       │   ├── TaxFreeSection.jsx            # 9. 비과세
│       │   ├── ISASection.jsx                # 10. ISA (영상 O)
│       │   └── CMASection.jsx                # 11. CMA/파킹통장 (영상 O)
│       │
│       ├── credit/                  # 카테고리3: 신용과 대출
│       │   ├── CreditScoreSection.jsx        # 12. 신용점수
│       │   ├── PrincipalSection.jsx          # 13. 원금
│       │   ├── PrincipalInterestSection.jsx  # 14. 원리금
│       │   ├── LoanTypesSection.jsx          # 15. 대출
│       │   ├── MinusAccountSection.jsx       # 16. 마이너스 통장
│       │   └── DSRSection.jsx                # 17. DSR
│       │
│       ├── investment/              # 카테고리4: 투자 기초
│       │   ├── StocksSection.jsx             # 18. 주식
│       │   ├── BondsSection.jsx              # 19. 채권
│       │   ├── ETFSection.jsx                # 20. ETF
│       │   └── DividendsSection.jsx          # 21. 배당금
│       │
│       ├── housing/                 # 카테고리5: 주거와 부동산
│       │   ├── JeonseVsRentSection.jsx       # 22. 전세 vs 월세
│       │   ├── PropertyRegisterSection.jsx   # 23. 등기부등본
│       │   ├── FixedDateSection.jsx          # 24. 확정일자
│       │   ├── SubscriptionGraphSection.jsx  # 25. 주택청약 (영상 O)
│       │   └── LeaseAgreementSection.jsx     # 26. 임대차계약서
│       │
│       └── economy/                 # 카테고리6: 경제 환경
│           ├── InflationSection.jsx          # 27. 인플레이션
│           └── PublicUtilitiesSection.jsx    # 28. 공공요금
│
├── data/
│   ├── contentData.js               # 전체 콘텐츠 데이터 통합
│   └── content/
│       ├── salaryData.js            # 월급/세금 데이터 (1-5)
│       ├── bankingData.js           # 은행/저축 데이터 (6-11)
│       ├── creditData.js            # 신용/대출 데이터 (12-17)
│       ├── investmentData.js        # 투자 데이터 (18-21)
│       ├── housingData.js           # 주거/부동산 데이터 (22-26)
│       └── economyData.js           # 경제 환경 데이터 (27-28)
│
├── hooks/
│   └── useMarketData.js             # Yahoo Finance 실시간 데이터 훅
│
└── pages/
    ├── main/
    │   └── MainPage.jsx             # 메인 페이지 (6개 메뉴)
    ├── learn/
    │   ├── LearnPage.jsx            # 금융용어 목록 (아코디언)
    │   ├── LearnDetailPage.jsx      # 용어 상세 페이지
    │   └── LearnDetailLayout.jsx    # 상세 페이지 레이아웃
    └── portfolio/
        └── PortfolioPage.jsx        # 포트폴리오 분석 페이지
```

---

## 페이지 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | MainPage | 메인 화면 (6개 메뉴 버튼) |
| `/learn` | LearnPage | 28개 금융용어 카테고리 목록 |
| `/learn/:id` | LearnDetailPage | 개별 용어 상세 페이지 (1-28) |
| `/portfolio` | PortfolioPage | 자산 포트폴리오 분석 + PDF 내보내기 |

---

## 28개 금융 용어 목록

### 카테고리 1: 월급과 세금 (급여 관리 기초)
| ID | 한글 | 영문 | 영상 |
|----|------|------|------|
| 1 | 세전/세후 | Pre-tax / After-tax | - |
| 2 | 실수령액 | Net Pay | - |
| 3 | 연말정산 | Year-end Tax Settlement | - |
| 4 | 소득공제/세액공제 | Deductions / Tax Credits | - |
| 5 | 고정지출/변동지출 | Fixed / Variable Expenses | - |

### 카테고리 2: 은행과 저축 (돈 모으기)
| ID | 한글 | 영문 | 영상 |
|----|------|------|------|
| 6 | 예금 | Time Deposit | - |
| 7 | 적금 | Installment Savings | - |
| 8 | 단리 vs 복리 | Simple vs Compound Interest | - |
| 9 | 비과세 | Tax-exempt | - |
| 10 | ISA | 마법 바구니 | O |
| 11 | CMA/파킹통장 | 주차장 | O |

### 카테고리 3: 신용과 대출 (신용 관리)
| ID | 한글 | 영문 | 영상 |
|----|------|------|------|
| 12 | 신용점수 | Credit Score | - |
| 13 | 원금 | Principal | - |
| 14 | 원리금 | Principal + Interest | - |
| 15 | 대출 | Loan | - |
| 16 | 마이너스 통장 | Overdraft | - |
| 17 | DSR | Debt Service Ratio | - |

### 카테고리 4: 투자 기초 (재테크)
| ID | 한글 | 영문 | 영상 |
|----|------|------|------|
| 18 | 주식 | Stocks | - |
| 19 | 채권 | Bonds | - |
| 20 | ETF | Exchange Traded Fund | - |
| 21 | 배당금 | Dividends | - |

### 카테고리 5: 주거와 부동산 (독립 준비)
| ID | 한글 | 영문 | 영상 |
|----|------|------|------|
| 22 | 전세 vs 월세 | Jeonse vs Rent | - |
| 23 | 등기부등본 | Property Register | - |
| 24 | 확정일자 | Fixed Date | - |
| 25 | 주택청약 | 번호표 | O |
| 26 | 임대차계약서 | Lease Agreement | - |

### 카테고리 6: 경제 환경 (세상 흐름)
| ID | 한글 | 영문 | 영상 |
|----|------|------|------|
| 27 | 인플레이션 | Inflation | - |
| 28 | 공공요금 | Public Utilities | - |

---

## API 연동 현황

### 1. 공공데이터포털 API (활성)

#### ISA 정보 API
- **사용처**: `ISASection.jsx` (10번 ISA)
- **Endpoint**: `https://apis.data.go.kr/1160100/GetISAInfoService_V2`
- **기능**: ISA MP 수익률 TOP5, 업권별 가입현황

#### 청약 통계 API
- **사용처**: `SubscriptionGraphSection.jsx` (25번 주택청약)
- **Endpoint**: `https://api.odcloud.kr/api/ApplyhomeBnkbStatSvc/v1/getBnkbAcnutAllStat`
- **기능**: 청약통장 현황, 지역별 청약 신청 통계

#### 저축은행 금융 API
- **사용처**: `CMASection.jsx` (11번 CMA)
- **Endpoint**: `https://apis.data.go.kr/B190017/service/GetSavingsBankFinanceService`
- **기능**: CMA/파킹통장 금리 TOP5

### 2. Yahoo Finance API (활성)
- **사용처**: `StocksSection.jsx` (18번 주식)
- **Endpoint**: `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`
- **기능**: 코스피(^KS11), 코스닥(^KQ11) 실시간 지수
- **프록시**: Vite 개발서버 `/api/yahoo/` 경유

### 3. 금융감독원 FinLife API (비활성)
- **사용처**: `DepositSection.jsx` (6번 예금)
- **Endpoint**: `https://finlife.fss.or.kr/depositProductsSearch.json`
- **상태**: 주석 처리 (API 인증키 활성화 대기)

---

## 인증 키 정보

### .env 파일 설정
```env
VITE_FINLIFE_API_KEY=06b3477db7333064915456425b02c1111869ed411d0c1b277de5d212ea7464be
```

### 하드코딩된 API 키 (소스코드 내)
```
06b3477db7333064915456425b02c1111869ed411d0c1b277de5d212ea7464be
```
- 위치: `ISASection.jsx`, `CMASection.jsx`, `SubscriptionGraphSection.jsx`
- 권장: `.env` 파일로 통일

### Firebase Storage
- **Bucket**: `project1-13bc0.firebasestorage.app`
- **설정 파일**: `src/firebase.js`

---

## 동영상 URL (Firebase Storage)

### ISA (10번)
```
https://firebasestorage.googleapis.com/v0/b/project1-13bc0.firebasestorage.app/o/project1%2Fvideo%2FFirefly%20%5B%ED%99%94%EB%A9%B4%20%EA%B5%AC%EC%84%B1%EC%95%88%5D%20ISA%20%27%EB%A7%88%EB%B2%95%20%EB%B0%94%EA%B5%AC%EB%8B%88%27%20%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98__%EC%A7%80%ED%95%98%EC%B2%A0%EC%9D%B4%EB%82%98%20%EB%B2%84%EC%8A%A4%EC%97%90%EC%84%9C%20%EC%98%86%20%EC%82%AC%EB%9E%8C%EC%9D%B4%20%EB%B4%90%EB%8F%84%20%EA%B8%88%EC%9C%B5%20%EA%B3%B5%EB%B6%80%EA%B0%80%20%EC%95%84%EB%8B%88%EB%9D%BC%20%EA%B7%80%EC%97%AC%EC%9A%B4%20%EC%9B%B9%ED%88%B0%EC%9D%B4%EB%82%98%20%EC%BA%90%EB%A6%AD%ED%84%B0%20%EC%98%81%EC%83%81%EC%9D%84%20%EB%B3%B4%EB%8A%94%20%EA%B2%83%EC%B2%98%EB%9F%BC%20%EB%8A%90%EA%BB%B4%EC%A7%80%EA%B2%8C%20%ED%95%98%EB%8A%94%20.mp4?alt=media&token=60829299-a007-493d-aa45-b6b046feb271
```

### CMA/파킹통장 (11번)
```
https://firebasestorage.googleapis.com/v0/b/project1-13bc0.firebasestorage.app/o/project1%2Fvideo%2FCMA_Parking_Account_Video_Concept.mp4?alt=media&token=c5b908d4-93b4-4a98-a834-98f604c3b218
```

### 주택청약 (25번)
```
https://firebasestorage.googleapis.com/v0/b/project1-13bc0.firebasestorage.app/o/project1%2Fvideo%2FHousing_Subscription_Animation_Concept.mp4?alt=media&token=24fd9b64-6785-43d8-b72c-7bed1ba70387
```

---

## 완료된 작업

### 핵심 기능
- [x] 메인 페이지 (6개 메뉴 그리드)
- [x] 경제용어 학습 페이지 (6개 카테고리 아코디언)
- [x] 28개 금융 용어 상세 페이지
- [x] 각 용어별 인터랙티브 UI 컴포넌트
- [x] 포트폴리오 분석 페이지 + PDF 내보내기
- [x] 영상 플레이어 (자동재생, 음소거, 루프)

### 인터랙티브 기능 (용어별)
- [x] 실수령액 계산기 (2번)
- [x] 연말정산 환급 시뮬레이션 (3번)
- [x] 소득공제/세액공제 비교 (4번)
- [x] 지출 트래커 (5번)
- [x] 예금 이자 계산기 (6번)
- [x] 적금 누적 차트 (7번)
- [x] 단리 vs 복리 라인 차트 (8번)
- [x] ISA 수익률 + 가입현황 (10번)
- [x] CMA 금리 비교 (11번)
- [x] 신용점수 게이지 차트 (12번)
- [x] 대출 상환 계산기 (14번)
- [x] DSR 계산기 (17번)
- [x] 주식 시장 실시간 지수 (18번)
- [x] 배당금 계산기 (21번)
- [x] 전세 vs 월세 시뮬레이터 (22번)
- [x] 등기부등본 위험 단어 찾기 (23번)
- [x] 확정일자 체크리스트 (24번)
- [x] 지역별 청약 막대 그래프 (25번)
- [x] 임대차계약서 인터랙티브 뷰어 (26번)
- [x] 인플레이션 물가 시각화 (27번)
- [x] 공공요금 가상 고지서 UI (28번)

### 배포
- [x] GitHub 저장소 생성 및 푸시
- [x] GitHub Pages 배포 설정

---

## 남은 작업

### 필수
- [ ] 각 용어별 동영상 제작 및 추가 (25개 남음)
- [ ] 예금/적금 API 연동 (FinLife API 활성화 후)
- [ ] BrowserRouter → HashRouter 변경 (GitHub Pages 새로고침 이슈)

### 메인 페이지
- [ ] 메인 3,4,5,6번 메뉴 기능 정의
- [ ] 메인 상단 빈 공간 활용 (검색 기능?)

### 개선사항
- [ ] API 키 `.env` 파일로 통일
- [ ] 모바일 반응형 최적화
- [ ] 다크모드 지원

---

## 로컬 개발 환경 설정

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

### 환경 변수 설정
`.env` 파일 생성:
```env
VITE_FINLIFE_API_KEY=your_api_key_here
```

---

## 디자인 가이드

### 색상 팔레트
| 용도 | 색상 코드 |
|------|-----------|
| 배경 (메인) | `#FFF8F0` |
| 배경 (상세) | `#FCF9F5` |
| 카드 배경 | `#FFFFFF` |
| 텍스트 (기본) | `#3E2C1C` |
| 텍스트 (보조) | `#8B7E74` |
| 강조 (노란색) | `#FFD89D`, `#FFEDD5` |
| 강조 (빨간색) | `#DC2626` |
| 강조 (파란색) | `#2563EB` |
| 강조 (초록색) | `#059669` |

### 폰트
- **기본**: Pretendard, Apple SD Gothic Neo, Malgun Gothic
- **굵기**: 700 (전역 설정)

### 카드 스타일
```css
.card {
  background: white;
  border-radius: 2.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 237, 213, 0.3);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

---

## 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

---

## 문의

- GitHub Issues: https://github.com/jumma9124/project1/issues
