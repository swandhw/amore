# AI 변환 모듈 가이드 v0.2.2

AI를 통한 변환 시 변수명과 함수명 규칙은 마스터 가이드를 따른다.
화면 변환을 위한 별도 규칙만 여기에 기재한다.

## v0.2와의 차이점

| 항목 | v0.2 | v0.2.2 |
|------|------|--------|
| Types 파일 | Dataset별 개별 파일 `types/{Dataset명}.ts` | 단일 파일 `types/{ScreenName}Types.ts` |
| Types 필드명 | SNAKE_CASE (`CODE_KOR_NAME`) | camelCase (`codeKorName`) |
| Hooks 구조 | `use{DatasetName}.ts` (Dataset별) | `useCreate{ScreenName}Row.ts` + `useCreateGridColumn.ts` |
| API 함수명 | `{svcId}` (예: `search`, `save`) | `fetch{DatasetName}` / `save{DatasetName}` |
| API 반환형식 | `data.body` | `{ message: data }` |
| Page 구현 | 커스텀 훅 `use{ScreenName}` | `useGrid` 공통 훅 + 개별 useState |
| View 버튼 | 일반 Button 컴포넌트 | `wjInput.Menu` with command 패턴 |
| Grid 컬럼 | View에서 정적 정의 | `useCreateGridColumn.ts`에서 동적 생성 (DataMap 포함) |
| Grid binding | SNAKE_CASE | camelCase |

## 화면 타입
화면은 일반 화면과 팝업 화면으로 나뉜다.

변환 대상 데이터는 다음으로 나뉘어 진다.

시스템, 화면 ID, 화면명, 메뉴1, 메뉴2

팝업 화면은 메뉴1, 메뉴2가 비어있다. 왜냐하면 직접 접속할 경로가 없기 때문이다.

데이터명은 이후 문서에서 모두 변수로 취급한다. curly brace 내의 명칭도 변수로 취급한다.

시스템에 따라 메뉴1, 메뉴2 명칭은 정의된 파일을 참고한다.

## 일반 화면의 생성 규칙
일반 화면 1개는 다음으로 분해된다.
- /menu1/menu2/{화면명}/{화면명}.META.json
- /menu1/menu2/{화면명}/{화면명}View.tsx
- /menu1/menu2/{화면명}/{화면명}Page.tsx
- /menu1/menu2/{화면명}/hooks/useCreate{화면명}Row.ts
- /menu1/menu2/{화면명}/hooks/useCreateGridColumn.ts
- /menu1/menu2/{화면명}/api/{screenName}Api.ts
- /menu1/menu2/{화면명}/types/{화면명}Types.ts

파일명은 종류에 따라 다음 규칙을 따른다.
- 파일의 생성 위치는 메뉴1, 2의 서브 디렉토리에 생성한다.
- 페이지, 뷰는 PascalCase 명칭에 Page, View가 추가로 붙는다.
- api 는 camelCase + Api.ts
- 훅은 useCreate + PascalCase + Row.ts, useCreateGridColumn.ts
- types 는 단일 파일 PascalCase + Types.ts

팝업은 일반 화면과 동일한 규칙을 따르며 생성되는 폴더위치만 /popup 으로 변경한다.

## 필드명 변환 규칙

SNAKE_CASE에서 camelCase로 변환한다.

| 원본 (SNAKE_CASE) | 변환 (camelCase) |
|-------------------|------------------|
| CODE_KOR_NAME | codeKorName |
| COMM_CODE | commCode |
| CODE_KOR_NAME_RE | codeKorNameRe |
| PRD_CI | prdCi |
| BAD_CI | badCi |
| BAD_CODE | badCode |
| BAD_CODE_NAME | badCodeName |
| CUD_CI | cudCi |

## META.json 구조

meta에 담길 내용은 v0.2와 동일하다.

```json
{
    "Datasets": [...],
    "Grids": [...],
    "Buttons": [...],
    "Combos": [...],
    "Scripts": [...]
}
```

## Types 파일 규칙

모든 타입을 단일 파일에 정의한다.

