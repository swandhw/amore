import * as React from "react";

import { ResizableSplitView } from "@/components/layout/ResizableSplitView";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formStyles } from "@/components/ui/form-styles";

const DEFAULT_SPLIT_SIZE = 320;

const FormPanel = () => (
  <div className="space-y-5">
    <div className={formStyles.field}>
      <Label htmlFor="title">텍스트</Label>
      <Input id="title" placeholder="입력 내용을 적어주세요" />
      <p className={formStyles.helperText}>
        텍스트 스타일은 form-styles.ts에서 일괄 조정할 수 있습니다.
      </p>
    </div>

    <div className={formStyles.field}>
      <Label htmlFor="amount">숫자 입력</Label>
      <Input id="amount" type="number" placeholder="0" min={0} />
    </div>
    <div className={formStyles.field}>
      <Label>라디오</Label>
      <RadioGroup name="options" defaultValue="option-1">
        <label className="flex items-center gap-2 text-sm text-primary ">
          <RadioGroupItem value="option-1" />
          옵션 A
        </label>
        <label className="flex items-center gap-2 text-sm text-primary ">
          <RadioGroupItem value="option-2" />
          옵션 B
        </label>
      </RadioGroup>
    </div>
    <div className={formStyles.field}>
      <Label htmlFor="select">드롭다운</Label>
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
    </div>
  </div>
);

const PreviewPanel = () => (
  <div className="space-y-4">
    <div className="rounded-lg border border-dashed border-slate-300 bg-background  bg-slate-50 p-4">
      <p className="text-sm font-medium text-primary ">미리보기 영역</p>
      <p className="mt-2 text-sm text-primary ">
        입력 컴포넌트와 레이아웃 동작을 빠르게 확인할 수 있는 공간입니다.
      </p>
    </div>
    <div className="grid gap-3">
      {[
        "기본 텍스트",
        "상태 태그",
        "알림 카드",
        "요약 박스",
      ].map((label) => (
        <div
          key={label}
          className="rounded-md border border-slate-200 bg-white p-3 text-sm text-primary  shadow-sm"
        >
          {label}
        </div>
      ))}
    </div>
  </div>
);

export const TabbedStoryboardPage = () => {
  const [splitDirection, setSplitDirection] = React.useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [splitSize, setSplitSize] = React.useState(DEFAULT_SPLIT_SIZE);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-primary ">
          페이지 탭 기반 스토리보드
        </h1>
        <p className="mt-2 text-sm text-primary ">
          페이지 탭, 내부 탭, 가로/세로 스플릿뷰를 조합한 데모 화면입니다.
        </p>
      </div>

      <Tabs defaultValue="workspace">
        <TabsList>
          <TabsTrigger value="overview">요약</TabsTrigger>
          <TabsTrigger value="workspace">페이지 컨테이너</TabsTrigger>
          <TabsTrigger value="analytics">추가 페이지</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>개요</CardTitle>
              <CardDescription>
                상단의 페이지 탭에서 원하는 화면을 선택적으로 열람할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 text-sm text-primary ">
                <p>• 페이지 탭을 선택하면 해당 페이지 콘텐츠만 노출됩니다.</p>
                <p>• 각 페이지는 독립된 컨테이너와 내부 탭을 포함할 수 있습니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace">
          <Card>
            <CardHeader>
              <CardTitle>페이지 컨테이너</CardTitle>
              <CardDescription>
                내부 탭과 스플릿뷰를 포함한 레이아웃 예시입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() =>
                    setSplitDirection((prev) =>
                      prev === "horizontal" ? "vertical" : "horizontal"
                    )
                  }
                >
                  방향 전환
                </Button>
                <Button onClick={() => setSplitSize((size) => Math.max(200, size - 40))}>
                  더 좁게
                </Button>
                <Button onClick={() => setSplitSize((size) => size + 40)}>
                  더 넓게
                </Button>
                <Button onClick={() => setSplitSize(DEFAULT_SPLIT_SIZE)}>
                  리셋
                </Button>
                <span className="text-sm text-primary ">
                  현재 크기: {Math.round(splitSize)}px
                </span>
              </div>

              <Tabs defaultValue="inputs">
                <TabsList>
                  <TabsTrigger value="inputs">입력 컴포넌트</TabsTrigger>
                  <TabsTrigger value="details">추가 정보</TabsTrigger>
                </TabsList>

                <TabsContent value="inputs">
                  <ResizableSplitView
                    direction={splitDirection}
                    size={splitSize}
                    onSizeChange={setSplitSize}
                    primary={<FormPanel />}
                    secondary={<PreviewPanel />}
                  />
                </TabsContent>

                <TabsContent value="details">
                  <ResizableSplitView
                    direction={splitDirection}
                    size={splitSize}
                    onSizeChange={setSplitSize}
                    primary={
                      <div className="space-y-3 text-sm text-primary ">
                        <p>
                          내부 탭을 전환하면 다른 설명/메타 정보를 표시할 수
                          있습니다.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                          <li>스플릿뷰는 드래그로 크기 조절 가능</li>
                          <li>버튼으로도 크기를 제어할 수 있음</li>
                          <li>가로/세로 방향 전환 지원</li>
                        </ul>
                      </div>
                    }
                    secondary={<PreviewPanel />}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>추가 페이지 탭</CardTitle>
              <CardDescription>
                탭을 추가하면 필요한 페이지를 선택적으로 노출할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 text-sm text-primary ">
                <p>• 페이지 탭은 필요에 따라 늘리거나 줄일 수 있습니다.</p>
                <p>• 각 페이지는 독립적인 내부 탭을 구성할 수 있습니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedStoryboardPage