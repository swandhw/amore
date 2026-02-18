import type { SearchConditionValue } from "@/components/ap-wijmo/search/SearchConditionField";
import { type ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
export declare const normalizeFilterValue: (value: unknown) => string | null;
export declare function toDisplayString(value: SearchConditionValue): string;
