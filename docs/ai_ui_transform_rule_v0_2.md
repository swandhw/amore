# AI 변환 모듈 가이드

AI를 통한 변환 시 변수명과 함수명 규칙은 마스터 가이드를 따른다.
화면 변환을 위한 별도 규칙만 여기에 기재한다.

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
- /menu1/menu2/{화면명}/hooks/use{Dataset명}.ts
- /menu1/menu2/{화면명}/api/{screenName}Api.ts
- /menu1/menu2/{화면명}/types/{Dataset명}.ts

파일명은 종류에 따라 다음 규칙을 따른다.
- 파일의 생성 위치는 메뉴1, 2의 서브 디렉토리에 생성한다.
- 페이지, 뷰는 PascalCase 명칭에 Page, View가 추가로 붙는다.
- api 는 camelCase.ts
- 훅은 useCamelCase.ts
- types 는 Dataset id에 대응하는 PascalCase 타입을 export 한다.

팝업은 일반 화면과 동일한 규칙을 따르며 생성되는 폴더위치만 /popup 으로 변경한다.

meta에 담길 내용
```json
{
    "Datasets": [
        {
            "id": "ds_SearchListResult24_Row",
            "columns": [
                {
                    "id": "CODE_KOR_NAME",
                    "type": "STRING"
                },
                {
                    "id": "COMM_CODE",
                    "type": "STRING"
                }
            ],
            "rows": [
                {
                    "CODE_KOR_NAME": "등록",
                    "COMM_CODE": "C"
                },
                {
                    "CODE_KOR_NAME": "수정",
                    "COMM_CODE": "U"
                },
                {
                    "CODE_KOR_NAME": "삭제",
                    "COMM_CODE": "D"
                }
            ]
        },
        {
            "id": "ds_SearchListResult535_Row",
            "columns": [
                {
                    "id": "CODE_KOR_NAME",
                    "type": "STRING"
                },
                {
                    "id": "COMM_CODE",
                    "type": "STRING"
                }
            ]
        },
        {
            "id": "ds_SearchListResult20_Row",
            "columns": [
                {
                    "id": "CODE_KOR_NAME",
                    "type": "STRING"
                },
                {
                    "id": "COMM_CODE",
                    "type": "STRING"
                }
            ]
        },
        {
            "id": "ds_SearchListResult14_Row",
            "columns": [
                {
                    "id": "CODE_KOR_NAME",
                    "type": "STRING"
                },
                {
                    "id": "COMM_CODE",
                    "type": "STRING"
                }
            ],
            "rows": [
                {
                    "CODE_KOR_NAME": "Yes",
                    "COMM_CODE": "Y"
                },
                {
                    "CODE_KOR_NAME": "No",
                    "COMM_CODE": "N"
                }
            ]
        },
        {
            "id": "ds_combo1",
            "columns": [
                {
                    "id": "CODE_KOR_NAME_RE",
                    "type": "STRING"
                },
                {
                    "id": "COMM_CODE",
                    "type": "STRING"
                }
            ]
        },
        {
            "id": "ds_combo2",
            "columns": [
                {
                    "id": "CODE_KOR_NAME_RE",
                    "type": "STRING"
                },
                {
                    "id": "COMM_CODE",
                    "type": "STRING"
                }
            ]
        },
        {
            "id": "ds_datagrid1",
            "columns": [
                {
                    "id": "CUD_TYPE",
                    "type": "STRING"
                },
                {
                    "id": "PRD_CI",
                    "type": "STRING"
                },
                {
                    "id": "BAD_CI",
                    "type": "STRING"
                },
                {
                    "id": "BAD_CODE",
                    "type": "STRING"
                },
                {
                    "id": "BAD_CODE_NAME",
                    "type": "STRING"
                },
                {
                    "id": "CUD_CI",
                    "type": "STRING"
                },
                {
                    "id": "REMARK",
                    "type": "STRING"
                }
            ]
        }
    ],
    "Grids": [
        {
            "id": "datagrid1",
            "binddataset": "ds_datagrid1",
            "columns": [
                {
                    "id": "rowIndex",
                    "binding": "expr:currow+dataset._startRow",
                    "edittype": "none"
                },
                {
                    "id": "유형",
                    "binding": "CUD_TYPE",
                    "edittype": "combo",
                    "combodataset": "g_ds_CudType",
                    "combocodecol": "COMM_CODE",
                    "combodatacol": "CODE_KOR_NAME"
                },
                {
                    "id": "제품구분",
                    "binding": "PRD_CI",
                    "edittype": "combo",
                    "combodataset": "ds_SearchListResult535_Row",
                    "combocodecol": "COMM_CODE",
                    "combodatacol": "CODE_KOR_NAME"
                },
                {
                    "id": "불량코드구분",
                    "binding": "BAD_CI",
                    "edittype": "combo",
                    "combodataset": "ds_combo1",
                    "combocodecol": "COMM_CODE",
                    "combodatacol": "CODE_KOR_NAME"
                },
                {
                    "id": "불량코드",
                    "binding": "BAD_CODE",
                    "edittype": "normal"
                },
                {
                    "id": "불량코드명",
                    "binding": "BAD_CODE_NAME",
                    "edittype": "normal"
                },
                {
                    "id": "사용유무",
                    "binding": "CUD_CI",
                    "edittype": "combo",
                    "combodataset": "ds_SearchListResult14_Row",
                    "combocodecol": "COMM_CODE",
                    "combodatacol": "CODE_KOR_NAME"
                },
                {
                    "id": "비고",
                    "binding": "REMARK",
                    "edittype": "normal"
                }
            ]
        }
    ],
    "Buttons": [
        {
            "id": "button1",
            "text": "조회"
        },
        {
            "id": "button2",
            "text": "등록"
        },
        {
            "id": "button3",
            "text": "저장"
        },
        {
            "id": "button4",
            "text": "Excel"
        },
        {
            "id": "button5",
            "text": "종료"
        }
    ],
    "Combos": [
        {
            "id": "combo1",
            "innerdataset": "ds_combo1",
            "codecolumn": "COMM_CODE",
            "namecolumn": "CODE_KOR_NAME_RE"
        },
        {
            "id": "combo2",
            "innerdataset": "ds_combo2",
            "codecolumn": "COMM_CODE",
            "namecolumn": "CODE_KOR_NAME_RE"
        }
    ],
    "Scripts": [
        {
            "name": "gfn_Transaction",
            "objForm": "this",
            "strSvcId": "codeType",
            "strTransition": "find00",
            "strSvcNm": "MGENS_CODE_01-service",
            "strInDatasets": "",
            "strOutDatasets": "ds_combo1=dsr_SearchListResult",
            "strArgument": "submitData",
            "strCallbackFunc": "fn_CallBack",
            "bAsync": "",
            "bCompress": "",
            "bTraceLog": true
        },
        {
            "name": "gfn_Transaction",
            "objForm": "this",
            "strSvcId": "useYn",
            "strTransition": "find00",
            "strSvcNm": "MGENS_CODE_01-service",
            "strInDatasets": "",
            "strOutDatasets": "ds_combo2=dsr_SearchListResult",
            "strArgument": "submitData",
            "strCallbackFunc": "fn_CallBack",
            "bAsync": "",
            "bCompress": "",
            "bTraceLog": true
        },
        {
            "name": "gfn_Transaction",
            "objForm": "this",
            "strSvcId": "prdCi",
            "strTransition": "find00",
            "strSvcNm": "MGENS_CODE_01-service",
            "strInDatasets": "",
            "strOutDatasets": "ds_SearchListResult535_Row=dsr_SearchListResult",
            "strArgument": "submitData",
            "strCallbackFunc": "fn_CallBack",
            "bAsync": "",
            "bCompress": "",
            "bTraceLog": true
        },
        {
            "name": "gfn_Transaction",
            "objForm": "this",
            "strSvcId": "search",
            "strTransition": "find",
            "strSvcNm": "D_MMASM_BAD_CODE-service",
            "strInDatasets": "",
            "strOutDatasets": "ds_datagrid1=dsr_SearchListResult",
            "strArgument": "submitData",
            "strCallbackFunc": "fn_CallBack",
            "bAsync": "",
            "bCompress": "",
            "bTraceLog": true
        },
        {
            "name": "gfn_Transaction",
            "objForm": "this",
            "strSvcId": "save",
            "strTransition": "multi",
            "strSvcNm": "D_MMASM_BAD_CODE-service",
            "strInDatasets": "ds_datagrid1=ds_datagrid1:A",
            "strOutDatasets": "",
            "strArgument": "submitData",
            "strCallbackFunc": "fn_CallBack",
            "bAsync": "",
            "bCompress": "",
            "bTraceLog": true
        }
    ]
}

```

