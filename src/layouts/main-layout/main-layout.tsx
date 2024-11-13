import { PropsWithChildren } from 'react';
import { Header } from '../../components/header';

type MainLayoutProps = {
    className?: string;
} & PropsWithChildren;
export const MainLayout = ({ children, className }: MainLayoutProps) => (
  <div className={`page ${className}`}>
    <Header/>
    {children}
  </div>
);
