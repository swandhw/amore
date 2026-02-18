import { http, HttpResponse } from 'msw';

export const qcdvm10NewitemHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/qcdvm-10-newitem', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/qcdvm-10-newitem/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ message: payload });
  }),

];
