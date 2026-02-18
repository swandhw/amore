# D_MMASM_BAD_CODE 변환 결과 비교 보고서

| 항목 | 내용 |
|------|------|
| 작성일 | 2026-02-03 |
| 정답지 | `react/src/pages/badCodeRegister/` |
| 생성물 | `react/src/pages/dMmasmBadCode/` |
| ASIS 원본 | `ASIS/APGMES/workspace/APGMES/MAS/D_MMASM_BAD_CODE/UI/ASIS/` |

---

## 1. 파일 구조 비교

| # | 정답지 (badCodeRegister) | 생성물 (dMmasmBadCode) | 비고 |
|---|-------------------------|----------------------|------|
| 1 | `BadCodeRegisterPage.tsx` | `DMmasmBadCodePage.tsx` | 화면명 차이 |
| 2 | `BadCodeRegisterView.tsx` | `DMmasmBadCodeView.tsx` | 화면명 차이 |
| 3 | `api/badCodeRegisterApi.ts` | `api/dMmasmBadCodeApi.ts` | 화면명 차이 |
| 4 | `hooks/useCreateBadCodRow.ts` | `hooks/useCreateDMmasmBadCodeRow.ts` | 화면명 차이 |
| 5 | `hooks/useCreateGridColumn.ts` | `hooks/useCreateGridColumn.ts` | 동일 파일명 |
| 6 | `types/BadCodeRegisterTypes.ts` | `types/DMmasmBadCodeTypes.ts` | 화면명 차이 |
| 7 | *(없음)* | `constants.ts` | 생성물에만 존재 (빈 파일) |
| 8 | *(없음)* | `DMmasmBadCode.META.json` | 생성물에만 존재 (파이프라인 중간산출물) |

> **파일 구조 판정**: 일치. `constants.ts`와 `META.json`은 파이프라인 부산물로 기능에 영향 없음.

---

## 2. 파일별 상세 비교

### 2.1 types/ - 타입 정의

| 항목 | 정답지 | 생성물 | 차이 사유 |
|------|--------|--------|-----------|
| Row 타입명 | `BadCodeRegisterRow` | `DMmasmBadCodeRow` | XFDL Form.id 기반 네이밍. 정상 |
| 필드: 제품구분 | `productCategory` | `prdCi` | XFDL binding `PRD_CI` → camelCase 변환 결과 |
| 필드: 불량코드구분 | `badCodeCategory` | `badCi` | XFDL binding `BAD_CI` → camelCase 변환 결과 |
| 필드: 사용유무 | `useStatus` | `cudCi` | XFDL binding `CUD_CI` → camelCase 변환 결과 |
| SearchParams 필드 | `codeType`, `useStatus` | `combo1`, `combo2` | 아래 [지적사항 A] 참조 |
| DsCombo2 타입 | *(없음)* | `DsCombo2` 존재 | 아래 [지적사항 B] 참조 |

#### XFDL 근거 — 필드명 차이

XFDL Dataset `ds_datagrid1`의 컬럼 정의 (xfdl 115~124줄):
```xml
<Column id="PRD_CI" size="256" type="STRING"/>
<Column id="BAD_CI" size="256" type="STRING"/>
<Column id="BAD_CODE" size="256" type="STRING"/>
<Column id="BAD_CODE_NAME" size="256" type="STRING"/>
<Column id="CUD_CI" size="256" type="STRING"/>
<Column id="REMARK" size="256" type="STRING"/>
```

파이프라인은 `PRD_CI` → `prdCi`, `BAD_CI` → `badCi`, `CUD_CI` → `cudCi`로 정확히 변환함.
정답지의 `productCategory`, `badCodeCategory`, `useStatus`는 **의미 기반 리네이밍**이며, 자동 변환으로는 불가능한 영역. **필드명 차이는 정상**.

---

### 2.2 hooks/useCreateGridColumn.ts - 그리드 컬럼 + 헤더 트리

| 항목 | 정답지 | 생성물 | 판정 |
|------|--------|--------|------|
| 컬럼 정의 함수 | `createDatagrid1ColumnDefinition` | `createDatagrid1ColumnDefinition` | **일치** |
| dataMap 매핑 | 정확 | 정확 | **일치** |
| HeaderTree 구조 | `createGroupNode("badCodeGroup", "불량코드", [...])` | `createGroupNode("badCodeGroup", "불량코드", [...])` | **일치** |
| 그룹 내 자식 | 3개 (불량코드구분, 불량코드, 불량코드명) | 3개 (불량코드구분, 불량코드, 불량코드명) | **일치** |
| 그룹 외 리프 | 제품구분, 사용유무, 비고 | 제품구분, 사용유무, 비고 | **일치** |

