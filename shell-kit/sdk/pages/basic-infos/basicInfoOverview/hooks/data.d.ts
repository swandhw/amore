export type CountryScaleData = {
    id: number;
    country: string;
    active: boolean;
    sales: number;
    trends: number[];
};
export declare function getSparklines(data: number[]): string;
export declare const data: CountryScaleData[];
