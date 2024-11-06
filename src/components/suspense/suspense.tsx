import { ReactNode } from 'react';
import { Spinner } from '../spinner';

type SuspenseProps = {
    children: ReactNode;
    isLoading: boolean;
}
export const Suspense = ({ children, isLoading }: SuspenseProps) => isLoading ? <Spinner/> : children;
