import { http, HttpResponse } from 'msw';

export const qsear30PrdTraceDtlHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace-dtl', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace-dtl/grd-roh6', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace-dtl/grd-hal3', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace-dtl/grd-fer1', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace-dtl/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ message: payload });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-30-prd-trace-dtl/options/authprdci', () => HttpResponse.json({ message: [
  ] })),
];
