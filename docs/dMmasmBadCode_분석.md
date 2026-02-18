# dMmasmBadCode vs badCodeRegister 차이점 분석

정답지: `react/src/pages/badCodeRegister/`
변환결과: `react/src/pages/dMmasmBadCode/`

---

## 1. 파일 구조

| 정답지 | 변환결과 | 비고 |
|--------|----------|------|
| BadCodeRegisterTypes.ts | DMmasmBadCodeTypes.ts | |
| badCodeRegisterApi.ts | dMmasmBadCodeApi.ts | |
| useCreateBadCodRow.ts | useCreateDMmasmBadCodeRow.ts | |
| useCreateGridColumn.ts | useCreateGridColumn.ts | |
| BadCodeRegisterView.tsx | DMmasmBadCodeView.tsx | |
| BadCodeRegisterPage.tsx | DMmasmBadCodePage.tsx | |
| (없음) | DMmasmBadCode.META.json | 파이프라인 입력 메타데이터 |
| (없음) | constants.ts | 빈 파일 (내용 없음) |

---

## 2. Types 파일

### 2-1. Row 타입 필드명

| 정답지 | 변환결과 | 원본 컬럼ID |
|--------|----------|-------------|
| productCategory | prdCi | PRD_CI |
| badCodeCategory | badCi | BAD_CI |
| badCode | badCode | BAD_CODE |
| badCodeName | badCodeName | BAD_CODE_NAME |
| useStatus | cudCi | CUD_CI |
| remark | remark | REMARK |

- **차이 원인**: 정답지는 의미 기반 영문명으로 수작업 변환 (`PRD_CI` → `productCategory`). 변환결과는 원본 컬럼ID를 camelCase로 기계적 변환 (`PRD_CI` → `prdCi`).

### 2-2. SearchParams 필드명

| 정답지 | 변환결과 |
|--------|----------|
| codeType | combo1 |
| useStatus | combo2 |

- **차이 원인**: 정답지는 의미 기반 이름 사용. 변환결과는 Nexacro combo ID(`combo1`, `combo2`)를 그대로 camelCase 변환.

### 2-3. 보조 타입 목록

| 정답지 | 변환결과 |
|--------|----------|
| DsCombo1 | DsCombo1 |
| DsSearchListResult14Row | DsSearchListResult14Row |
| DsSearchListResult535Row | DsSearchListResult535Row |
| (없음) | DsCombo2 |

- **차이 원인**: 정답지에는 DsCombo2가 없음. 정답지에서 검색 combo "사용유무"는 `dsSearchListResult14Row` (그리드 컬럼과 동일 dataset)를 사용. 변환결과는 Nexacro 메타에 combo2의 innerdataset이 `ds_combo2`로 별도 정의되어 있어 DsCombo2 타입을 생성.

### 2-4. 타입 선언 순서

| 정답지 | 변환결과 |
|--------|----------|
| Row → SearchParams → DsCombo1 → 14 → 535 | Row → SearchParams → 535 → 14 → DsCombo1 → DsCombo2 |

- **차이 원인**: 정답지는 수작업 배치. 변환결과는 Datasets 배열 순서(메타 JSON 순서) 기준.

---

## 3. API 파일

### 3-1. 샘플 데이터 값

**정답지** — 실제 업무 데이터:
```ts
{ productCategory: 'MK', badCodeCategory: '0001', badCode: 'BC-001', badCodeName: '스크래치', useStatus: 'Y', remark: '출하 전 검사' }
```

**변환결과** — placeholder:
```ts
{ prdCi: 'SAMPLE1', badCi: 'SAMPLE1', badCode: 'SAMPLE1', badCodeName: 'SAMPLE1', cudCi: 'Y', remark: 'SAMPLE1' }
```

- **차이 원인**: 정답지는 실제 업무 도메인 값으로 수작업 작성. 변환결과는 메타 Dataset에 row 데이터가 없어 SAMPLE placeholder 생성.

### 3-2. 보조 fetch 함수 목록

| 정답지 | 변환결과 |
|--------|----------|
| fetchDsSearchListResult535Row | fetchDsSearchListResult535Row |
| fetchDsSearchListResult14Row | fetchDsSearchListResult14Row |
| fetchDsCombo1 | fetchDsCombo1 |
| (없음) | fetchDsCombo2 |

- **차이 원인**: 2-3과 동일. 정답지에는 DsCombo2 자체가 없으므로 fetch 함수도 없음.

### 3-3. fetchDsSearchListResult535Row 반환 패턴

