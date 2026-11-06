# 39-COLLABORATION-WEB-KORAIL

PLAY SOPT 39기 합동세미나 모바일 웹 1조 코레일 🚄
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

## 💅🏽: Tech Stack

| 카테고리                | 기술 스택                |
| ----------------------- | ------------------------ |
| UI Library              | React                    |
| Language                | TypeScript               |
| Build Tool              | Vite                     |
| Runtime                 | Node.js                  |
| Package Manager         | pnpm                     |
| Styling                 | Tailwind CSS             |
| Routing                 | React Router             |
| HTTP Client             | Axios                    |
| Server State Management | TanStack Query           |
| Local State             | React useState           |
| SVG                     | SVGR                     |
| Version Control         | Git · GitHub             |
| CI                      | GitHub Actions           |
| Deployment              | Vercel                   |
| Git Hooks               | Husky                    |
| Formatting              | ESLint · Prettier        |
| Cooperation             | Notion · Discord · Figma |

<br />

## 🚄: 구현 범위

### Main Flow

**홈 → 열차 조회 → 좌석 선택 → 결제 대기 예약 목록**

<br />

## 📤: Directory Structure

```text
src
├── app
│   ├── layout
│   ├── router
│   │   └── router.tsx
│   ├── providers
│   │   ├── query-client.ts
│   │   └── query-provider.tsx
│   ├── App.tsx
│   └── main.tsx
│
├── pages
│   ├── home
│   │   ├── components
│   │   └── home-page.tsx
│   │
│   ├── train-search
│   │   ├── api
│   │   ├── components
│   │   ├── hooks
│   │   ├── types
│   │   └── train-search-page.tsx
│   │
│   ├── seat-selection
│   │   ├── api
│   │   ├── components
│   │   ├── hooks
│   │   ├── types
│   │   └── seat-selection-page.tsx
│   │
│   └── payment
│       ├── components
│       ├── hooks
│       ├── types
│       └── payment-page.tsx
│
├── shared
│   ├── api
│   │   ├── client.ts
│   │   ├── query-keys.ts
│   │   └── reservation-api.ts
│   ├── constants
│   ├── hooks
│   ├── icons
│   ├── images
│   ├── styles
│   ├── types
│   ├── components
│   └── utils
│
└── vite-env.d.ts
```

| 폴더         | 역할                                      |
| ------------ | ----------------------------------------- |
| `app`        | 앱 진입점·라우터·Provider·공통 레이아웃   |
| `pages`      | 페이지별 구현                             |
| `api`        | 서버 요청 함수                            |
| `components` | UI 컴포넌트                               |
| `hooks`      | React 상태·요청 흐름을 관리하는 커스텀 훅 |
| `types`      | 여러 파일에서 사용하는 데이터 타입        |
| `shared`     | 여러 페이지가 공유하는 코드               |
| `constants`  | 고정 조회 조건 등 공통 상수               |
| `styles`     | 전역 스타일·디자인 토큰                   |
| `utils`      | 날짜·금액 변환 등 일반 함수               |

<br />

## 🤙🏽: Convention

<details>
<summary>📂폴더·파일 이름</summary>

<br />

- 폴더·파일 이름은 소문자로 시작하는 `kebab-case`를 사용합니다.
- 앱 진입 컴포넌트 `App.tsx`는 예외로 둡니다.
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
- 클릭 가능한 좌석은 `div` 대신 `button`을 기본으로 사용합니다.

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
- 단색 아이콘의 색상 제어에 `currentColor`를 사용합니다.
- 다색 로고·일러스트의 색상을 일괄 변환하지 않습니다.

</details>

<br />

## 🔖: Commit Convention

```text
type: 작업 내용
```

- 기능 단위로 작게 커밋합니다.
- 변경한 동작·대상을 구체적으로 작성합니다.
- 형식에 필요한 콜론은 유지합니다.
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

타입의 첫 글자를 대문자로 작성합니다.

```text
Feat: 열차 목록 조회 연동
Fix: 좌석 선택 상태 수정
Init: 라우터 설정
Init(project): PR 및 이슈 템플릿 설정
```

### PR 작성·리뷰

- 하나의 PR은 하나의 명확한 작업 목적을 갖도록 작성합니다.
- 관련 이슈와 라벨을 연결합니다.
- UI 변경은 스크린샷 또는 영상을 첨부합니다.
- 최소 2명의 승인과 필수 검사 통과 후 병합합니다.
- 리뷰 없이 신뢰머지 ❌❌
- 리뷰는 구체적으로 작성합니다.

<br />

## 🌴: GitHub Convention

### 브랜치 운영

| 브랜치                          | 용도             |
| ------------------------------- | ---------------- |
| `main`                          | 검증된 배포 기준 |
| `develop`                       | 기능 통합        |
| `init/기능명/#issue-number`     | 초기 세팅        |
| `feat/기능명/#issue-number`     | 기능 개발        |
| `fix/기능명/#issue-number`      | 오류 수정        |
| `refactor/기능명/#issue-number` | 리팩토링         |

기능명은 `kebab-case`를 사용합니다.

```text
init/router/#3
feat/train-search/#12
fix/seat-selection/#24
refactor/train-card/#30
```

### 어벤져스's 개발 흐름

1. 이슈를 작성하고 담당자를 지정합니다.
2. 최신 `develop`에서 작업 브랜치를 생성합니다.
3. 작업 후 로컬 검사를 실행합니다.
4. `develop`을 대상으로 PR을 생성합니다.
5. 2명 이상 승인 및 필수 검사 통과 후 병합합니다.
6. 검증된 내용을 `main`에 반영합니다.

<br />

## 어벤져스's 협업 공간

- [OUR Notion](https://app.notion.com/p/1Team-40ca4942abfc80a2aed2efed7e7affa9?source=copy_link)
- [Figma](https://www.figma.com/design/YFo1CRs1h7FJ77irj1JDJf)
