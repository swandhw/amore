# AI 변환 모듈 가이드

AI를 통한 변환시 변수명과 함수명 의 규칙은 마스터 가이드를 따른다.
화면 변환만을 위한 별도의 가이드를 여기에 기재한다.

## 화면 타입
화면은 일반 화면과 팝업 화면으로 나뉜다.

변환 대상 데이터는 다음으로 나뉘어 진다.

시스템, 화면 ID, 화면명, 메뉴1, 메뉴2

팝업 화면은 메뉴1, 메뉴2가 비어있다. 왜냐하면 직접 접속할 경로가 없기 때문이다.

데이터명은 이후 문서에서 모두 변수로 취급한다. curly brace 내의 명칭도 변수로 취급한다.

시스템에 따라 메뉴1, 메뉴2 명칭은 정의된 파일을 참고한다.

## 일반 화면의 생성 규생
일반 화면 1개는 다음으로 분해된다.
- /menu1/menu2/{화면명}/{화면명}.META.json
- /menu1/menu2/{화면명}/{화면명}View.tsx
- /menu1/menu2/{화면명}/{화면명}Page.tsx
- /menu1/menu2/{화면명}/hooks/use{Dataset명}.ts
- /menu1/menu2/{화면명}/api/{button1Onclick}Api.ts
- /menu1/menu2/{화면명}/api/{button2Onclick}Api.ts

파일명은 종류에 따라 다음 규칙을 따른다.
- 파일의 생성 위치는 메뉴1, 2의 서브 디렉토리에 생성한다.
- 페이지, 뷰는 PascalCase 명칭에 Page, View가 추가로 붙는다.
- api 는 camelCase.ts
- 훅은 useCamelCase.ts

팝업은 일반 화면과 동일한 규칙을 따르며 생성되는 폴더위치만 /popup 으로 변경한다.

meta에 담길 내용
```json
{
    "titletext": "불량 코드 조회",
    "controls": {
        "grid1": {
            "id": "",
            "oncellclick": "",
            "oncloseup": "",
            "columns": [{
                "id": "",
                "title": "",
                "type": "",
                "width": "",
                "displaytype":"",
                "edittype":"",
                "combodataset":"",
                "combocodecol":"",
                "combodatacol":"",
                "expr":"",
                "colspan":"",
                "rowspan":""
            }]

        },
        "combo": {
            "id": "",
            "codecolumn":"COMM_CODE",
            "datacolumn":"CODE_KOR_NAME",
            "innerdataset":"Dataset1"
        },
        "label": {
            "id": "titleName",
            "text": "조회조건",
        },
        "button": {
            "id": "button1",
            "text": "조회",
            "onclick": "button1_onclick"
        },
        "TabPages": [
            // tab page definition goes here
        ]
    },
    "Datasets": {
        "Dataset1": {
            "columns": [{ 
                "id": "CODE_KOR_NAME",
                "size": "256",
                "type": "string"
            }, { 
                "id": "COMM_CODE",
                "size": "256",
                "type": "STRING"
            }],
            "values": [{
                "CODE_KOR_NAME": "등록",
                "COMM_CODE": "C"
            }, {
                "CODE_KOR_NAME": "수정",
                "COMM_CODE": "U"
            },]
        }
    },
    "Scripts": [
        "Form_onload",
        "button1_onclick"
    ]
}
```

변환시 데이터셋은은 실제 데이터를 포함하는지 여부에 따라 다르게 취급된다.

데이터가 없다면 변수로서 참조된다.

데이터가 있다면 상수로 치환되어 상수 폴더에 저장된다.

Dataset 하나당 생성되어야 할 내용
- hook
- type
- const or api

hooks/useDataset1.ts
```ts

// Type은 CapitalizedCamelCase
export type Dataset1 = {
    CODE_KOR_NAME: string,
    COMM_CODE: string
};

// const 는 SCREAMING_SNAKE
const DATASET1: Dataset1[] = [{
    "CODE_KOR_NAME": "YES",
    "COMM_CODE": "Y"
}, {
    "CODE_KOR_NAME": "NO",
    "COMM_CODE": "N"
}];

export default DATASET1;

```

만약 데이터셋이 상수가 아니라면 API 호출이 함께 생성되어야 합니다.

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

api/useDsDatagrid1.ts
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

해당 함수 호출에서사용된 데이터 그리드의 타입을 동일하게 지정하여야 한다.

Page 에 담길 내용

```tsx
import BadCodeRegisterView from "./BadCodeRegisterView";
import DATASET1 from "./hooks/useBadCodeCombo1Dataset";


const strings = getCountries();

export default function BadCodeRegisterPage() {
  return <BadCodeRegisterView dataset1={DATASET1} />;
}

```
