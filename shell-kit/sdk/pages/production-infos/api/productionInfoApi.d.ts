export type ProductionInfoOverviewRes = {
    screenName: string;
    serverTime: string;
};
export declare const fetchProductionInfoOverview: () => Promise<ProductionInfoOverviewRes>;