> **HeaderTree 구조 판정**: 완전 일치. binding명 차이만 존재하며 이는 2.1절과 동일 사유.

#### XFDL 근거 — 그룹핑 판단

XFDL head 밴드 (xfdl 25~37줄):
```xml
<Row size="24" band="head"/>   <!-- head row 0 -->
<Row size="24" band="head"/>   <!-- head row 1 -->
```
```xml
<Cell col="3" rowspan="2" text="불량코드구분"/>
<Cell col="4" rowspan="2" text="불량코드"/>
<Cell col="5" rowspan="2" text="불량코드명"/>
```

head row 2줄 구조에서 col 3·4·5의 헤더 텍스트가 공통 접두사 **"불량코드"** 를 공유.
→ `createGroupNode("badCodeGroup", "불량코드", [...])` 로 그룹핑 타당.

---

### 2.3 hooks/useCreateRow.ts - 행 생성

| 항목 | 정답지 | 생성물 | 판정 |
|------|--------|--------|------|
| 함수명 | `createBadCodeRow` | `createDMmasmBadCodeRow` | 화면명 차이. 정상 |
| useStatus/cudCi 기본값 | `'Y'` | `'Y'` | **일치** |
| 기타 필드 기본값 | `''` | `''` | **일치** |

#### XFDL 근거

XFDL 스크립트 `button2_onclick` (xfdl 306줄):
```javascript
this.ds_datagrid1.setColumn(addedRow, "CUD_CI", application.C_USEY);
```
`C_USEY` = `'Y'` → 사용유무 기본값 `'Y'` 설정. 양쪽 모두 정확.

---

### 2.4 api/ - API 함수

| 항목 | 정답지 | 생성물 | 판정 |
|------|--------|--------|------|
| 조회 함수 | `fetchBadCodeRegisters` | `fetchDMmasmBadCodes` | 화면명 차이. 정상 |
| 저장 함수 | `saveBadCodeRegisters` | `saveDMmasmBadCodes` | 화면명 차이. 정상 |
| fetch535 | 의미있는 샘플 (메이크업/스킨케어) | SAMPLE 데이터 | 아래 [지적사항 C] 참조 |
| fetchCombo1 | 의미있는 샘플 (원불량/사파불량) | SAMPLE 데이터 | 아래 [지적사항 C] 참조 |
| fetch14 | 의미있는 샘플 (Yes/No) | 의미있는 샘플 (Yes/No) | **일치** |
| fetchDsCombo2 | *(없음)* | 존재 | 아래 [지적사항 B] 참조 |

#### service.xml 근거 — API 엔드포인트

`D_MMASM_BAD_CODE-service.xml` (4~17줄):
```xml
<activity name="Search" class="com.Amore.MES.common.GridFilterProc">
  <property name="sql-key" value="D_MMASM_BAD_CODE.SELECT" />
</activity>
```

```xml
<activity name="SaveStates" class="com.Amore.MES.MAS.D_MMASM_BAD_CODE_SAVE">
```

EventRouter에서 `find` → `Search` (조회), `multi` → `SaveStates` (저장) 으로 라우팅.
→ 조회/저장 2개 API 함수 매핑 정확.

#### XFDL 근거 — 검색 파라미터

XFDL 스크립트 `button1_onclick` (xfdl 251~288줄):
```javascript
var comm_code = this.gfn_IsNull(this.combo1.value)?" ":this.combo1.value;
var sCUD_CI = this.combo2.value;
```
```javascript
var submitData = this.gfn_GetTranInfo("PLANT|LANG_TYPE|USER_PRD_CI")
  +" CUD_CI1="+cud_ci1+" CUD_CI2="+cud_ci2+" CUD_CI3="+cud_ci3
  +" COMM_CODE="+comm_code;
```

조회 시 `combo1`(코드타입)과 `combo2`(사용유무) 값으로 서버 호출.
정답지는 이를 `codeType`, `useStatus`로 의미 기반 리네이밍함.

---

### 2.5 View.tsx - 화면 컴포넌트

| 항목 | 정답지 | 생성물 | 판정 |
|------|--------|--------|------|
| 컴포넌트 구조 | ViewFill > CommonButtons + header + FlexGrid | 동일 | **일치** |
| CommonButtons title | `t('불량코드등록')` | `t('조회조건')` | 아래 [지적사항 D] 참조 |

#### XFDL 근거

XFDL Static `titleName` (xfdl 7줄):
```xml
<Static id="titleName" text="조회조건" cssclass="title"/>
```

XFDL의 `titleName.text`가 `"조회조건"`이므로 파이프라인이 이를 그대로 사용.
정답지의 `"불량코드등록"`은 화면의 실제 업무명을 반영한 **의미 기반 수정**.

---

