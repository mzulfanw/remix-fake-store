import { MetaFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { Input, Button } from '@nextui-org/react';
import type { ActionFunctionArgs } from '@remix-run/node';
import { createUserSession } from '~/utils/auth.server';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Cibaduyut Store - Login',
      description: 'Login to your account',
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  const errors = {} as Record<string, string>;

  if (!username) {
    errors['username'] = 'Username is required';
  }

  if (!password) {
    errors['password'] = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors });
  }

  const token = await fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'mor_2314',
      password: '83r5^_',
    }),
  });

  const url = new URL(request.url); // transform to new URL

  const userDestination = url.searchParams.has('redirectTo')
    ? url.searchParams.get('redirectTo')
    : '/';

  const data = await token.json();

  return createUserSession(data, userDestination as string);
}

export default function Login() {
  const { errors } = useActionData<typeof action>() || { errors: {} };

  const navigation = useNavigation();

  return (
    <Form method="post">
      <h1 className="text-center mb-4">Login</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter your Username"
          label="Username"
          name="username"
          isInvalid={!!errors?.username}
          errorMessage={errors?.username}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Enter your Password"
          label="Password"
          name="password"
          isInvalid={!!errors?.password}
          errorMessage={errors?.password}
        />
      </div>
      <div className="mb-4 w-full">
        <Button
          type="submit"
          color="primary"
          className="w-full"
          isDisabled={navigation.state === 'submitting'}
          isLoading={navigation.state === 'submitting'}
        >
          Action
        </Button>
      </div>
    </Form>
  );
}
