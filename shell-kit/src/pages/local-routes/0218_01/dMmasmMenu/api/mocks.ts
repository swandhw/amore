import { http, HttpResponse } from 'msw';

export const dMmasmMenuHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-menu', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-menu/datagrid2', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/d-mmasm-menu/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ message: payload });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-menu/options/combo2', () => HttpResponse.json({ message: [
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-menu/options/combo1', () => HttpResponse.json({ message: [
  ] })),
];