### 2.6 Page.tsx - 페이지 컴포넌트

| 항목 | 정답지 | 생성물 | 판정 |
|------|--------|--------|------|
| 전체 구조 (state → fetch → useMemo → useGrid → View) | 동일 패턴 | 동일 패턴 | **일치** |
| searchFilters 초기값 | `{ codeType: '0002', useStatus: 'N' }` | `{}` (빈 객체) | 아래 [지적사항 E] 참조 |
| searchFields 'useStatus' combo | `dsSearchListResult14Row` 사용 | `dsCombo2` 사용 | 아래 [지적사항 F] 참조 |
| isSearchComboReady 조건 | `dsCombo1.length > 0 && dsSearchListResult14Row.length > 0` | `dsCombo1.length > 0 && dsCombo2.length > 0` | [지적사항 F]과 연관 |
| gfn_Transaction 주석 | 원본 호출 코드 주석 포함 | 없음 | 선택적 개선 사항 |

---

## 3. 지적사항 종합

### [A] SearchParams 필드명 — 의미 기반 리네이밍 필요 (Types)

| 구분 | 생성물 | 정답지 | XFDL 근거 |
|------|--------|--------|-----------|
| 코드타입 | `combo1` | `codeType` | XFDL combo1의 라벨 = "코드타입" (caption4 Static) |
| 사용유무 | `combo2` | `useStatus` | XFDL combo2의 라벨 = "사용유무" (caption50 Static) |

**현황**: 파이프라인이 combo의 `id`(combo1, combo2)를 그대로 사용.
**자동화 조건**: XFDL 스크립트에서 `gfn_Transaction`의 `strSvcId` 값 파싱 필요.
**영향 파일**: `Types.ts`, `Page.tsx` (searchFilters, handleSearchWithFilters)

---

### [B] DsCombo2 불필요 타입 생성 (Types, Api)

| 구분 | 생성물 | 정답지 |
|------|--------|--------|
| DsCombo2 타입 | 존재 | 없음 |
| fetchDsCombo2 함수 | 존재 | 없음 |

**XFDL 근거**: `ds_combo2`는 검색 영역의 "사용유무" 콤보용 Dataset이지만, 그리드 컬럼의 "사용유무"는 `ds_SearchListResult14_Row`를 사용 (xfdl 46줄):
```xml
<Cell col="6" combodataset="ds_SearchListResult14_Row"/>
```

XFDL 스크립트에서 `ds_combo2`와 `ds_SearchListResult14_Row`는 동일한 코드타입(014)을 조회하며 같은 데이터(Yes/No):
```javascript
// ds_combo2용 (xfdl 218줄)
submitData = "CODE_TYPE=014"+this.gfn_GetTranInfo("PLANT|LANG_TYPE");
```

**판정**: 정답지처럼 `ds_SearchListResult14_Row` 하나로 그리드 dataMap과 검색 combo를 공유하는 것이 적절.
**자동화 조건**: 스크립트에서 동일 CODE_TYPE 조회 감지 필요.

---

### [C] API 샘플 데이터 품질

| 구분 | 정답지 | 생성물 |
|------|--------|--------|
| fetch535 (제품구분) | `메이크업(MK)`, `스킨케어(SC)` | `SAMPLE1`, `SAMPLE2` |
| fetchCombo1 (코드타입) | `원불량(0001)`, `사파불량(0002)` | `SAMPLE1`, `SAMPLE2` |
| 메인 데이터 | 의미있는 불량코드 데이터 | `SAMPLE1`, `SAMPLE2` |

**XFDL 근거**: XFDL Dataset의 초기 rows에서 의미있는 데이터 확보 가능.

`ds_SearchListResult14_Row` (xfdl 104~113줄):
```xml
<Row><Col id="CODE_KOR_NAME">Yes</Col><Col id="COMM_CODE">Y</Col></Row>
<Row><Col id="CODE_KOR_NAME">No</Col><Col id="COMM_CODE">N</Col></Row>
```
→ 이 데이터는 생성물에도 정확히 반영됨 (Yes/Y, No/N).

`ds_SearchListResult535_Row`, `ds_combo1`은 초기 rows가 비어있어 서버 조회 후 채워지는 구조.
정답지의 샘플 데이터(메이크업, 원불량 등)는 **업무 지식 기반 수동 입력**이며 자동화 범위 밖.

**판정**: 파이프라인의 SAMPLE 데이터는 구조적으로 정상이나, 개발/테스트 편의를 위해 향후 개선 고려.

---

### [D] View title 텍스트

| 구분 | 정답지 | 생성물 | XFDL |
|------|--------|--------|------|
| CommonButtons title | `t('불량코드등록')` | `t('조회조건')` | `titleName.text = "조회조건"` |

