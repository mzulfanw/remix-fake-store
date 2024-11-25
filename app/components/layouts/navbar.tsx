import {
  Navbar as NextUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  Badge,
} from '@nextui-org/react';
import { useState } from 'react';
import { useRootData } from '~/root';
import { CartIcon } from '@nextui-org/shared-icons';
import { useFetcher } from '@remix-run/react';

export default function Navbar() {
  const { categories, user } =
    (useRootData() as {
      categories: { title: string; href: string }[];
      user: { data: { token: string } };
    }) || {};

  const [isOpen, setIsOpen] = useState(false);

  const fetcherCart = useFetcher({ key: 'add-to-cart' });

  const countCart = Number(fetcherCart.formData?.get('cart') || 0);

  return (
    <NextUINav shouldHideOnScroll onMenuOpenChange={setIsOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-black font-bold">
            Cibaduyut Store
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        {categories.length > 0 &&
          categories.map(category => (
            <NavbarItem key={category.href}>
              <Link color="foreground" href={category.href}>
                {category.title}
              </Link>
            </NavbarItem>
          ))}
      </NavbarMenu>
      <NavbarContent justify="end" className="items-center">
        <NavbarItem>
          <Link href="/cart" color="foreground" className="w-full">
            <Badge
              color="danger"
              content={countCart}
              shape="circle"
              isInvisible={fetcherCart.state === 'idle'}
            >
              <CartIcon className="w-full h-full block mx-auto" />
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href={user.data.token ? '/logout' : '/login'}
            variant="flat"
          >
            {user.data.token ? 'Logout' : 'Login'}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINav>
  );
}
