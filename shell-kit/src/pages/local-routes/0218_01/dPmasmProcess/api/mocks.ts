import { http, HttpResponse } from 'msw';

export const dPmasmProcessHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/d-pmasm-process', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-pmasm-process/grd-procdtl', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-pmasm-process/grd-gridt2', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/d-pmasm-process/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ message: payload });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-pmasm-process/options/cudci', () => HttpResponse.json({ message: [
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-pmasm-process/options/proccd', () => HttpResponse.json({ message: [
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-pmasm-process/options/prdci', () => HttpResponse.json({ message: [
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-pmasm-process/options/proctype', () => HttpResponse.json({ message: [
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-pmasm-process/options/plant', () => HttpResponse.json({ message: [
  ] })),
];