**정답지** — Promise.resolve (동기):
```ts
export const fetchDsSearchListResult535Row = async () => {
  const response : ApiResponse<DsSearchListResult535Row[]> = {
    result: 'true', message: '', responseBody: [...]
  }
  return Promise.resolve(response);
};
```

**변환결과** — new Promise + setTimeout (비동기):
```ts
export const fetchDsSearchListResult535Row = async () => {
  return new Promise<ApiResponse<DsSearchListResult535Row[]>>(resolve => {
    setTimeout(() => { resolve({...}); }, 2_000);
  });
};
```

- **차이 원인**: 정답지에서 535는 Promise.resolve, 14와 combo1은 setTimeout. 변환결과는 모든 보조 fetch를 일괄 setTimeout으로 생성. 정답지의 535만 Promise.resolve인 이유는 수작업으로 혼용된 것으로, 파이프라인에서는 보조 fetch를 일관되게 setTimeout으로 통일.

### 3-4. fetchDsCombo1 setTimeout 시간

| 정답지 | 변환결과 |
|--------|----------|
| 1_000 | 2_000 |

- **차이 원인**: 정답지는 수작업으로 1초 설정. 변환결과는 모든 보조 fetch에 2초 고정.

### 3-5. 보조 fetch 샘플 데이터 값

**정답지**:
```ts
{ codeKorName: 'Yes', commCode: 'Y' }
{ codeKorNameRe: '원불량', commCode: '0001' }
```

**변환결과**:
```ts
{ codeKorName: 'SAMPLE1', commCode: 'SAMPLE1' }
{ codeKorNameRe: 'SAMPLE1', commCode: 'SAMPLE1' }
```

- **차이 원인**: 정답지는 실제 업무 데이터. 변환결과는 메타에 row 데이터가 없어 SAMPLE placeholder.

### 3-6. 정답지 주석

정답지에 있는 주석:
```ts
// 여긴 샘플데이터를 여기서 넣어주는데 api 호출로 바꾸어야 한다.
```

- 변환결과에는 없음. 수작업 메모.

---

## 4. useCreateRow 파일

### 4-1. 파일명

| 정답지 | 변환결과 |
|--------|----------|
| useCreateBadCodRow.ts | useCreateDMmasmBadCodeRow.ts |

- **차이 원인**: 정답지 파일명에 오타 (`BadCodRow`, `e` 누락). 변환결과는 `{ScreenName}Row` 규칙대로 생성.

### 4-2. 함수명

| 정답지 | 변환결과 |
|--------|----------|
| createBadCodeRow | createDMmasmBadCodeRow |

### 4-3. 필드명

Row 타입 필드명 차이와 동일 (2-1 참조).

### 4-4. useStatus 기본값 'Y'

| 정답지 | 변환결과 |
|--------|----------|
| useStatus: 'Y' | cudCi: 'Y' |

- 동일 동작. 컬럼명만 다름.

---

## 5. useCreateGridColumn 파일

### 5-1. 파라미터 순서

| 정답지 | 변환결과 |
|--------|----------|
| dsSearchListResult535Row, dsSearchlistresult14Row, dsCombo1 | dsSearchListResult535Row, dsCombo1, dsSearchListResult14Row |

- **차이 원인**: 정답지는 수작업 배치 (535 → 14 → combo1). 변환결과는 그리드 컬럼 순서 기준 (535 → combo1 → 14).

### 5-2. 정답지 파라미터명 대소문자 오류

정답지: `dsSearchlistresult14Row` (소문자 `l`, `r`)
변환결과: `dsSearchListResult14Row` (대문자 `L`, `R`)

- **차이 원인**: 정답지에 수작업 오타. 타입 선언 `DsSearchListResult14Row`와 불일치.

### 5-3. binding 필드명

Row 타입 필드명 차이와 동일 (2-1 참조). 예: `productCategory` vs `prdCi`.

### 5-4. HeaderTree 구조

**정답지** — createGroupNode 포함:
```ts
export const BAD_CODE_HEADER_TREE: HeaderNode[] = [
    createLeafNode("productCategory", "제품구분", "productCategory"),
    createGroupNode("badCodeGroup", "불량코드", [
        createLeafNode("badCodeCategory", "불량코드구분", "badCodeCategory"),
        createLeafNode("badCode", "불량코드", "badCode"),
        createLeafNode("badCodeName", "불량코드명", "badCodeName"),
    ]),
    createLeafNode("useStatus", "사용유무", "useStatus"),
    createLeafNode("remark", "비고", "remark"),
];
```

