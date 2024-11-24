import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader() {
  return { date: new Date() };
}

export default function Index() {
  const { date } = useLoaderData<typeof loader>();

  return <p>{date.getDate()}</p>;
}
