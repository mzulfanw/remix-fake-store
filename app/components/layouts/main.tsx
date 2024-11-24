import Navbar from '~/components/layouts/navbar';
import { Fragment, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Toaster />
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-10 xl:px-36 py-6 max-w-full sm:max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto">
        {children}
      </div>
    </Fragment>
  );
}