**변환결과** — 전부 leafNode:
```ts
export const D_MMASM_BAD_CODE_HEADER_TREE: HeaderNode[] = [
  createLeafNode("prdCi", "제품구분", "prdCi"),
  createLeafNode("badCi", "불량코드구분", "badCi"),
  createLeafNode("badCode", "불량코드", "badCode"),
  createLeafNode("badCodeName", "불량코드명", "badCodeName"),
  createLeafNode("cudCi", "사용유무", "cudCi"),
  createLeafNode("remark", "비고", "remark"),
];
```

- **차이 원인**: 정답지에서 "불량코드" 그룹 헤더는 수작업으로 묶은 것. Nexacro 메타에 멀티행 헤더(band) 정보가 없어 파이프라인은 전부 leafNode로 생성. createGroupNode 그룹핑은 자동화 불가.

### 5-5. HeaderTree 상수명

| 정답지 | 변환결과 |
|--------|----------|
| BAD_CODE_HEADER_TREE | D_MMASM_BAD_CODE_HEADER_TREE |

- **차이 원인**: 정답지는 의미 기반 이름. 변환결과는 Form ID (`D_MMASM_BAD_CODE`) 기준 자동 생성.

---

## 6. View 파일

### 6-1. CommonButtons title

| 정답지 | 변환결과 |
|--------|----------|
| `t('불량코드등록')` | `t('조회조건')` |

- **차이 원인**: 정답지는 화면 제목을 수작업 지정. 변환결과는 Statics에서 title/sub_title을 탐색하여 추출한 값 사용.
- **파이프라인 개선**: `get_screen_title` 우선순위를 `Form.titletext → title cssclass → sub_title cssclass → fallback`으로 변경. 7개 화면 중 6개는 `titletext`에 의미있는 제목이 있어 정확도 향상. dMmasmBadCode는 `titletext`가 빈 값이라 "조회조건" 유지 — 이 경우 수작업 필요.

### 6-2. 나머지

구조, props, JSX 레이아웃 모두 동일.

---

## 7. Page 파일

### 7-1. PAGE_NAME

| 정답지 | 변환결과 |
|--------|----------|
| `DPMASM_BAD_CODE_REGISTER_PAGE` | `D_MMASM_BAD_CODE_PAGE` |

- **차이 원인**: 정답지는 수작업 명명. 변환결과는 Form ID + `_PAGE` 규칙.

### 7-2. useState 개수

| 정답지 | 변환결과 |
|--------|----------|
| 3개 (535, 14, combo1) | 4개 (535, 14, combo1, combo2) |

- **차이 원인**: 2-3과 동일. 정답지에는 DsCombo2가 없으므로 useState도 3개.

### 7-3. 정답지 주석

정답지에만 있는 주석:
```ts
/*
this.gfn_Transaction(this,
"prdCi", "find00", "MGENS_CODE_01-service", ...
)
*/
```
```ts
// 초기값이 필요하다면 반드시 state를 사용해서 처리해야 한다. 그렇지 않으면 상태와 컴포넌트 불일치가 발생한다. 이 기능을 고치려 하지 마라.
```
```ts
// 마운트 시 최초 1회만 실행
```
```ts
// 1. 데이터 상태 업데이트
```

- **차이 원인**: 수작업 메모/참고 주석. 파이프라인은 주석 미생성.

### 7-4. searchFilters 초기값

| 정답지 | 변환결과 |
|--------|----------|
| `{ codeType: '0002', useStatus: 'N' }` | `{}` |

- **차이 원인**: 정답지는 비즈니스 요구에 따라 수작업으로 초기값 설정. 파이프라인은 메타에 초기값 정보가 없어 빈 객체.

### 7-5. searchFields id

| 정답지 | 변환결과 |
|--------|----------|
| `codeType`, `useStatus` | `combo1`, `combo2` |

- **차이 원인**: SearchParams 필드명 차이와 동일 (2-2 참조).

### 7-6. searchFields dataSource (combo2)

| 정답지 | 변환결과 |
|--------|----------|
| dsSearchListResult14Row | dsCombo2 |

- **차이 원인**: 정답지에서 "사용유무" 검색 combo는 그리드 컬럼과 같은 dataset(`dsSearchListResult14Row`)을 사용. 변환결과는 Nexacro 메타의 combo2 innerdataset(`ds_combo2`)을 그대로 사용.

### 7-7. searchFields dataPathToText (combo2)

| 정답지 | 변환결과 |
|--------|----------|
| `codeKorName` | `codeKorNameRe` |

