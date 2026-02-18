import { http, HttpResponse } from 'msw';

export const dMwrkrLineFpMoniHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni/datagrid1', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni/datagrid3', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni/datagrid4', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni/datagrid5', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni/datagrid6', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ message: payload });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni/options/searchlistresult044-row', () => HttpResponse.json({ message: [
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-mwrkr-line-fp-moni/options/combo3', () => HttpResponse.json({ message: [
  ] })),
];
