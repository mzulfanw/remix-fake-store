import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData, useSearchParams, Form } from '@remix-run/react';
import { LoaderData, TProduct } from '~/types';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
} from '@nextui-org/react';
import { Fragment, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Cibaduyut Store' },
    {
      name: 'description',
      content: 'Tempat barang barang branded dari A sampe Z',
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const response = await fetch('https://fakestoreapi.com/products');

  const data: TProduct[] = await response.json();

  if (search.has('search')) {
    const query = search.get('search');
    const filteredData = data.filter(product =>
      product.title.toLowerCase().includes(query?.toLowerCase() as string)
    );
    return Response.json({ data: filteredData });
  }

  return Response.json({ data });
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>() as LoaderData<TProduct[]>;
  const [params] = useSearchParams();
  const [queryParams, setQueryParams] = useState(params.get('search') || '');

  return (
    <Fragment>
      <Form className="mb-3">
        <Input
          placeholder="Search Product"
          type="text"
          name="search"
          value={queryParams}
          onValueChange={setQueryParams}
        />
      </Form>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map(product => (
          <Card
            className="py-2 px-2 w-full h-full flex flex-col"
            radius="md"
            key={product.title}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{product.title}</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex-grow flex flex-col items-center justify-between">
              <Image
                src={product.image}
                alt={product.title}
                className="object-cover rounded-xl block mx-auto"
                width={300}
                height={300}
              />
              <p className="mt-2 text-center text-tiny">
                {product.description}
              </p>
            </CardBody>
            <Button
              as={Link}
              to={`/product/${product.category}/${product.title}/${product.id}`}
              className="mt-4"
              prefetch="intent"
              color="primary"
            >
              Detail
            </Button>
          </Card>
        ))}
      </div>
    </Fragment>
  );
}
