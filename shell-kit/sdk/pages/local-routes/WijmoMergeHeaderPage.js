import { j as t } from "../../jsx-runtime.js";
import { useRef as o } from "react";
import { FlexGrid as d } from "@mescius/wijmo.react.grid";
import * as c from "@mescius/wijmo.grid";
import { applyHeaderLayout as l } from "../../components/ap-wijmo/grid/HeaderMergeManager.js";
const w = () => {
  const a = o(null), r = {
    rows: 5,
    // 총 헤더 줄 수
    cols: 5,
    // 총 컬럼 수
    cells: [
      { row: 0, col: 0, rowspan: 5, colspan: 1, label: "고정컬럼" },
      { row: 2, col: 2, rowspan: 1, colspan: 2, label: "가로병합" },
      // {2,2}~{2,3}
      { row: 3, col: 3, rowspan: 2, colspan: 1, label: "세로병합" }
      // {4,4}~{5,4}
      // 정의되지 않은 셀은 기본 label이 들어가거나 빈 셀로 처리
    ]
  }, i = (e) => {
    a.current = e, l(e, r);
  }, n = [
    {
      binding: "c1",
      // 데이터 소스의 키(Key)
      header: "사용자 ID",
      // 헤더에 표시될 텍스트
      width: 100,
      // 너비 (숫자 또는 "*" 등)
      align: "center",
      // 정렬 (left, center, right)
      isReadOnly: !0,
      // 편집 가능 여부
      dataType: "String"
      // 데이터 타입 (String, Number, Date, Boolean)
    },
    {
      binding: "c2",
      header: "금액",
      width: 100,
      // 가변 너비 (Flex)
      format: "n0",
      // 숫자 포맷 (세자리 콤마 등)
      align: "right",
      dataType: "String"
    },
    {
      binding: "c3",
      header: "가입일",
      width: 150,
      format: "yyyy-MM-dd",
      // 날짜 포맷
      dataType: "String"
    },
    {
      binding: "c4",
      header: "활성여부",
      width: 80,
      dataType: "String"
      // 체크박스로 자동 렌더링됨
    },
    {
      binding: "c5",
      header: "활성여부",
      width: 80,
      dataType: "String"
      // 체크박스로 자동 렌더링됨
    },
    {
      binding: "c6",
      header: "활성여부",
      width: 80,
      dataType: "String"
      // 체크박스로 자동 렌더링됨
    }
  ];
  return /* @__PURE__ */ t.jsx(
    d,
    {
      itemsSource: [{
        c1: "make up",
        c2: "raw",
        c3: "A001",
        c4: "용기가스 테스",
        c5: "Yes",
        c6: "테스트 사용중입니"
      }, {
        c1: "make up",
        c2: "plastic",
        c3: "A002",
        c4: "용기 성형불량",
        c5: "Yes",
        c6: "1월 15일 테스트함"
      }],
      initialized: i,
      allowMerging: c.AllowMerging.ColumnHeaders,
      columns: n
    }
  );
};
export {
  w as default
};
