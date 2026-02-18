import { http, HttpResponse } from 'msw';

export const dMmasmMenuHandlers = [
  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-menu', async () => {
    return HttpResponse.json({ responseBody: [
    ] });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-menu/datagrid2', async () => {
    return HttpResponse.json({ responseBody: [
    ] });
  }),

  http.post('/api/bff/basic-infos/ai-transform/d-mmasm-menu/commands/save', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({ responseBody: payload });
  }),

  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-menu/options/combo2', () => HttpResponse.json({ responseBody: [{
    'codeKorNameRe': 'sample1', 
    'commCode': 'sample1' 
  }
  ] })),
  http.get('/api/bff/basic-infos/ai-transform/d-mmasm-menu/options/combo1', () => HttpResponse.json({ responseBody: [{
    'codeKorNameRe': 'sample2', 
    'commCode': 'sample2' 
  }
  ] })),
];

// post 는 mutation 으로 분리 필요합니다.
export const dMmasmMenuMutationHandlers = [
  http.post('/api/bff/d-mmasm-menu', async ({ request }) => {
    const payload = await request.json();
    return HttpResponse.json({
      result: 'true',
      message: 'OK',
      responseBody: payload,
    });
  }),
]