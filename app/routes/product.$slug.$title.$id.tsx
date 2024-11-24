import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Image, Divider, Button } from '@nextui-org/react';
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
  const product = await fetch('https://fakestoreapi.com/products/1');
  const data = await product.json();
  return Response.json({ data, slug: `${params.slug} ${params.title}` });
}

export default function ProductDetail() {
  const { data } =
    (useLoaderData<typeof loader>() as LoaderData<TProduct>) || {};

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-between">
      <div className="flex flex-col lg:flex-row gap-6 max-w-full lg:max-w-4xl items-center lg:items-start">
        <div className="flex justify-center lg:justify-start w-full">
          <Image
            src={data.image}
            alt={data.title}
            isZoomed
            height={250}
            width={250}
            className="object-contain lg:h-400 lg:w-400"
          />
        </div>
        <div className="flex flex-col max-w-full lg:max-w-lg mt-4 lg:mt-0">
          <h1 className="font-bold text-2xl sm:text-3xl">{data.title}</h1>
          <div className="flex gap-6 mt-2 mb-2 text-lg sm:text-xl">
            <h3>Rp.{data.price}</h3>
            <h3>{data.category}</h3>
          </div>
          <Divider />
          <p className="text-gray-600">{data.description}</p>
          <Button color="primary" className="mt-4">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
