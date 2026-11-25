# 39-COLLABORATION-WEB-KORAIL

PLAY SOPT 39기 합동세미나 모바일 웹 1조 코레일 🚄 <br />
[**열차 조회부터 좌석 선택, 예약 생성, 결제 대기 정보 확인**까지 연결한 코레일 모바일 웹 리디자인 프로젝트]
<br />

## 🆒: 어벤져스 팀원 소개

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/yurimidaH">
        <img src="https://github.com/yurimidaH.png" width="150" height="150" alt="황유림 프로필" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Hyobee02">
        <img src="https://github.com/Hyobee02.png" width="150" height="150" alt="최효비 프로필" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bosung0505">
        <img src="https://github.com/bosung0505.png" width="150" height="150" alt="이보성 프로필" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/comehere43">
        <img src="https://github.com/comehere43.png" width="150" height="150" alt="오세영 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center"><strong>황유림</strong></td>
    <td align="center"><strong>최효비</strong></td>
    <td align="center"><strong>이보성</strong></td>
    <td align="center"><strong>오세영</strong></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/yurimidaH">@yurimidaH</a></td>
    <td align="center"><a href="https://github.com/Hyobee02">@Hyobee02</a></td>
    <td align="center"><a href="https://github.com/bosung0505">@bosung0505</a></td>
    <td align="center"><a href="https://github.com/comehere43">@comehere43</a></td>
  </tr>
</table>

<br />

## 🤘🏽: 역할 분담

|   어벤져스s    | 담당 화면·기능                                                                                                                                      | 공통 작업                                                                          |
| :------------: | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **🛁: 황유림** | **좌석 선택·예매 흐름 통합**<br>좌석 그리드·범례·호차 선택 시트·안내 모달<br>좌석 배치 조회·예약 생성·자동 배정<br>검색 조건 전달 및 결제 대기 연결 | 프로젝트 초기 구성<br>공통 바텀시트·모바일 레이아웃·UI 가이드<br>CI·PR 자동화·배포 |
| **🚿: 최효비** | **열차 조회·상세**<br>조회 조건 폼·열차 종류 필터<br>결과 카드·목록·상세 바텀시트<br>목록·상세·운임 API 연동                                        | 공통 버튼·디자인 토큰·폰트<br>ESLint·Prettier·절대경로 설정                        |
| **🪠: 이보성** | **홈 화면**<br>조회 카드·내 승차권·이용 안내·푸터<br>호차 목록 조회 API 함수                                                                        | 라우터<br>공통 헤더·레이아웃                                                       |
| **🧼: 오세영** | **결제 대기**<br>예약 카드·안내·버튼<br>예약 상세 API 연동·빈 결과 안내                                                                             | 공통 운행정보 컴포넌트<br>Axios·TanStack Query 기반 설정<br>SVGR                   |

화면별 컴포넌트와 API 함수를 공유하고, <br />
통합 단계에서 실제 검색 조건과 예약 ID를 연결했습니다.

<br />

## 💅🏽: Tech Stack

| 카테고리        | 기술                              |
| --------------- | --------------------------------- |
| UI Library      | React                             |
| Language        | TypeScript                        |
| Build Tool      | Vite                              |
| Runtime         | Node.js                           |
| Package Manager | pnpm                              |
| Styling         | Tailwind CSS · 디자인 토큰        |
| Routing         | React Router                      |
| HTTP Client     | Axios                             |
| Server State    | TanStack Query                    |
| Local State     | React useState · useRef           |
| SVG             | SVGR                              |
| CI              | GitHub Actions                    |
| Deployment      | Vercel                            |
| Git Hooks       | Husky · lint-staged               |
| Formatting      | ESLint · Prettier                 |
| Collaboration   | GitHub · Notion · Discord · Figma |

<br />

## 🚄: 구현 범위

### Main Flow

홈 → 열차 조회 → 좌석 선택 → 결제 대기 예약 목록

<br />

## 📤: Directory Structure

### [최종 구조]

```text
src
├── app
│   ├── layout
│   ├── providers
│   ├── router
│   ├── App.tsx
│   └── main.tsx
├── pages
│   ├── home
│   │   ├── assets
│   │   ├── components
│   │   └── home-page.tsx
│   ├── train-search
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── types
│   │   └── train-search-page.tsx
│   ├── seat-selection
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   └── seat-selection-page.tsx
│   ├── reservation-confirmation
│   │   ├── api
│   │   ├── components
│   │   └── reservation-confirmation-page.tsx
│   └── ui
│       ├── examples
│       ├── example-card.tsx
│       └── style-guide.tsx
├── shared
│   ├── api
│   ├── assets
│   ├── components
│   └── styles
│       └── tokens
└── vite-env.d.ts
```

### [코드 배치 기준]

