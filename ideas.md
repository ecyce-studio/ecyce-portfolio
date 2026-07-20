# Ecyce Portfolio — Design Ideas

## 참조 레이아웃
- **홈 화면 & 네비게이션**: matheus.works — 모자이크 그리드 히어로, 좌측 상단 로고, 우측 상단 텍스트 네비게이션
- **포트폴리오 그리드**: peterapple.com — 클라이언트별 섹션 헤더 + 3열 썸네일 그리드, 각 항목 클릭 시 상세 페이지 이동

## 세 가지 디자인 방향

### 1. Brutalist Signal
**Very Brief Intro**: 거친 타이포그래피와 날카로운 레이아웃으로 편집자의 강렬한 시선을 표현. 초록을 전기적 신호처럼 사용.
**Probability**: 0.07

### 2. Dark Craft (선택됨)
**Very Brief Intro**: 깊은 다크 배경 위에 초록 액센트가 빛나는 장인적 포트폴리오. 모자이크 히어로와 클린한 그리드의 조화.
**Probability**: 0.09

### 3. Terminal Minimal
**Very Brief Intro**: 코드 에디터 미학에서 영감받은 모노스페이스 타이포그래피와 초록 커서 효과.
**Probability**: 0.04

---

## 선택된 디자인: Dark Craft

**Design Movement**: Contemporary Dark Portfolio — 2020년대 크리에이티브 에이전시 미학

**Core Principles**:
1. 깊은 다크 배경(#0a0a0a)에 초록 액센트(#22c55e / #16a34a)로 시선 유도
2. 모자이크 히어로 그리드 — 기하학적 패턴 타일들이 화면을 가득 채움
3. 클라이언트 섹션별 구분 + 3열 썸네일 그리드로 작업물 전시
4. 호버 시 초록 오버레이 + 제목 슬라이드 인 효과

**Color Philosophy**:
- Background: `#0a0a0a` (거의 순수 블랙)
- Surface: `#111111`, `#1a1a1a` (레이어 구분)
- Primary Accent: `#22c55e` (초록 — 에너지, 창의성)
- Secondary Accent: `#16a34a` (딥 그린)
- Text: `#f0f0f0` (오프화이트), `#888888` (서브텍스트)
- Grid tiles: `#1a1a1a`, `#111111`, `#0d1a0d` (초록 틴트 다크)

**Layout Paradigm**:
- 홈: 전체화면 모자이크 그리드 히어로 (matheus.works 참조) + 인트로 텍스트 오버레이
- 포트폴리오: 클라이언트 섹션 헤더 + 반응형 3열 그리드 (peterapple.com 참조)
- 상세 페이지: 좌측 비디오/썸네일, 우측 프로젝트 정보
- 네비게이션: 고정 상단 바, 좌측 로고, 우측 메뉴 (WORK / ABOUT / CONTACT)

**Signature Elements**:
1. 기하학적 모자이크 타일 히어로 (초록 + 블랙 + 다크그레이 팔레트)
2. 초록 밑줄 호버 애니메이션 (네비게이션 링크)
3. 썸네일 호버 시 초록 오버레이 + 재생 아이콘

**Interaction Philosophy**:
- 모든 클릭 가능 요소는 초록 액센트로 반응
- 썸네일 호버: 스케일 업 + 초록 오버레이 + 제목 페이드인
- 페이지 전환: 부드러운 페이드 슬라이드

**Animation**:
- 히어로 타일: 순차적 페이드인 (stagger 50ms)
- 네비게이션 링크: 초록 언더라인 슬라이드 인 (150ms ease-out)
- 썸네일 호버: scale(1.03) + 오버레이 opacity 0→0.7 (200ms)
- 페이지 진입: opacity 0→1 + translateY(20px→0) (300ms)

**Typography System**:
- Display: Space Grotesk (Bold 700) — 히어로 텍스트, 프로젝트 제목
- Body: DM Sans (Regular 400, Medium 500) — 본문, 설명
- Accent: Space Mono (Regular) — 태그, 카테고리, 날짜
- Scale: 14px base, 1.5 line-height

**Brand Essence**:
Ecyce — 영상의 리듬을 설계하는 편집자. 크리에이터를 위한, 크리에이터에 의한 포트폴리오.
Adjectives: 날카로운, 몰입적인, 정밀한

**Brand Voice**:
- 헤드라인: "프레임 하나하나에 이야기를 담습니다" / "편집은 단순한 기술이 아닙니다 — 그것은 언어입니다"
- CTA: "작업물 보기" / "함께 만들어봐요"
- 금지: "Welcome to my portfolio" 같은 일반적 문구

**Wordmark & Logo**:
초록 사각형 안에 'E' 레터마크 — 편집 타임라인의 커트 포인트를 연상시키는 기하학적 형태

**Signature Brand Color**: `#22c55e` (Electric Green)

## Style Decisions
- 모자이크 타일은 SVG 기하학 패턴으로 구현 (초록/블랙/다크그레이 3색)
- 포트폴리오 그리드는 peterapple.com처럼 클라이언트명 대문자 이탤릭 헤더 + 3열 썸네일
- 네비게이션은 배경 없이 투명, 스크롤 시 반투명 블러 배경 적용
