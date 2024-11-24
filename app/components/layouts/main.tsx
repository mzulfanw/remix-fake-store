import Navbar from '~/components/layouts/navbar';
import { Fragment, ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Navbar />
      <div className="px-4 py-6 max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        {children}
      </div>
    </Fragment>
  );
}
