import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import { LoaderData, TProduct } from '~/types';

export const meta: MetaFunction<typeof loader> = params => {
  const { data } = params;
  return [
    {
      title: `Product - ${data?.slug}`,
      description: 'Product description',
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const category = await fetch(
    `https://fakestoreapi.com/products/category/${params.slug}`
  );
  const data: TProduct[] = await category.json();
  return Response.json({ data, slug: params.slug });
}

export default function Product() {
  const { data } = useLoaderData<typeof loader>() as LoaderData<TProduct[]>;

  return (
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
            <p className="mt-2 text-center text-tiny">{product.description}</p>
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
  );
}