| 폴더         | 역할                                      |
| ------------ | ----------------------------------------- |
| `app`        | 앱 진입점·라우터·Provider·공통 레이아웃   |
| `pages`      | 페이지별 UI·상태·API 연동                 |
| `api`        | 서버 요청 함수와 관련 타입                |
| `components` | 화면 또는 공통 UI                         |
| `hooks`      | React 상태·요청 흐름을 관리하는 커스텀 훅 |
| `types`      | 여러 파일에서 사용하는 데이터 타입        |
| `shared`     | 여러 페이지에서 재사용하는 코드·에셋      |
| `styles`     | 전역 스타일과 디자인 토큰                 |

<br />
: API 요청 함수는 각 페이지의 `api`에, Query Key와 요청 상태는 사용하는 페이지 컴포넌트에 정의합니다.

공통 Axios 클라이언트와 응답 래퍼 타입은 `shared/api`에서 관리합니다.

<br />

## 🔌 API 연동

| 기능           | 요청                                                         |
| -------------- | ------------------------------------------------------------ |
| 열차 목록      | `GET /api/v1/schedules`                                      |
| 열차 상세·운임 | `GET /api/v1/schedules/{scheduleId}`                         |
| 호차 목록      | `GET /api/v1/schedules/{scheduleId}/coaches`                 |
| 좌석 배치      | `GET /api/v1/schedules/{scheduleId}/coaches/{coachId}/seats` |
| 예약 생성      | `POST /api/v1/reservations`                                  |
| 예약 상세      | `GET /api/v1/reservations/{reservationId}`                   |

- 조회 데이터는 TanStack Query로 관리합니다.
- 예약 생성은 Mutation으로 처리합니다.
- 검색 구간·날짜는 URL의 쿼리 파라미터로 전달합니다.
- 예약 생성·상세 조회에는 테스트 회원 헤더 `Member-Id: 1`을 사용합니다.
- 결제 대기는 예약 목록 API가 아닌, 전달받은 예약 ID의 단건 상세 조회로 구성합니다.
- 예약·좌석 데이터의 최신성이 필요한 곳에서는 개별 쿼리 옵션과 캐시 무효화를 적용합니다.

<br />

## 🤙🏽: Convention

<details>
<summary>📂폴더·파일 </summary>

<br />

- 폴더·파일 이름은 `kebab-case`를 사용합니다.
- 앱 진입 컴포넌트 `App.tsx`는 예외로 둡니다.
- 컴포넌트 이름은 `PascalCase`를 사용합니다.
- 여러 항목을 모으는 폴더는 복수형을 사용합니다.
- 페이지·기능 이름까지 일괄적으로 복수형으로 만들지 않습니다.

</details>

<details>
<summary>📦컴포넌트</summary>

<br />

- 컴포넌트 이름은 `PascalCase`를 사용합니다.
- 컴포넌트는 이름을 선언한 뒤 `default export`합니다.
- import할 때도 선언한 컴포넌트 이름을 유지합니다.
- 자식이 없으면 Self-closing 태그를 사용합니다.
- 목적에 맞는 시맨틱 태그를 사용합니다.
- 불필요한 래퍼 없이 여러 요소를 묶을 때 Fragment를 사용합니다.
- 클릭 가능한 좌석은 `button`으로 구현합니다.

</details>

<details>
<summary>🛍️타입</summary>

<br />

- 타입 이름은 `PascalCase`를 사용합니다.
- 객체 구조는 `interface`를 기본으로 사용합니다.
- 유니언 등에는 `type`을 사용합니다.
- 컴포넌트 입력 타입에만 `Props` 접미사를 붙입니다.
- 데이터 타입에는 역할이 드러나는 이름을 사용합니다.

API 요청·응답 타입은 서버 명세를 기준으로 작성합니다.

</details>

<details>
<summary>🗝️변수·함수·훅</summary>

<br />

- 변수·일반 함수는 `camelCase`를 사용합니다.
- 함수 이름은 동작과 대상이 드러나게 작성합니다.
- 이벤트 핸들러는 `handle`로 시작합니다.
- Boolean은 `is`, `has`, `can` 등 의미에 맞게 작성합니다.
- 커스텀 훅은 `use`로 시작합니다.
- 화살표 함수를 기본으로 사용합니다.

</details>

<details>
<summary>🔁배열·리스트</summary>

<br />

- 새로운 배열·JSX 목록을 만들 때 `map`을 사용합니다.
- 배열을 조건으로 거를 때 `filter`를 사용합니다.
- 단순 순회 처리는 `forEach` 등을 사용합니다.
- 필요하면 `for…of` 등 목적에 맞는 반복문을 사용합니다.
- 객체의 값을 꺼낼 때 구조 분해 할당을 활용합니다.
- 동적 목록의 React `key`에는 데이터의 고유 ID를 사용합니다.
- React 상태와 Query 응답 데이터를 직접 변경하지 않습니다.

</details>

<details>
<summary>🧞‍♂️Tailwind·SVG</summary>

<br />

- Tailwind 클래스와 공통 디자인 토큰으로 스타일을 작성합니다.
- 색상·폰트·간격 기준은 `shared/styles`에서 관리합니다.
- 반복되는 UI는 공통 컴포넌트로 분리합니다.
- SVG는 필요한 경우 SVGR로 컴포넌트화합니다.
- 단색 아이콘은 `currentColor`로 색상을 제어합니다.
- 다색 로고·일러스트의 색상을 일괄 변환하지 않습니다.

