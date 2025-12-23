import { getStore } from '@netlify/blobs';

const saveData = async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const store = getStore('invapentory');
  const body = await req.json();
  const { key, data } = body;

  await store.setJSON(key, data);

  const response = JSON.stringify({ message: 'Stock saved' });
  return new Response(response, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export default saveData;
