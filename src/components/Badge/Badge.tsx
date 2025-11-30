import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante visual do componente */
  variant?: BadgeVariant;
  /** Tamanho do componente */
  size?: BadgeSize;
  /** Mostra apenas um ponto colorido sem texto */
  dot?: boolean;
  /** Conteúdo do componente */
  children?: ReactNode;
}

/**
 * Badge para indicar status, contagem ou categorias
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
