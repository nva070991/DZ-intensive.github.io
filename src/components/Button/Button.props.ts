import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children : ReactNode,
	onClick: (e : React.MouseEvent<HTMLButtonElement>) => void;
	appearence: 'big' | 'small';
}