변환시 데이터셋은은 실제 데이터를 포함하는지 여부에 따라 다르게 취급된다.

데이터가 없다면 변수로서 참조된다.

데이터가 있더라도 상수로 고정하지 않는다.
rows는 반드시 API 함수가 반환하도록 하고, Hook에서는 useState로만 관리한다.

Dataset 하나당 생성되어야 할 내용
- hook
- type
- api

hooks/useDataset1.ts
```ts

// Type은 CapitalizedCamelCase
export type Dataset1 = {
    CODE_KOR_NAME: string,
    COMM_CODE: string
};

export type Dataset1State = {
    data: Dataset1[];
};

```

데이터셋이 rows를 가진 경우라도 API 호출이 함께 생성되어야 한다.

api/dataset1.ts

```ts
표준 fetch call with url and params
```

스크립트에서 변환되어야 할 내용

gfn_Transacion 하나당 API 호출 파일 하나

```js
this.gfn_Transaction( this,
    "search",
    "find",
    "D_MMASM_BAD_CODE-service",
    "",
    "ds_datagrid1=dsr_SearchListResult",
    submitData,
    "fn_Callback",
    "",
    "",
    true
);

this.gfn_Transaction( this,
    "save",
    "multi",
    "D_MMASM_BAD_CODE-service",
    "ds_datagrid1=ds_datagrid1:A",
    "",
    submitData,
    "fn_Callback",
    "",
    "",
    true
);

```

