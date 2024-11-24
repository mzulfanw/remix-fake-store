import {
  Navbar as NextUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
} from '@nextui-org/react';
import { useState } from 'react';
import { useRootData } from '~/root';

export default function Navbar() {
  const { categories, user } =
    (useRootData() as {
      categories: { title: string; href: string }[];
      user: { data: { token: string } };
    }) || {};

  const [isOpen, setIsOpen] = useState(false);

  return (
    <NextUINav shouldHideOnScroll onMenuOpenChange={setIsOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
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
      <NavbarContent justify="end">
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
