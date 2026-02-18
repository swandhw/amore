export type BasicInfoOverviewRes = {
    screenName: string;
    serverTime: string;
};
export declare const fetchBasicInfoOverview: () => Promise<BasicInfoOverviewRes>;
