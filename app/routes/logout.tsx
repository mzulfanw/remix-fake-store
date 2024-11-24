import { logout } from '~/utils/auth.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Request } from '@remix-run/web-fetch';

export async function loader({ request }: LoaderFunctionArgs) {
  return await logout(request as unknown as Request);
}

export default function Logout() {
  return <p>logout</p>;
}