types/{화면명}Types.ts
```ts
// 메인 데이터 Row 타입 (그리드 바인딩용)
export type {화면명}Row = {
  productCategory: string;  // PRD_CI -> camelCase 변환
  badCodeCategory: string;  // BAD_CI -> camelCase 변환
  badCode: string;
  badCodeName: string;
  useStatus: string;        // CUD_CI -> 의미있는 이름으로 변환
  remark: string;
};

// 콤보박스/조회조건용 Dataset 타입
export type DsCombo1 = {
  codeKorNameRe: string;  // CODE_KOR_NAME_RE -> camelCase
  commCode: string;       // COMM_CODE -> camelCase
};

export type DsSearchListResult14Row = {
  codeKorName: string;
  commCode: string;
};

export type DsSearchListResult535Row = {
  codeKorName: string;
  commCode: string;
};
```

### 메인 Row 타입 명명 규칙
- 그리드에 바인딩되는 메인 데이터셋은 `{화면명}Row`로 명명
- ds_datagrid1 -> BadCodeRegisterRow
- 필드명은 바인딩 컬럼의 의미를 반영한 camelCase로 변환

### 보조 Dataset 타입 명명 규칙
- 콤보박스/조회조건용 Dataset은 원본 ID 기반 PascalCase
- ds_combo1 -> DsCombo1
- ds_SearchListResult535_Row -> DsSearchListResult535Row

## Hooks 파일 규칙

### useCreate{화면명}Row.ts
새 행 생성 함수를 정의한다.

hooks/useCreate{화면명}Row.ts
```ts
import type { {화면명}Row } from '../types/{화면명}Types';

export const create{화면명}Row = (): {화면명}Row => {
  return {
    productCategory: '',
    badCodeCategory: '',
    badCode: '',
    badCodeName: '',
    useStatus: 'Y',  // 기본값이 있는 경우 지정
    remark: '',
  };
};
```

### useCreateGridColumn.ts
그리드 컬럼 정의를 동적으로 생성한다. DataMap이 필요한 콤보 컬럼을 위해 Dataset을 파라미터로 받는다.

hooks/useCreateGridColumn.ts
```ts
import type { GridColumnDef } from "@/components/ap-wijmo/grid/GridTypes";
import type { {화면명}Row, DsCombo1, DsSearchListResult14Row, DsSearchListResult535Row } from "../types/{화면명}Types";
import { createDataMap } from "@/components/ap-wijmo/grid/Util";

export const createDatagrid1ColumnDefinition = ({
    dsSearchListResult535Row,
    dsSearchlistresult14Row,
    dsCombo1
  }: {
    dsSearchListResult535Row: DsSearchListResult535Row[],
    dsSearchlistresult14Row: DsSearchListResult14Row[],
    dsCombo1: DsCombo1[]
  }): GridColumnDef<{화면명}Row>[] => {

  return [
    {
      header: '제품구분',           // Grid.columns[].id (한글 헤더)
      width: '*',
      binding: 'productCategory',  // camelCase 바인딩
      dataType: 'String',
      dataMap: createDataMap(dsSearchListResult535Row, 'commCode', 'codeKorName')
    },
    {
      header: '불량코드구분',
      width: '*',
      binding: 'badCodeCategory',
      dataType: 'String',
      dataMap: createDataMap(dsCombo1, 'commCode', 'codeKorNameRe')
    },
    {
      header: '불량코드',
      width: '*',
      binding: 'badCode',
      dataType: 'String',
    },
    {
      header: '불량코드명',
      width: '*',
      binding: 'badCodeName',
      dataType: 'String',
    },
    {
      header: '사용유무',
      width: '*',
      binding: 'useStatus',
      dataType: 'String',
      dataMap: createDataMap(dsSearchlistresult14Row, 'commCode', 'codeKorName')
    },
    {
      header: '비고',
      width: '*',
      binding: 'remark',
      dataType: 'String',
    },
  ];
};
```

### Grid 컬럼 변환 규칙
- META.json의 Grids[].columns 정보를 기반으로 생성
- `id` -> `header` (한글 헤더 텍스트)
- `binding` -> camelCase로 변환
- `edittype: "combo"` -> `dataMap` 사용
- `combodataset` -> `createDataMap` 함수의 첫 번째 인자
- `combocodecol` -> `createDataMap` 두 번째 인자 (camelCase 변환)
- `combodatacol` -> `createDataMap` 세 번째 인자 (camelCase 변환)

## API 파일 규칙

