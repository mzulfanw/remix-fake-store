import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { NextUIProvider } from '@nextui-org/react';
import Main from '~/components/layouts/main';

import './tailwind.css';
import { ReactNode } from 'react';
import { getUserSession } from '~/utils/auth.server';
import { Request } from '@remix-run/web-fetch';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const categories = await fetch(
    'https://fakestoreapi.com/products/categories'
  );
  const data: string[] = await categories.json();

  const user = await getUserSession(request as unknown as Request);

  return Response.json({
    categories: data.map(title => ({ title, href: `/category/${title}` })),
    user: user,
  });
}

export function useRootData() {
  return useLoaderData<typeof loader>();
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <Main>{children}</Main>
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