**현황**: XFDL `titleName` Static의 text 값을 그대로 사용하여 `"조회조건"` 출력.
**판정**: 정답지의 `"불량코드등록"`이 업무적으로 적절.
**자동화 조건**: XFDL `Form.id` 또는 화면명 → 한글 매핑 테이블 필요.
**영향**: 060_view_page_assembler.py

---

### [E] 검색 필터 초기값 미설정

| 구분 | 정답지 | 생성물 |
|------|--------|--------|
| searchFilters 초기값 | `{ codeType: '0002', useStatus: 'N' }` | `{}` |
| searchFields defaultValue | `'0001'`, `'N'` | 없음 |

**XFDL 근거**: XFDL 스크립트 `fn_CallBack` (xfdl 402~403줄):
```javascript
}else if(strSvcID == "useYn"){
    this.combo2.set_value(application.C_USEY);
```
콜백에서 사용유무 기본값을 `'Y'`(application.C_USEY)로 설정.

**판정**: 초기값 설정은 XFDL 스크립트 분석이 필요한 영역. 파이프라인의 스크립트 파싱 범위 확장 시 자동화 가능.
현재는 수동 보정 필요.

---

### [F] 검색 영역 '사용유무' combo 데이터소스

| 구분 | 정답지 | 생성물 |
|------|--------|--------|
| 사용유무 dataSource | `dsSearchListResult14Row` | `dsCombo2` |
| dataPathToText | `codeKorName` | `codeKorNameRe` |

**XFDL 근거**: XFDL combo2 정의 (xfdl 54줄):
```xml
<Combo id="combo2" innerdataset="ds_combo2" datacolumn="CODE_KOR_NAME_RE"/>
```

XFDL상으로는 `ds_combo2`가 맞으나, `ds_combo2`와 `ds_SearchListResult14_Row`는 동일 코드(014)를 조회하여 동일 데이터를 보유.
정답지는 이를 하나로 통합하여 `ds_SearchListResult14_Row`만 사용.

**판정**: 기능적으로 동일 결과. 정답지 방식이 중복 제거 관점에서 우수.
파이프라인이 동일 코드타입 dataset을 감지하여 통합하는 로직은 현재 범위 밖.

---

## 4. 판정 요약

| # | 항목 | 판정 | 분류 |
|---|------|------|------|
| 1 | 파일 구조 | **일치** | - |
| 2 | HeaderTree 그룹핑 구조 | **일치** | - |
| 3 | 그리드 컬럼 정의 (dataMap 포함) | **일치** | - |
| 4 | 행 생성 기본값 (cudCi='Y') | **일치** | - |
| 5 | API 조회/저장 구조 | **일치** | - |
| 6 | View 컴포넌트 구조 | **일치** | - |
| 7 | Page 컴포넌트 패턴 | **일치** | - |
| A | SearchParams 필드명 (combo1→codeType) | **허용** | 수동 보정 영역 (스크립트 파싱 필요) |
| B | DsCombo2 불필요 생성 | **허용** | 수동 보정 영역 (스크립트 파싱 필요) |
| C | API 샘플 데이터 품질 | **허용** | 수동 보정 영역 |
| D | View title 텍스트 | **허용** | 수동 보정 영역 (매핑 테이블 필요) |
| E | 검색 필터 초기값 | **허용** | 수동 보정 영역 |
| F | 사용유무 combo 데이터소스 통합 | **허용** | 최적화 영역 |

---

## 5. ASIS 원본 참조 요약

### D_MMASM_BAD_CODE.xfdl
- Dataset `ds_datagrid1`: 7개 컬럼 (CUD_TYPE, PRD_CI, BAD_CI, BAD_CODE, BAD_CODE_NAME, CUD_CI, REMARK)
- Grid head: 2줄 구조, 컬럼 3·4·5 공통 접두사 "불량코드" → 그룹핑 근거
- Combo: combo1(ds_combo1, 코드타입), combo2(ds_combo2, 사용유무)
- gfn_Transaction: codeType(020), useYn(014), prdCi(535), search(find), save(multi)

### D_MMASM_BAD_CODE-service.xml
- `find` → Search activity: `D_MMASM_BAD_CODE.SELECT` (7개 파라미터)
- `multi` → SaveStates activity: `D_MMASM_BAD_CODE_SAVE` Java 클래스

### D_MMASM_BAD_CODE_SAVE.java
- CUD_TYPE별 분기: C=INSERT, U=UPDATE, D=DELETE
- 사용 컬럼: PRD_CI, BAD_CODE, BAD_CODE_NAME, BAD_CI, REMARK, CUD_CI, CHNG_ID, PROC_ID, PLANT
- CUD_CI='N' → 'D'(삭제) 변환 로직 포함
