# 프로젝트명: 농인 사회초년생을 위한 금융 교육 플랫폼 (가칭: '손길 금융')

## 1. 프로젝트 비전 및 목표
- **목표:** 어려운 금융 용어를 농인 사회초년생이 공공장소(지하철 등)에서도 부담 없이 배울 수 있도록 애니메이션 기반으로 설명함.
- **핵심 가치:** 1. 배리어프리(Barrier-free): 시각적 비유를 통한 직관적 이해.
  2. 프라이버시 보호: 금융 공부가 아닌 일반 애니메이션처럼 보이는 디자인.
  3. 참여형 검증: 농인 사용자가 직접 수어의 정확성을 투표하고 피드백함.

## 2. 타겟 사용자
- 금융 자립을 시작하는 2030 농인(청각장애인) 사회초년생.

## 3. 기술 스택 (기본 제안)
- Framework: React 또는 Next.js
- Styling: Tailwind CSS (권장)
- Backend/Storage: Firebase Storage

## 4. 현재 작업 단계: MVP(최소 기능 제품) 임시 페이지 구현
### [기능 요구사항]
1. **메인 화면:** 카드 형태의 금융 용어 리스트 노출.
2. **용어 카드 구성:**
   - 상단: 용어 제목 (예: ISA, CMA 등)
   - 중단: 애니메이션 비디오 영역
     - 속성: `autoPlay`, `muted`, `loop`, `playsInline` (지하철 자동 재생 대응)
   - 하단: 쉬운 설명 텍스트 (텍스트 강조 처리)
   - 참여 UI:
     - 투표 버튼 3종 (👍 자연스러워요, 🤔 약간 어색해요, ❌ 틀려요)
     - '나만의 수어 영상 답글 달기' 버튼 (카메라 아이콘)

### [UI/UX 가이드]
- **디자인 톤:** 파스텔 톤의 따뜻하고 친근한 느낌 (애니메이션 톤과 통일).
- **가독성:** 자막 가독성을 위해 고대비 텍스트 사용.
- **모바일 우선:** 지하철에서 한 손으로 조작하기 편한 레이아웃.

## 5. 데이터 (Firebase Storage 연동 필요)
- **ISA 비디오 URL:** https://firebasestorage.googleapis.com/v0/b/project1-13bc0.firebasestorage.app/o/project1%2Fvideo%2FCMA_Parking_Account_Video_Concept.mp4?alt=media&token=c5b908d4-93b4-4a98-a834-98f604c3b218
- **CMA 비디오 URL:** https://firebasestorage.googleapis.com/v0/b/project1-13bc0.firebasestorage.app/o/project1%2Fvideo%2FFirefly%20%5B%ED%99%94%EB%A9%B4%20%EA%B5%AC%EC%84%B1%EC%95%88%5D%20ISA%20'%EB%A7%88%EB%B2%95%20%EB%B0%94%EA%B5%AC%EB%8B%88'%20%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98__%EC%A7%80%ED%95%98%EC%B2%A0%EC%9D%B4%EB%82%98%20%EB%B2%84%EC%8A%A4%EC%97%90%EC%84%9C%20%EC%98%86%20%EC%82%AC%EB%9E%8C%EC%9D%B4%20%EB%B4%90%EB%8F%84%20%EA%B8%88%EC%9C%B5%20%EA%B3%B5%EB%B6%80%EA%B0%80%20%EC%95%84%EB%8B%88%EB%9D%BC%20%EA%B7%80%EC%97%AC%EC%9A%B4%20%EC%9B%B9%ED%88%B0%EC%9D%B4%EB%82%98%20%EC%BA%90%EB%A6%AD%ED%84%B0%20%EC%98%81%EC%83%81%EC%9D%84%20%EB%B3%B4%EB%8A%94%20%EA%B2%83%EC%B2%98%EB%9F%BC%20%EB%8A%90%EA%BB%B4%EC%A7%80%EA%B2%8C%20%ED%95%98%EB%8A%94%20.mp4?alt=media&token=60829299-a007-493d-aa45-b6b046feb271
- **주택청약 비디오 URL:** https://firebasestorage.googleapis.com/v0/b/project1-13bc0.firebasestorage.app/o/project1%2Fvideo%2FHousing_Subscription_Animation_Concept.mp4?alt=media&token=24fd9b64-6785-43d8-b72c-7bed1ba70387

## 6. Cursor에게 보내는 요청
"위의 사양서를 바탕으로, 메인 페이지(`App.js` 또는 `page.tsx`)와 개별 용어 카드 컴포넌트를 만들어줘. 우선은 위의 3개 영상 데이터를 하드코딩해서 화면에 예쁘게 배치해줘."
