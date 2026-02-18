/**
 * Utility to inspect MSW requests for browser-based testing (manual or via console).
 * For automated tests running in a Node environment (like Vitest with JSDOM),
 * you would typically use `server.events` or a similar mechanism.
 *
 * Since the user asked for "browser testing automation", we'll hook into the `worker`
 * if running in browser, or `server` if running in node/test runner.
 */
type RequestLog = {
    method: string;
    url: string;
    body: any;
    query: Record<string, string>;
    timestamp: number;
};
export declare const MswInspector: {
    setup: () => void;
    getLogs: () => RequestLog[];
    clearLogs: () => void;
    getLastRequest: (method: string, urlPattern: string | RegExp) => RequestLog | undefined;
    waitForRequest: (method: string, urlPattern: string | RegExp, timeoutMs?: number) => Promise<RequestLog>;
};
export {};
