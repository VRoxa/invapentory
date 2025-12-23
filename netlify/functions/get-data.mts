import { getStore } from '@netlify/blobs';

const getData = async (req: Request) => {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');

  if (!key) {
    return new Response('Key is required', { status: 400 });
  }

  const store = getStore('invapentory');
  const data = await store.get(key, { type: 'json', consistency: 'strong' });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export default getData;
