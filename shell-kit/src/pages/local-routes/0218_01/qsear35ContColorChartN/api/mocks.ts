import { http, HttpResponse } from 'msw';

export const qsear35ContColorChartNHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/qsear-35-cont-color-chart-n', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-35-cont-color-chart-n/grid02', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/qsear-35-cont-color-chart-n/grid03', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/qsear-35-cont-color-chart-n/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ message: payload });
  }),

];