api/{screenName}Api.ts
```ts
import type { {화면명}Row } from '../types/{화면명}Types';

// 메인 데이터 조회 (search 트랜잭션)
export const fetch{화면명}s = async () => {
  // TODO: 실제 API 호출로 변경
  const response = await fetch('/api/v1/services/{strSvcNm}/{strTransition}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const data = await response.json();
  return { message: data.body || [] };
};

// 메인 데이터 저장 (save 트랜잭션)
export const save{화면명}s = async (payload: {화면명}Row[]) => {
  const response = await fetch('/api/v1/services/{strSvcNm}/{strTransition}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  return { message: data };
};

// 조회조건/콤보 데이터 조회
export const fetchDsSearchListResult535Row = async () => {
  const response = await fetch('/api/v1/services/{strSvcNm}/{strTransition}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const data = await response.json();
  return { message: data.body || [] };
};

export const fetchDsSearchListResult14Row = async () => {
  // ...
};

export const fetchDsCombo1 = async () => {
  // ...
};
```

### API 함수 명명 규칙
- 조회: `fetch{DatasetName}` (복수형 s 붙임)
- 저장: `save{DatasetName}` (복수형 s 붙임)
- 메인 데이터셋: `fetch{화면명}s`, `save{화면명}s`
- 보조 데이터셋: `fetchDs{DatasetId}`

### API 반환 형식
- 모든 API는 `{ message: data }` 형식으로 반환
- 배열 데이터: `{ message: [] }`
- 성공 여부: `{ message: true/false }`

## Page 파일 규칙

{화면명}Page.tsx
```tsx
import { useEffect, useState } from 'react';

import {화면명}View from './{화면명}View';
import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';

import {
  fetch{화면명}s,
  save{화면명}s,
  fetchDsSearchListResult535Row,
  fetchDsSearchListResult14Row,
  fetchDsCombo1
} from './api/{screenName}Api';
import { create{화면명}Row } from './hooks/useCreate{화면명}Row';
import { createDatagrid1ColumnDefinition } from './hooks/useCreateGridColumn';

import type {
  DsSearchListResult14Row,
  DsSearchListResult535Row,
  DsCombo1
} from "./types/{화면명}Types";

export default function {화면명}Page() {
  // useGrid 훅 사용 - 그리드 CRUD 핸들러 제공
  const {
    handleSearch,
    handleCreate,
    handleDelete,
    handleCommit,
    handleGridInitialized,
  } = useGrid(
    create{화면명}Row,      // 새 행 생성 함수
    fetch{화면명}s,         // 조회 API
    save{화면명}s           // 저장 API
  );

  // 조회조건/콤보 데이터 상태
  const [dsSearchListResult535Row, setDsSearchListResult535Row] = useState<DsSearchListResult535Row[]>([]);
  const [dsSearchListResult14Row, setDsSearchListResult14Row] = useState<DsSearchListResult14Row[]>([]);
  const [dsCombo1, setDsCombo1] = useState<DsCombo1[]>([]);

  // 초기 데이터 로드
  useEffect(() => {
    handleSearch();

    fetchDsSearchListResult535Row().then((res) => {
      setDsSearchListResult535Row(res.message);
    });

    fetchDsSearchListResult14Row().then((res) => {
      setDsSearchListResult14Row(res.message);
    });

    fetchDsCombo1().then((res) => {
      setDsCombo1(res.message);
    });
  }, [handleSearch]);

  // 그리드 컬럼 정의 (DataMap 포함)
  const GRID_COLUMNS = createDatagrid1ColumnDefinition({
    dsSearchListResult535Row,
    dsSearchlistresult14Row: dsSearchListResult14Row,
    dsCombo1
  });

  return (
    <{화면명}View
      dsCombo1={dsCombo1}
      dsSearchlistresult14Row={dsSearchListResult14Row}
      gridHeaderDefinition={GRID_COLUMNS}
      onSearch={handleSearch}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onCommit={handleCommit}
      onGridInitialized={handleGridInitialized}
    />
  );
}
```

### Page 구현 규칙
- `useGrid` 공통 훅 사용으로 그리드 CRUD 로직 재사용
- 조회조건/콤보 데이터는 개별 `useState`로 관리
- `useEffect`에서 초기 데이터 로드
- 그리드 컬럼 정의는 `createDatagrid1ColumnDefinition` 호출

## View 파일 규칙

