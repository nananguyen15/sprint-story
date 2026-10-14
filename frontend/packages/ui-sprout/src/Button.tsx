import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return <button className={`ss-button ss-button--${variant} ${className}`.trim()} {...props}>{children}</button>;
}