- **차이 원인**: 7-6과 연관. 정답지는 `dsSearchListResult14Row`의 컬럼(`codeKorName`) 사용. 변환결과는 `dsCombo2`의 컬럼(`codeKorNameRe`) 사용.

### 7-8. searchFields defaultValue

| 정답지 | 변환결과 |
|--------|----------|
| `defaultValue: '0001'`, `defaultValue: 'N'` | (없음) |

- **차이 원인**: 비즈니스 요구. 파이프라인은 메타에 기본값 정보가 없어 미생성.

### 7-9. searchFields 텍스트 입력 (prdName)

정답지에만 있는 필드:
```ts
{ id: 'prdName', label: '제품명', type: 'text', required: false, defaultValue: '미백잔치' }
```

- **차이 원인**: Nexacro 메타의 Combo에 포함되지 않는 텍스트 입력 필드. 수작업 추가.

### 7-10. isSearchComboReady 체크 대상

| 정답지 | 변환결과 |
|--------|----------|
| `dsCombo1.length > 0 && dsSearchListResult14Row.length > 0` | `dsCombo1.length > 0 && dsCombo2.length > 0` |

- **차이 원인**: 7-6과 연관. 정답지는 검색 combo에 실제 사용하는 dataset 기준. 변환결과는 search_combos의 innerdataset 기준.

### 7-11. useEffect Promise.all 결과 변수

**정답지** — 짧은 별칭:
```ts
const [res535, res14, resCombo] = await Promise.all([...]);
const data535 = res535.responseBody || [];
setDsSearchListResult535Row(data535);
```

**변환결과** — 풀네임 직접 사용:
```ts
const [resDsSearchListResult535Row, ...] = await Promise.all([...]);
setDsSearchListResult535Row(resDsSearchListResult535Row.responseBody || []);
```

- **차이 원인**: 정답지는 수작업으로 짧은 별칭 + 중간 변수 사용. 변환결과는 기계적으로 `res` + 변수명.

### 7-12. GRID_COLUMNS 변수명

| 정답지 | 변환결과 |
|--------|----------|
| BAD_CODE_REGISTER_COLUMNS | D_MMASM_BAD_CODE_COLUMNS |

- **파이프라인 개선**: `GRID_COLUMNS` 고정 → `{FORM_ID}_COLUMNS` 패턴으로 변경 완료. 정답지의 `BAD_CODE_REGISTER_COLUMNS`와 정확히 같지는 않지만 (Form ID 기반 vs 의미 기반), 화면별 고유 이름 생성.

---

## 요약: 차이 분류

### 자동화로 동일하게 생성된 부분 (구조적 일치)
- View 파일 JSX 구조 (props, ViewFill, CommonButtons, FlexGrid)
- Page 파일 전체 흐름 (useState → searchFields → useEffect → useMemo → useGrid → closeGuard → handleSearchWithFilters → handleSearchWithGuard → handleGridInitialized → JSX)
- useCreateRow 구조 (빈 문자열 초기값, CUD_CI='Y')
- useCreateGridColumn 컬럼 정의 구조 (header, width, binding, dataType, dataMap)
- API 파일 구조 (fetch/save + 보조 fetch + ApiResponse)
- Types 파일 구조 (Row + SearchParams + 보조 타입)

### 수작업 영역 (자동화 불가)
- Row 필드명 의미 변환 (PRD_CI → productCategory)
- SearchParams 필드명 의미 변환 (combo1 → codeType)
- HeaderTree groupNode 묶기
- searchFields defaultValue, 초기값
- searchFields 텍스트 입력 필드 추가 (prdName)
- 샘플 데이터 실제 업무 값
- 주석
- 검색 combo에 그리드 dataset 재사용 (dsSearchListResult14Row)
- 보조 fetch 반환 패턴 혼용 (정답지의 535=Promise.resolve / 14,combo1=setTimeout 혼용은 메타데이터에서 구분 근거 없음. 파이프라인은 일괄 setTimeout으로 일관성 유지)
- CommonButtons title이 titletext 없는 화면 (dMmasmBadCode 등)

### 파이프라인 개선 완료
- ~~CommonButtons title 정확도 향상~~ → `Form.titletext` 우선 탐색으로 변경 (6/7 화면 정확)
- ~~GRID_COLUMNS 변수명~~ → `{FORM_ID}_COLUMNS` 패턴으로 화면별 구분
- ~~보조 fetch 반환 패턴~~ → 자동화 불가 판정 (수작업 영역으로 이동)
