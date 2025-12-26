
const auth = async (req: Request) => {
  const envPassword = (globalThis as any).process.env.ADMIN_KEY;
  const { password } = await req.json();

  if (password === envPassword) {
    const response = JSON.stringify({ authorized: true });
    return new Response(
      response,
      { status: 200 },
    );
  }

  const response = JSON.stringify({ authorized: false });
  return new Response(
    response,
    { status: 401 },
  );
};

export default auth;
