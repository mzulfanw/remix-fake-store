import {
  useLoaderData,
  Form,
  useActionData,
  useNavigation,
} from '@remix-run/react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Image, Divider, Button } from '@nextui-org/react';
import { LoaderData, TProduct } from '~/types';
import { requireUserId } from '~/utils/auth.server';
import { Request } from '@remix-run/web-fetch';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  const gate = await requireUserId(request as unknown as Request);
  console.log(id, gate);

  const response = await fetch('https://fakestoreapi.com/carts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 5,
      date: '2020-02-03',
      products: [
        { productId: 5, quantity: 1 },
        { productId: 1, quantity: 5 },
      ],
    }),
  });

  if (!response.ok) {
    return Response.json({ error: 'Failed to add to cart' }, { status: 400 });
  }

  return Response.json({ success: 'Added to cart' });
}

export default function ProductDetail() {
  const navigation = useNavigation();

  const { data } =
    (useLoaderData<typeof loader>() as LoaderData<TProduct>) || {};

  const response = useActionData<typeof action>();

  useEffect(() => {
    if (response) {
      if ('success' in response) {
        toast.success(response.success);
      } else {
        toast.error(response.error);
      }
    }
  }, [response]);

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
          <Form method="post" className="w-full">
            <input type="hidden" name="id" value={data.id} />
            <Button
              color="primary"
              className="mt-4 w-full"
              type="submit"
              isDisabled={navigation.state === 'submitting'}
              isLoading={navigation.state === 'submitting'}
            >
              Add to Cart
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
