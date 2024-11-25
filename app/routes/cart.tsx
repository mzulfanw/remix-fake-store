import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { requireUserId } from '~/utils/auth.server';
import { Request } from '@remix-run/web-fetch';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request as unknown as Request);

  const response = await fetch('https://fakestoreapi.com/carts/user/2');

  if (!response.ok) {
    return { status: 404, error: 'Cart not found' };
  }

  return await response.json();
}

export default function Cart() {
  const cart = useLoaderData<typeof loader>();
  console.log(cart);
  return <p>account</p>;
}
