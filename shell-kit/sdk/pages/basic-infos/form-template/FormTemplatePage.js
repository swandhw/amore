import { j as e } from "../../../jsx-runtime.js";
import l from "./FormTemplateView.js";
const i = [
  {
    id: "account-row",
    title: "계정 정보",
    fields: [
      {
        key: "userId",
        label: "사용자 ID",
        type: "text",
        size: 1,
        placeholder: "예: admin-user",
        initialValue: "admin-user"
      },
      {
        key: "joinedDate",
        label: "등록일",
        type: "date",
        size: 1,
        initialValue: "2024-03-01"
      },
      {
        key: "loginCount",
        label: "로그인 횟수",
        type: "number",
        size: 1,
        initialValue: "12"
      }
    ]
  },
  {
    id: "profile-row",
    title: "프로필 요약",
    fields: [
      {
        key: "displayName",
        label: "표시 이름",
        type: "text",
        size: 2,
        placeholder: "홍길동",
        initialValue: "관리자"
      },
      {
        key: "role",
        label: "권한",
        type: "text",
        size: 1,
        placeholder: "ROLE_ADMIN",
        initialValue: "ROLE_ADMIN"
      },
      {
        key: "score",
        label: "평점",
        type: "number",
        size: 1,
        initialValue: "5"
      }
    ]
  },
  {
    id: "memo-row",
    title: "비고",
    fields: [
      {
        key: "memo",
        label: "메모",
        type: "text",
        size: "*",
        placeholder: "남은 영역 전체를 사용합니다",
        initialValue: "운영 담당자 계정입니다."
      },
      {
        key: "lastUpdated",
        label: "최근 변경일",
        type: "date",
        size: 1,
        initialValue: "2024-04-08"
      }
    ]
  }
];
function o() {
  return /* @__PURE__ */ e.jsx(l, { rows: i });
}
export {
  o as default
};
