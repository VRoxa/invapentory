
const getContactPhone = async () => {
  const phone = (globalThis as any).process.env.PHONE;
  return new Response(
      phone,
      { status: 200 },
  );
};

export default getContactPhone;
