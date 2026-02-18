# mocks.ts 비교 분석 (ASIS 원본 기준)

> **원칙:** D_MMASM_BAD_CODE.xfdl, D_MMASM_BAD_CODE-service.xml, D_MMASM_BAD_CODE_SAVE.java 에 없는 내용을 mocks.ts에 추가하면 안 된다.
>
> - 고객 mocks: `shell-kit/src/pages/local-routes/badCodeRegister/api/mocks.ts`
> - 자동생성 mocks: `shell-kit/src/pages/local-routes/dMmasmBadCode/api/mocks.ts`

---

## ASIS 원본에서 확인된 데이터 구조

### xfdl - Dataset 정의 (총 7개)

| Dataset ID | 컬럼 | xfdl rows | 용도 |
|------------|------|:---------:|------|
| `ds_datagrid1` | CUD_TYPE, PRD_CI, BAD_CI, BAD_CODE, BAD_CODE_NAME, CUD_CI, REMARK | 없음 | 메인 그리드 |
| `ds_SearchListResult24_Row` | CODE_KOR_NAME, COMM_CODE | **3행** (C/등록, U/수정, D/삭제) | CUD 유형 (그리드는 g_ds_CudType 사용) |
| `ds_SearchListResult535_Row` | CODE_KOR_NAME, COMM_CODE | 없음 | 제품구분 (그리드 PRD_CI 콤보) |
| `ds_SearchListResult20_Row` | CODE_KOR_NAME, COMM_CODE | 없음 | **사용처 없음** (코드만 존재) |
| `ds_SearchListResult14_Row` | CODE_KOR_NAME, COMM_CODE | **2행** (Y/Yes, N/No) | 사용유무 (그리드 CUD_CI 콤보) |
| `ds_combo1` | CODE_KOR_NAME_RE, COMM_CODE | 없음 | 코드타입 (검색콤보 + 그리드 BAD_CI 콤보) |
| `ds_combo2` | CODE_KOR_NAME_RE, COMM_CODE | 없음 | 사용유무 (검색콤보) |

### xfdl - Transaction 정의 (총 5개)

| strSvcId | 데이터 흐름 | 서비스 |
|----------|------------|--------|
| `codeType` | → ds_combo1 | MGENS_CODE_01-service (CODE_TYPE=020) |
| `useYn` | → ds_combo2 | MGENS_CODE_01-service (CODE_TYPE=014) |
| `prdCi` | → ds_SearchListResult535_Row | MGENS_CODE_01-service (CODE_TYPE=535) |
| `search` | → ds_datagrid1 | D_MMASM_BAD_CODE-service (find) |
| `save` | ds_datagrid1 → | D_MMASM_BAD_CODE-service (multi) |

### SAVE.java - 서버가 받는 파라미터

```
CUD_TYPE, PLANT, rowStatus, rownum, PRD_CI, BAD_CODE, BAD_CODE_NAME, BAD_CI, REMARK, CUD_CI, CHNG_ID, PROC_ID
```

---

## 비교 결과

### A. 메인 데이터 필드

| 필드 (camelCase) | xfdl 원본 | 고객 mocks | 자동생성 mocks | 판정 |
|-----------------|:---------:|:----------:|:-------------:|------|
| `cudType` (CUD_TYPE) | O | O | - | **자동생성 누락** (CUD_TYPE 제외 로직 때문) |
| `prdCi` (PRD_CI) | O | O | - | 자동생성: 빈 배열이라 필드 자체 없음 |
| `badCi` (BAD_CI) | O | O | - | 동일 |
| `badCode` (BAD_CODE) | O | O | - | 동일 |
| `badCodeName` (BAD_CODE_NAME) | O | O | - | 동일 |
| `cudCi` (CUD_CI) | O | O | - | 동일 |
| `remark` (REMARK) | O | O | - | 동일 |

- **자동생성**: 메인 데이터 빈 배열 (xfdl에 rows 없으므로 원칙에 부합)
- **고객**: 3행 샘플 데이터 하드코딩 (xfdl에 없는 데이터이지만 mock 목적)
- **핵심**: 자동생성 050에서 `CUD_TYPE`을 제외하는 로직이 있음 → **mocks에서는 서버 스키마이므로 CUD_TYPE 포함해야 함**

### B. 옵션 엔드포인트 비교