이 호출의 응답은 ds_datagrid1 이며 이것의 타입은 Dataset id="ds_datagrid1" 으로 정해져 있다.

따라서 이 함수 호출은 다음과 같은 결과를 생성해야 한다.

api/{screenName}Api.ts
```ts
export type DsDatagrid1 = {
    CUD_TYPE: string,
    PRD_CI: string,
    BAD_CI: string
};

const find = () : Promise<DsDatagrid1[]> => {
    // fetch call.
}

const multi = (sourceData : DsDatagrid1[]) : Promise<void> => {
    // savecall.
}

export find;
export multi;


```

해당 함수 호출에서 사용된 데이터 그리드의 타입을 동일하게 지정해야 한다.

gfn_Transaction 규칙 요약
- strOutDatasets가 있으면 "A=B"에서 A가 Dataset id이다.
  - A는 반드시 타입으로 정의하고, API 응답 타입으로 사용한다.
- strInDatasets가 있으면 POST 요청으로 처리한다.
  - "A=A:A" 형태면 A의 타입 배열을 body로 사용한다.

Page 에 담길 내용

```tsx
import BadCodeRegisterView from "./BadCodeRegisterView";
import useBadCodeRegister from "./hooks/useBadCodeRegister";


const strings = getCountries();

export default function BadCodeRegisterPage() {
  const {
    dsCombo1,
    dsCombo2,
    dsDatagrid1,
    handleSearch,
    handleCommit
  } = useBadCodeRegister();

  return (
    <BadCodeRegisterView
      dsCombo1={dsCombo1}
      dsCombo2={dsCombo2}
      dsDatagrid1={dsDatagrid1}
      onSearch={handleSearch}
      onCommit={handleCommit}
    />
  );
}

```

View 에 담길 내용
- Grid/Combo/Button은 View에서 렌더링한다.
- Button 핸들러는 Page에서 주입받는다.
