# Yahoo Finance API 실시간 시장 데이터 연동 가이드

## 개요
18번 '주식' 페이지에서 코스피/코스닥 실시간 지수를 Yahoo Finance API로 가져옵니다.

## 구현 파일
- `src/hooks/useMarketData.js`: Yahoo Finance API 호출 커스텀 훅
- `src/components/learn/StocksSection.jsx`: 시장 날씨 위젯 UI

## Yahoo Finance 심볼
- KOSPI: `^KS11`
- KOSDAQ: `^KQ11`

## CORS 이슈 해결 방법

### 방법 1: 개발 환경 - package.json proxy 설정 (가장 간단)

`package.json`에 다음 추가:
```json
{
  "proxy": "https://query1.finance.yahoo.com"
}
```

그리고 `useMarketData.js`에서 URL 수정:
```javascript
// 변경 전
const url = `${baseUrl}/${symbol}?interval=1d&range=1d`;

// 변경 후 (proxy 사용)
const url = `/v8/finance/chart/${symbol}?interval=1d&range=1d`;
```

**주의**: 이 방법은 개발 환경(npm start)에서만 작동합니다.

### 방법 2: CORS Proxy 서비스 사용 (빠른 테스트용)

무료 CORS 프록시 서비스 사용 (프로덕션 비권장):
```javascript
const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const url = `${corsProxy}${baseUrl}/${symbol}?interval=1d&range=1d`;
```

또는:
```javascript
const corsProxy = 'https://api.allorigins.win/raw?url=';
const url = `${corsProxy}${encodeURIComponent(`${baseUrl}/${symbol}?interval=1d&range=1d`)}`;
```

### 방법 3: 백엔드 API 생성 (프로덕션 권장) ⭐

Node.js Express 서버 예시:

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/market/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('API server running on port 3001'));
```

그리고 프론트엔드에서:
```javascript
const url = `http://localhost:3001/api/market/${symbol}`;
```

### 방법 4: Vercel Serverless Function (배포 환경 권장)

`api/market.js`:
```javascript
export default async function handler(req, res) {
  const { symbol } = req.query;

  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

프론트엔드:
```javascript
const url = `/api/market?symbol=${symbol}`;
```

## 현재 상태
- ✅ 커스텀 훅 생성 완료
- ✅ UI 통합 완료
- ✅ 로딩 상태 표시 완료
- ✅ 폴백 데이터 준비 완료
- ⚠️ CORS 해결 필요 (위 방법 중 선택)

## 테스트 방법

1. 개발 서버 실행:
```bash
npm start
```

2. `/learn/18` 페이지 접속

3. 브라우저 개발자 도구(F12) 확인:
   - Network 탭에서 Yahoo Finance API 요청 확인
   - Console에서 에러 메시지 확인

4. CORS 에러가 나타나면 위 방법 중 하나 적용

## API 응답 구조

```json
{
  "chart": {
    "result": [{
      "meta": {
        "regularMarketPrice": 2567.89,
        "chartPreviousClose": 2536.69,
        "previousClose": 2536.69
      }
    }]
  }
}
```

## 업데이트 주기
- 현재: 1분마다 자동 갱신
- 한국 증시 운영시간: 평일 09:00 ~ 15:30
- 운영시간 외에는 전일 종가 표시

## 대체 API (옵션)

Yahoo Finance 외 다른 옵션:
1. **한국투자증권 API**: KIS Developers (무료, 실시간)
2. **LS증권 API**: XingAPI (무료, 회원가입 필요)
3. **Alpha Vantage**: 글로벌 데이터 (무료 제한적)
4. **한국거래소 API**: 공식 데이터 (복잡한 인증)

## 문의
CORS 관련 문제나 다른 API 사용이 필요하면 알려주세요!
