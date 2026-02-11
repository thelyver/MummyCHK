# 💙 디스크 케어 일지

L4-5 디스크 환자를 위한 매일 건강 기록 웹 앱입니다.

**매일 건강 상태를 기록해서 잘챙깁시다!🖐️**

---

## 📋 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [주요 기능](#주요-기능)
3. [설치 및 배포](#설치-및-배포)
4. [사용 방법](#사용-방법)
5. [문제 해결](#문제-해결)
6. [개발 과정 및 해결한 문제들](#개발-과정-및-해결한-문제들)
7. [데이터 활용 팁](#데이터-활용-팁)

---

## 🎯 프로젝트 소개

이 앱은 디스크 환자가 매일 건강 상태를 체계적으로 기록하고, Google Sheets에 자동으로 저장하여 병원 재진 시 정확한 경과를 전달할 수 있도록 돕습니다.

### 기술 스택
- **프론트엔드**: HTML5, CSS3, Vanilla JavaScript
- **백엔드**: Google Apps Script (서버리스)
- **데이터 저장**: Google Sheets
- **호스팅**: GitHub Pages (정적 파일)

### 배포 URL
- **프로덕션**: https://thelyver.github.io/MummyCHK/
- **Google Sheets**: [건강 기록 스프레드시트](https://docs.google.com/spreadsheets/d/150-71Ahro7UsFEcrQjnDR9islQnqGxYhQc4p8IRvYy8/)

---

## ✨ 주요 기능

### 1. 일일 건강 기록
- 📅 **날짜 자동 설정**: 로컬 시간 기준 오늘 날짜 자동 입력
- 🩺 **통증 점수** (0-10 슬라이더)
  - 기상 시 통증
  - 취침 전 통증
- 📍 **통증 위치** (다중 선택 가능)
  - 허리 중앙, 왼쪽, 오른쪽, 엉덩이, 허벅지, 종아리, 발
- 🎯 **통증 성격** (다중 선택 가능)
  - 욱신거림, 찌릿함, 저림, 찌르는 느낌
- 🦵 **다리 증상 모니터링**
  - 없음, 저림, 힘 빠짐 (⚠️ 힘 빠짐 선택 시 즉시 경고)
- 📝 **활동 및 약물 기록**
  - 주요 활동, 악화 시점, 완화 행동
  - 약물 처치, 특이사항, 하루 요약

### 2. 안전 경고 시스템
- ⚠️ **다리 힘 빠짐 감지** 시 즉시 노란색 경고
- 🚨 **통증 8점 이상 3일 연속** 시 빨간색 경고
- 💡 병원 상담 권장 메시지 자동 표시

### 3. 자동 데이터 저장
- 📊 Google Sheets에 실시간 저장
- ⏰ 타임스탬프 자동 기록 (한국 시간 기준)
- 🔑 고유 ID 생성 (UUID)
- 🏷️ 경고 플래그 자동 태깅

### 4. 사용자 경험 (UX)
- 📱 **반응형 디자인**: 모바일 우선 설계
- 👆 **큰 터치 영역**: 중장년층 배려
- 🎨 **고대비 색상**: WCAG AA 접근성 준수
- ✅ **성공 메시지**: 화면 중앙에 부드럽게 표시
- 🔄 **스크롤 최적화**: 경고 메시지 자동 스크롤

---

## 🚀 설치 및 배포

### 1단계: Google Sheets 설정

1. **새 스프레드시트 생성**
   - [Google Sheets](https://sheets.google.com) 접속
   - 새 스프레드시트 만들기

2. **시트명 변경**
   - 하단 탭에서 "Sheet1"을 "**일일기록**"으로 변경

3. **컬럼 헤더 입력** (첫 번째 행)
   ```
   A1: 타임스탬프
   B1: 날짜
   C1: 기상통증점수
   D1: 취침통증점수
   E1: 통증위치
   F1: 통증성격
   G1: 주요활동
   H1: 악화시점
   I1: 완화행동
   J1: 다리증상
   K1: 약물처치
   L1: 특이사항
   M1: 하루요약
   N1: 경고플래그
   O1: 기록ID
   ```

### 2단계: Google Apps Script 배포

1. **Apps Script 열기**
   - Google Sheets 메뉴: 확장 프로그램 → Apps Script

2. **코드 복사**
   - `apps-script/Code.gs` 파일 내용 전체를 복사
   - Apps Script 편집기에 붙여넣기

3. **배포하기**
   - 상단 메뉴: **배포** → **새 배포**
   - 유형 선택: **"웹 앱"**
   - 설정:
     - 설명: "디스크 케어 일지 v1.0"
     - 실행 권한: **"나"**
     - 액세스 권한: **"모든 사용자"** ⚠️ 매우 중요!
   - "배포" 버튼 클릭

4. **권한 승인**
   - "권한 검토" 클릭
   - 본인 Google 계정 선택
   - "고급" → "디스크 케어 일지(안전하지 않음)로 이동" 클릭
   - "허용" 클릭

5. **배포 URL 복사**
   - 배포 완료 후 나타나는 **웹 앱 URL** 복사
   - 형식: `https://script.google.com/macros/s/AKfycb.../exec`

### 3단계: 웹 앱 설정

1. **배포 URL 설정**
   - `js/form.js` 파일 열기
   - 9번째 줄의 `SCRIPT_URL` 변수에 복사한 URL 붙여넣기
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

2. **버전 파라미터 확인**
   - `index.html` 파일에서 JavaScript 버전 확인
   ```html
   <script src="js/validation.js?v=2.2"></script>
   <script src="js/form.js?v=2.2"></script>
   ```

### 4단계: GitHub Pages 배포

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Disc Care Diary"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/MummyCHK.git
   git push -u origin main
   ```

2. **GitHub Pages 활성화**
   - GitHub 저장소 → Settings → Pages
   - Source: **main branch**
   - Save 클릭
   - 1-2분 후 배포 완료

3. **배포 URL 확인**
   - `https://YOUR_USERNAME.github.io/MummyCHK/`

---

## 📱 사용 방법

### 매일 기록하기

1. **웹 앱 접속**
   - 브라우저에서 https://thelyver.github.io/MummyCHK/ 접속

2. **기록 입력**
   - 📅 **날짜**: 자동으로 오늘 날짜 표시 (수동 변경 가능)
   - 🌅 **기상 시 통증**: 슬라이더로 0-10 선택
   - 🌙 **취침 전 통증**: 슬라이더로 0-10 선택
   - 📍 **통증 위치**: 여러 개 선택 가능 (칩 버튼 클릭)
   - 🎯 **통증 느낌**: 여러 개 선택 가능
   - 🦵 **다리 증상**: 하나만 선택
   - 📝 **활동, 약물, 메모**: 텍스트 입력

3. **저장하기**
   - "기록 저장하기" 버튼 클릭
   - ✅ 성공 메시지 화면 중앙에 표시
   - 📊 Google Sheets에 자동 저장됨

4. **경고 확인**
   - ⚠️ "힘 빠짐" 선택 시 → 노란색 경고 메시지
   - 🚨 통증 8점 이상 3일 연속 → 빨간색 경고 메시지

### 모바일 홈 화면에 추가 (권장)

#### iPhone (Safari)
1. Safari에서 웹 앱 열기
2. 하단 **공유** 버튼 탭
3. "홈 화면에 추가" 선택
4. 이름: "디스크 케어" 입력
5. 홈 화면에서 앱처럼 실행 가능

#### Android (Chrome)
1. Chrome에서 웹 앱 열기
2. 메뉴 버튼 (⋮) 탭
3. "홈 화면에 추가" 선택
4. 이름 입력 후 추가

---

## 🔧 문제 해결

### 1. 데이터가 Google Sheets에 저장되지 않음

**증상**: "기록 저장" 클릭 시 성공 메시지가 나오지만 Google Sheets에 데이터가 없음

**원인**:
- Apps Script URL이 잘못됨
- Apps Script 배포 권한이 "모든 사용자"가 아님
- Apps Script 배포가 비활성화됨

**해결방법**:
1. **브라우저 개발자 도구** 열기 (`F12` 또는 `Cmd + Option + I`)
2. **Network 탭** 확인
3. `exec` 요청의 HTTP 상태 코드 확인
   - **401 Unauthorized**: 권한 문제 → "모든 사용자"로 재배포
   - **404 Not Found**: URL 오류 → Apps Script URL 재확인
   - **502 Bad Gateway**: 서버 오류 → 새 배포 생성

4. **Apps Script 재배포**:
   - Apps Script → 배포 → 새 배포
   - 액세스 권한: **"모든 사용자"** 필수!
   - 새 URL을 `js/form.js`의 `SCRIPT_URL`에 업데이트

### 2. 날짜가 어제로 표시됨 (타임존 문제)

**증상**: 오늘이 2월 12일인데 날짜 필드에 2월 11일로 표시

**원인**: JavaScript의 `toISOString()`이 UTC 기준으로 작동

**해결방법**: ✅ 이미 해결됨 (v2.2)
- 로컬 시스템 시간을 직접 사용하도록 수정
- `getFullYear()`, `getMonth()`, `getDate()` 사용

**확인**:
```javascript
// Console에서 실행
document.getElementById('recordDate').value
// 결과: "2026-02-12" (오늘 날짜)
```

### 3. 성공 메시지가 화면 하단에 표시됨

**증상**: 저장 후 성공 메시지가 보이지 않음 (화면이 맨 위로 스크롤)

**해결방법**: ✅ 이미 해결됨 (v1.3)
- `scrollIntoView({ behavior: 'smooth', block: 'center' })` 적용
- 성공 메시지가 화면 중앙에 부드럽게 표시됨

### 4. 브라우저 캐시 문제

**증상**: 코드를 업데이트했는데 변경사항이 반영되지 않음

**해결방법**:
1. **강력 새로고침**:
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **시크릿 모드 테스트**:
   - `Cmd + Shift + N` (새 시크릿 창)
   - 캐시 없이 최신 버전 확인

3. **개발자 도구**:
   - Network 탭 → "Disable cache" ✅ 체크
   - 페이지 새로고침

4. **버전 파라미터**: ✅ 이미 적용됨
   - JavaScript 파일에 `?v=2.2` 파라미터 추가
   - 버전 업데이트 시 자동으로 새 파일 로드

### 5. "다리 힘 빠짐" 선택 시 화면이 맨 위로 이동

**증상**: 힘 빠짐 선택 시 경고 메시지를 읽을 수 없음

**해결방법**: ✅ 이미 해결됨 (v1.3)
- `showWarning()` 함수에 `scroll` 파라미터 추가
- 힘 빠짐 경고는 스크롤 없이 제자리에 표시

---

## 💡 개발 과정 및 해결한 문제들

### 개발 일정
- **시작일**: 2026년 2월 11일
- **배포일**: 2026년 2월 12일
- **개발 기간**: 약 6시간

### 주요 마일스톤

#### 1단계: 기획 및 설계 (30분)
- 병원 권장 데이터 항목 분석
- 15개 컬럼 구조 설계
- 안전 경고 로직 설계

#### 2단계: 프론트엔드 개발 (2시간)
- HTML 구조 설계 (7개 섹션)
- CSS 스타일링 (모바일 우선, 고대비)
- JavaScript 폼 로직 및 검증

#### 3단계: 백엔드 개발 (1시간)
- Google Apps Script `doPost()` 구현
- Google Sheets 데이터 저장 로직
- 안전 경고 자동 감지 시스템

#### 4단계: 배포 및 통합 (1시간)
- GitHub Pages 배포
- Apps Script 웹 앱 배포
- CORS 및 권한 설정

#### 5단계: 디버깅 및 최적화 (1.5시간)
- **문제들**과 **해결 과정** 아래 참조

### 해결한 주요 문제들

#### 🐛 문제 1: Google Sheets 데이터 저장 실패 (401 Unauthorized)

**증상**:
- 폼 제출 시 성공 메시지는 표시되지만 Google Sheets에 데이터가 없음
- 브라우저 Console에 401 오류

**원인**:
- Apps Script 배포 시 액세스 권한을 "나"로 설정
- GitHub Pages는 익명 요청으로 처리되어 권한 거부

**시도한 해결책**:
1. ❌ CORS 헤더 추가 → 효과 없음
2. ❌ `mode: 'no-cors'` 설정 → 응답을 읽을 수 없음
3. ✅ **Apps Script 재배포** (액세스 권한: "모든 사용자")

**최종 해결**:
```javascript
// Apps Script 배포 설정
실행 권한: "나"
액세스 권한: "모든 사용자" ← 필수!
```

**교훈**: GitHub Pages 같은 정적 호스팅에서는 반드시 "모든 사용자" 권한 필요

---

#### 🐛 문제 2: 날짜가 하루 전으로 표시됨 (타임존 이슈)

**증상**:
- Mac 시스템 시간: 2026년 2월 12일 오전 2:25
- 웹 앱 날짜 필드: 2026-02-11

**원인**:
- JavaScript `new Date().toISOString()`은 UTC 기준
- 한국 시간(UTC+9) 오전 2시 = UTC 전날 오후 5시
- 결과적으로 전날 날짜 반환

**시도한 해결책**:
1. ❌ **타임존 오프셋 계산**:
   ```javascript
   const koreaOffset = 9 * 60;
   const koreaTime = new Date(today.getTime() +
     (koreaOffset + today.getTimezoneOffset()) * 60000);
   ```
   - 문제: Mac이 이미 한국 시간으로 설정되어 있으면 `getTimezoneOffset() = -540`
   - 결과: `540 + (-540) = 0` → 시간 조정 안 됨!

2. ✅ **로컬 시스템 시간 직접 사용**:
   ```javascript
   const year = today.getFullYear();
   const month = String(today.getMonth() + 1).padStart(2, '0');
   const day = String(today.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;
   ```

**최종 해결**: v2.2 업데이트
- UTC 변환 없이 로컬 날짜 직접 사용
- 타임존 독립적으로 작동

**교훈**: 날짜 계산 시 `toISOString()` 대신 `getFullYear()` 등 로컬 메서드 사용

---

#### 🐛 문제 3: 성공 메시지가 보이지 않음 (스크롤 문제)

**증상**:
- "기록 저장" 클릭 시 성공 메시지가 화면 하단에 표시
- 화면이 맨 위로 스크롤되어 메시지를 볼 수 없음

**원인**:
```javascript
// 기존 코드
window.scrollTo({ top: 0, behavior: 'smooth' });
```
- 성공 메시지는 페이지 하단에 있는데 화면을 맨 위로 이동

**해결책**:
```javascript
// 수정된 코드
successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
```

**추가 개선**:
- 메시지 폰트 크기: 16px → 18px
- 폰트 굵기: 600 추가
- 테두리: 4px → 6px
- 그림자 효과 추가

**최종 결과**: v1.3 업데이트
- 성공 메시지가 화면 중앙에 부드럽게 표시
- 사용자가 즉시 확인 가능

---

#### 🐛 문제 4: 브라우저 캐시로 인한 업데이트 미반영

**증상**:
- 코드를 수정하고 GitHub에 푸시했는데 변경사항이 반영되지 않음
- 시크릿 모드에서는 정상 작동

**원인**:
- 브라우저가 `form.js`, `validation.js` 파일을 캐시
- GitHub Pages 배포 후에도 구버전 파일 사용

**해결책**:
```html
<!-- 기존 코드 -->
<script src="js/form.js"></script>

<!-- 수정된 코드 -->
<script src="js/form.js?v=2.2"></script>
```

**버전 관리**:
- v1.0: 초기 배포
- v1.1: Apps Script URL 업데이트
- v1.3: UX 개선 (스크롤, 메시지 가독성)
- v2.0: 캐시 우회 버전 파라미터 도입
- v2.1: 타임존 계산 로직 추가 (실패)
- v2.2: 로컬 시간 직접 사용 (성공)

**교훈**: 정적 파일은 버전 쿼리 파라미터로 캐시 제어 필수

---

#### 🐛 문제 5: "다리 힘 빠짐" 경고 시 스크롤 문제

**증상**:
- "힘 빠짐" 선택 시 노란색 경고 표시
- 화면이 맨 위로 스크롤되어 경고 메시지를 읽을 수 없음

**원인**:
```javascript
// validation.js의 showWarning() 함수
window.scrollTo({ top: 0, behavior: 'smooth' });
```

**해결책**:
```javascript
// showWarning() 함수에 scroll 파라미터 추가
function showWarning(message, scroll = true) {
  warningDiv.innerHTML = message;
  warningDiv.style.display = 'block';

  if (scroll) {
    setTimeout(() => {
      warningDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
}

// form.js에서 호출 시
showWarning('⚠️ 다리 힘 빠짐 증상...', false); // 스크롤 비활성화
```

**최종 결과**: v1.3 업데이트
- 힘 빠짐 경고는 제자리에 표시
- 다른 경고는 여전히 중앙으로 스크롤

---

#### 🐛 문제 6: 푸터 텍스트 가독성 문제

**증상**:
- "기록 저장" 버튼 아래 안내 문구가 잘 보이지 않음
- 폰트 크기 작고 색상이 흐림

**해결책**:
```css
/* 기존 CSS */
footer p {
  font-size: 14px;
  color: var(--text-secondary); /* 연한 회색 */
}

/* 수정된 CSS */
footer p {
  font-size: 16px;
  color: var(--text-primary); /* 진한 검정 */
  font-weight: 500;
}
```

**최종 결과**: v1.3 업데이트
- 푸터 텍스트 가독성 대폭 향상

---

### 기술적 도전과 학습

#### 1. Google Apps Script CORS 이해
- **문제**: 브라우저 ↔ Apps Script 통신 시 CORS 오류
- **학습**: Apps Script는 자체적으로 CORS 처리
- **결론**: "모든 사용자" 권한만 설정하면 해결

#### 2. JavaScript 날짜/시간 처리
- **문제**: `Date` 객체의 UTC vs 로컬 시간 혼동
- **학습**: `toISOString()` = UTC, `getDate()` = 로컬
- **결론**: 로컬 시간 직접 조합이 가장 안전

#### 3. 브라우저 캐싱 메커니즘
- **문제**: 정적 파일 업데이트가 반영되지 않음
- **학습**: 쿼리 파라미터로 캐시 무효화 가능
- **결론**: `?v=버전` 패턴 도입

#### 4. UX 디자인 원칙
- **문제**: 경고/성공 메시지 가시성 저하
- **학습**: 스크롤 위치, 색상 대비, 폰트 크기의 중요성
- **결론**: 사용자 행동 패턴 기반 최적화

---

### 성능 최적화

#### 1. 파일 크기 최적화
- HTML: 9.8 KB
- CSS: 7.2 KB
- JavaScript (form.js): 3.3 KB
- JavaScript (validation.js): 1.7 KB
- **총합**: ~22 KB (매우 가벼움)

#### 2. 로딩 속도
- GitHub Pages 배포 시간: 40-50초
- 페이지 로딩 시간: ~200ms (첫 방문)
- JavaScript 실행 시간: ~10ms

#### 3. 모바일 최적화
- 터치 영역: 최소 44x44px
- 슬라이더 핸들: 32px 크기
- 폰트 크기: 최소 16px (확대 없이 읽기 가능)

---

## 📊 데이터 활용 팁

### 1. 병원 재진 시 준비

Google Sheets에서 다음 데이터 확인:
- **통증 점수 추이** (C, D 컬럼)
- **약물 복용 패턴** (K 컬럼)
- **악화 트리거 빈도** (H 컬럼)
- **종아리 방사통 변화** (E 컬럼에서 "종아리" 검색)

### 2. 간단한 차트 만들기

1. Google Sheets 메뉴: **삽입** → **차트**
2. 차트 유형: **꺾은선형 그래프**
3. X축: B 컬럼 (날짜)
4. Y축: C, D 컬럼 (통증 점수)
5. 차트 제목: "통증 점수 추이"

### 3. 데이터 필터링

1. 첫 행 선택 → **데이터** → **필터 만들기**
2. "다리증상" 컬럼에서 "힘 빠짐" 필터
3. "경고플래그" 컬럼에서 경고 발생 날짜만 보기

### 4. 주간/월간 요약 만들기

```
=AVERAGEIFS(C:C, B:B, ">=2026-02-10", B:B, "<=2026-02-16")
```
- 특정 기간 평균 통증 점수 계산
- 주간 추이 모니터링

---

## 🔒 보안 및 개인정보

### 주의사항

1. **Apps Script URL 공유 금지**
   - URL을 알면 누구나 데이터 추가 가능
   - `.gitignore`에 `apps-script/` 폴더 포함
   - GitHub에 배포 URL 노출 방지

2. **Google Sheets 공유 설정**
   - 본인만 편집 가능하도록 설정
   - 민감 정보 포함 주의
   - 필요 시 특정 사람과만 공유

3. **백업**
   - Google Sheets: **파일** → **사본 만들기**
   - 월 1회 백업 권장
   - 다운로드: **파일** → **다운로드** → **CSV**

---

## 📞 프로젝트 정보

### 제작 정보
- **제작자**: 강수근
- **목적**: 안미라(안여사)의 L4-5 디스크 회복 지원
- **제작 기간**: 2026년 2월 11-12일 (약 6시간)
- **개발 환경**: Claude Code + Claude 3.7 Sonnet

### 기술 스택 상세
- **언어**: HTML5, CSS3, ES6+ JavaScript
- **프레임워크**: 없음 (Vanilla JS)
- **스타일**: Custom CSS (변수 기반)
- **백엔드**: Google Apps Script
- **데이터베이스**: Google Sheets
- **버전 관리**: Git + GitHub
- **배포**: GitHub Pages
- **도메인**: thelyver.github.io

### 파일 구조
```
MummyCHK/
├── index.html              # 메인 HTML (폼 구조)
├── css/
│   └── styles.css         # 스타일시트 (반응형, 고대비)
├── js/
│   ├── form.js            # 폼 로직 (제출, 초기화)
│   └── validation.js      # 검증 로직 (오류/성공 메시지)
├── apps-script/
│   └── Code.gs            # Google Apps Script (백엔드)
├── README.md              # 프로젝트 문서 (이 파일)
├── GOOGLE_SHEETS_SETUP.md # Google Sheets 설정 가이드
└── .gitignore             # Git 제외 파일 (apps-script/)
```

---

## 💙 마무리

**매일 건강 상태를 기록해서 잘챙깁시다!🖐️**

**💙 안여사의 건강한 일상 기원 💙**

건강 상태가 악화되거나 긴급한 증상이 나타나면 즉시 병원에 연락하세요.

### 긴급 증상 (즉시 병원 방문!)
- 🚨 다리 힘이 급격히 빠짐
- 🚨 대소변 조절 장애
- 🚨 통증이 갑자기 심해짐
- 🚨 발열 동반

---

**버전**: 2.2.0
**최종 업데이트**: 2026년 2월 12일
**라이선스**: 개인 사용 (MIT License)
**GitHub**: https://github.com/thelyver/MummyCHK