{화면명}View.tsx
```tsx
import * as wjInput from '@mescius/wijmo.react.input';
import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FlexGrid } from '@mescius/wijmo.grid';

import type { {화면명}Row, DsCombo1, DsSearchListResult14Row } from './types/{화면명}Types';
import type { GridColumnDef } from '@/components/ap-wijmo/grid/GridTypes';

export type {화면명}ViewProps = {
  dsCombo1: DsCombo1[];
  dsSearchlistresult14Row: DsSearchListResult14Row[];
  gridHeaderDefinition: GridColumnDef<{화면명}Row>[];
  onSearch: () => void;
  onCreate: () => void;
  onDelete: () => void;
  onCommit: () => void;
  onGridInitialized: (grid: FlexGrid) => void;
};

const {화면명}View = (props: {화면명}ViewProps) => {
  const {
    gridHeaderDefinition,
    dsCombo1,
    dsSearchlistresult14Row,
    onSearch,
    onCreate,
    onDelete,
    onCommit,
    onGridInitialized,
  } = props;

  // wjInput.Menu command 패턴
  const createCommand = { executeCommand: onCreate };
  const deleteCommand = { executeCommand: onDelete };
  const searchCommand = { executeCommand: onSearch };
  const commitCommand = { executeCommand: onCommit };

  return (
    <>
      {/* 버튼 영역 */}
      <div className="flex flex-wrap items-center gap-2 pb-4">
        <wjInput.Menu header="생성" isButton command={createCommand} />
        <wjInput.Menu header="삭제" isButton command={deleteCommand} />
        <wjInput.Menu header="조회" isButton command={searchCommand} />
        <wjInput.Menu header="저장" isButton command={commitCommand} />
      </div>

      {/* 조회조건 영역 */}
      <header>
        <h1 className="text-2xl font-semibold text-primary">조회조건</h1>
        <span style={{ display: 'flex' }}>
          <div className="wj-labeled-input">
            <wjInput.ComboBox
              id="codeTypeFilter"
              itemsSource={dsCombo1}
              displayMemberPath="codeKorNameRe"
              selectedValuePath="commCode"
            />
            <label htmlFor="codeTypeFilter">코드타입</label>
          </div>
          <div className="wj-labeled-input">
            <wjInput.ComboBox
              id="useStatusFilter"
              itemsSource={dsSearchlistresult14Row}
              displayMemberPath="codeKorName"
              selectedValuePath="commCode"
            />
            <label htmlFor="useStatusFilter">사용유무</label>
          </div>
        </span>
      </header>

      {/* 그리드 영역 */}
      <div>
        <wjGrid.FlexGrid
          autoGenerateColumns={false}
          columns={gridHeaderDefinition}
          initialized={onGridInitialized}
        />
      </div>
    </>
  );
};

export default {화면명}View;
```

### View 구현 규칙
- 버튼은 `wjInput.Menu` 컴포넌트 사용 (`isButton` prop)
- 버튼 핸들러는 `command` 패턴 사용 (`{ executeCommand: handler }`)
- 조회조건 콤보박스는 `wjInput.ComboBox` 사용
- 그리드는 `wjGrid.FlexGrid` 사용
- 그리드 컬럼은 `gridHeaderDefinition` props로 전달받음
- 그리드 초기화 핸들러는 `initialized` props로 전달

### 버튼 매핑 규칙
| META.json Buttons | View 버튼 | 핸들러 |
|-------------------|-----------|--------|
| text: "조회" | header="조회" | searchCommand |
| text: "등록" | header="생성" | createCommand |
| text: "저장" | header="저장" | commitCommand |
| text: "삭제" | - | deleteCommand |
| text: "Excel" | - | (별도 구현) |
| text: "종료" | - | (별도 구현) |

## gfn_Transaction 변환 규칙 요약

| strSvcId | 변환 함수명 | 용도 |
|----------|-------------|------|
| search | fetch{화면명}s | 메인 데이터 조회 |
| save | save{화면명}s | 메인 데이터 저장 |
| codeType | fetchDsCombo1 | 콤보 데이터 조회 |
| useYn | fetchDsSearchListResult14Row | 콤보 데이터 조회 |
| prdCi | fetchDsSearchListResult535Row | 콤보 데이터 조회 |

### 규칙
- `strOutDatasets`가 있고 `strInDatasets`가 없으면 조회 함수
- `strInDatasets`가 있으면 저장 함수
- 함수명은 `strOutDatasets`의 Dataset ID 기반으로 결정
- 메인 그리드 바인딩 Dataset (ds_datagrid1)은 화면명 기반 함수명 사용