</details>

<br />

## 🔖: Commit Convention

```text
type: 작업 내용
```

- 기능 단위로 작게 커밋합니다.
- 변경한 동작·대상을 구체적으로 작성합니다.
- `fix: 리뷰 반영`처럼 변경 내용을 알 수 없는 메시지는 지양합니다.

```text
init: 공통 라우터 설정
feat: 열차 목록 카드 구현
feat: 선택 좌석 예약 요청 연결
fix: 선택 불가 좌석 클릭 차단
docs: 프로젝트 실행 방법 추가
```

| 태그       | 의미                      |
| ---------- | ------------------------- |
| `init`     | 초기 세팅                 |
| `feat`     | 기능 추가                 |
| `fix`      | 오류 수정                 |
| `refactor` | 동작을 유지하는 구조 개선 |
| `build`    | 빌드 설정·의존성 변경     |
| `ci`       | CI 설정·스크립트 변경     |
| `docs`     | 문서 수정                 |
| `chore`    | 그 외 유지보수 작업       |

<br />

## 🔀: PR Convention

### PR 제목

타입의 첫 글자를 대문자로 작성하고, 작업 범위를 표시합니다.

```text
Feat(api): 열차 목록 조회 API 연동
Fix(ui): 예약 카드 로고 표시 수정
Chore(deploy): 코레일 모바일 웹 배포
```

### PR 작성·리뷰

- 하나의 PR은 하나의 명확한 작업 목적을 갖도록 작성합니다.
- 관련 이슈와 라벨을 연결합니다.
- UI 변경은 스크린샷 또는 영상을 첨부합니다.
- 최소 2명의 승인과 필수 검사 통과 후 병합합니다.
- 리뷰 없이 신뢰머지 ❌❌
- 리뷰는 확인한 동작과 개선점을 구체적으로 작성합니다.

<br />

## 🌴: GitHub Convention

### 브랜치 운영

| 브랜치                          | 용도           |
| ------------------------------- | -------------- |
| `main`                          | 운영 배포 기준 |
| `develop`                       | 기능 통합      |
| `init/기능명/#issue-number`     | 초기 설정      |
| `feat/기능명/#issue-number`     | 기능 개발      |
| `fix/기능명/#issue-number`      | 오류 수정      |
| `refactor/기능명/#issue-number` | 리팩토링       |

### 어벤져스's 개발 흐름

1. 이슈를 작성하고 담당자를 지정합니다.
2. 최신 `develop`에서 작업 브랜치를 생성합니다.
3. 작업 후 로컬 검사를 실행합니다.
4. `develop`을 대상으로 PR을 생성합니다.
5. 코드리뷰·필수 검사·프리뷰 확인 후 병합합니다.
6. 배포 시 `develop → main` PR로 반영합니다.
7. Production 배포 후 운영 환경에서 핵심 흐름을 확인합니다.

<br />

## 🔮: CI/CD

### PR 검사

`develop`·`main` 대상 PR에서 다음 항목을 검사합니다.

- ESLint
- Prettier
- TypeScript 검사 및 Vite 빌드

### Preview

- `develop` 대상 PR에서 실행합니다.
- 프리뷰 배포 후 PR 댓글에 배포 주소와 UI 가이드 링크를 표시합니다.

### Production

- `main`에 반영되면 운영 배포를 실행합니다.
- 배포 성공 후 운영 주소에서 조회·예약·결제 대기 흐름을 확인합니다.

### 환경변수

Vercel의 Preview·Production 환경에 `VITE_API_BASE_URL`을 등록합니다.

<br />

## UI 가이드(FOR 어벤져스)

공통 컴포넌트&페이지별 UI를 실제 컴포넌트·예시 props로 확인합니다.

- 로컬: `pnpm dev` 실행 후 `/ui` 접속
- PR 프리뷰: 배포 댓글의 **UI 가이드** 링크
- 운영: 기본 설정에서는 UI 가이드 경로 제외
- 명시적으로 활성화할 경우: `VITE_ENABLE_UI_GUIDE=true`

| 구분        | 파일                                                          |
| ----------- | ------------------------------------------------------------- |
| 공통 가이드 | `src/pages/ui/style-guide.tsx`                                |
| 홈          | `src/pages/ui/examples/home-examples.tsx`                     |
| 열차 조회   | `src/pages/ui/examples/train-search-examples.tsx`             |
| 좌석 선택   | `src/pages/ui/examples/seat-selection-examples.tsx`           |
| 결제 대기   | `src/pages/ui/examples/reservation-confirmation-examples.tsx` |

<br />

## 어벤져스's 협업 공간

[OUR Notion](https://app.notion.com/p/1Team-40ca4942abfc80a2aed2efed7e7affa9?source=copy_link) <br />
[Figma](https://www.figma.com/design/YFo1CRs1h7FJ77irj1JDJf)
