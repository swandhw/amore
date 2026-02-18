import { http, HttpResponse } from 'msw';

export const dMmasmBadCodeHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code', async () => {
    return HttpResponse.json({ message: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ message: payload });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/options/searchlistresult535-row', () => HttpResponse.json({ message: [
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/options/searchlistresult14-row', () => HttpResponse.json({ message: [
    { codeKorName: 'Yes', commCode: 'Y' },
    { codeKorName: 'No', commCode: 'N' },
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/options/combo1', () => HttpResponse.json({ message: [
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-bad-code/options/combo2', () => HttpResponse.json({ message: [
  ] })),
];
