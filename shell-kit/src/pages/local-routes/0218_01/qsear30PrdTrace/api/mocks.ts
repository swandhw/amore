import { http, HttpResponse } from 'msw';

export const qsear30PrdTraceHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace/grd-roh6', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace/grd-hal3', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace/grd-fer1', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ message: payload });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace/options/authprdci', () => HttpResponse.json({ message: [
  ] })),
];