| xfdl Dataset | 고객 mocks 엔드포인트 | 자동생성 엔드포인트 | 데이터 | 판정 |
|---|---|---|---|---|
| `ds_SearchListResult24_Row` (CUD 유형) | `options/cud-type` (3행) | **없음** | C/등록, U/수정, D/삭제 | **자동생성 누락** (1) |
| `ds_SearchListResult535_Row` (제품구분) | `options/product-category` (2행 샘플) | `options/searchlistresult535-row` (빈) | xfdl rows 없음 | 엔드포인트명 차이, 데이터는 자동생성이 원칙에 부합 |
| `ds_combo1` (코드타입-그리드) | `options/bad-code-category` (2행 샘플) | `options/combo1` (빈) | xfdl rows 없음 | 엔드포인트명 차이 |
| `ds_SearchListResult14_Row` (사용유무-그리드) | `options/use-status` (2행) | `options/searchlistresult14-row` (2행) | Y/Yes, N/No | **데이터 일치** |
| `ds_combo2` (사용유무-검색) | `options/use-status-combo` (2행 샘플) | `options/combo2` (빈) | xfdl rows 없음 | 엔드포인트명 차이 |
| `ds_combo1` (코드타입-검색) | `options/code-type` (2행 샘플) | 해당없음 (combo1과 동일) | xfdl rows 없음 | **고객은 같은 ds에 2개 엔드포인트** (2) |
| (없음) | `options/empty` (빈) | **없음** | 빈 배열 | **xfdl 근거 불명** (3) |
| `ds_SearchListResult20_Row` | **없음** | **없음** | xfdl에 있으나 양쪽 모두 미사용 | 사용처 없어 정상 |

### C. 표현 방법 차이

| 항목 | 고객 mocks | 자동생성 mocks |
|------|-----------|---------------|
| **export 이름** | `badCodeRegisterHandlers` | `handlers` |
| **base URL** | `/api/bff/basic-infos/ai-transform/bad-code-register` | `/api/bff/d-mmasm-bad-code` |
| **응답 구조** | `{ message: data }` | `{ result: 'true', message: '', responseBody: data }` |
| **엔드포인트 명명** | 의미적 (`product-category`, `use-status`) | dataset ID 기반 (`searchlistresult535-row`, `combo1`) |
| **샘플 데이터** | xfdl에 rows 없는 것도 수동 추가 | xfdl rows 있는 것만 포함 |

---

## 핵심 발견사항

### 1. 자동생성에 누락된 항목 (ASIS 근거 있음)

**(1) `ds_SearchListResult24_Row` (CUD 유형 옵션)**
- xfdl에 dataset 정의 + rows 3행 있음 (C/등록, U/수정, D/삭제)
- 그리드의 CUD_TYPE 컬럼이 `g_ds_CudType` (전역, `g_` 접두사)을 사용하여 자동생성에서 skip됨
- 하지만 `ds_SearchListResult24_Row`는 xfdl에 독립적으로 존재하는 로컬 dataset

**(2) 메인 데이터의 CUD_TYPE 필드**
- 자동생성 050에서 `col_id != 'CUD_TYPE'` 조건으로 제외
- mocks.ts는 서버 스키마를 표현하므로, CUD_TYPE은 포함되어야 함 (서버에서 내려오는 필드)

### 2. 고객 mocks에서 xfdl 근거 불확실한 항목

**(1) `options/empty` 엔드포인트**
- xfdl에 대응하는 dataset이 불명확
- `ds_SearchListResult20_Row`가 후보이나 사용처 연결 불명

**(2) 같은 dataset에 대한 이중 엔드포인트**
- `options/bad-code-category`와 `options/code-type` 모두 ds_combo1 데이터
- 그리드용 / 검색콤보용 분리인데, xfdl에서는 하나의 dataset (ds_combo1)

**(3) 샘플 데이터 값**
- `product-category`의 MK/메이크업, SC/스킨케어 → xfdl에 rows 없음 (서버에서 동적 로드)
- `use-status-combo`의 Y/Yes, N/No → ds_combo2에 rows 없음
- 이 값들은 mock 목적상 필요하지만, 엄격한 원칙상 xfdl에 없는 데이터

### 3. 응답 구조 차이

고객의 `{ message: data }` vs 자동생성의 `{ result, message, responseBody }` — 실제 API 규격에 따라 결정될 사안. 현재 자동생성은 `ApiResponse` 타입 구조를 따르고 있음.

---

## 정리

| 구분 | 내용 | 심각도 |
|------|------|:------:|
| **자동생성 누락** | ds_SearchListResult24_Row (CUD 유형) 옵션 엔드포인트 | 중 |
| **자동생성 누락** | 메인 데이터의 CUD_TYPE 필드 (mocks에서는 서버 스키마) | 중 |
| **표현 차이** | 엔드포인트 명명: dataset ID 기반 vs 의미적 이름 | 낮음 |
| **표현 차이** | 응답 구조: `{ message }` vs `{ result, message, responseBody }` | 확인필요 |
| **고객측 원칙 위반 가능** | xfdl에 rows 없는 dataset의 샘플 데이터 수동 추가 | 낮음 (mock 목적) |
| **고객측 근거 불명** | `options/empty` 엔드포인트 | 낮음 |
