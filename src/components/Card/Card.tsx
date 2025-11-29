import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Card.module.css';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante visual do card */
  variant?: CardVariant;
  /** Padding interno do card */
  padding?: CardPadding;
  /** Se o card é clicável (adiciona hover state) */
  clickable?: boolean;
  /** Se o card ocupa toda a largura */
  fullWidth?: boolean;
  /** Conteúdo do card */
  children: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Título do card */
  title?: ReactNode;
  /** Subtítulo do card */
  subtitle?: ReactNode;
  /** Ação no header (botão, ícone, etc.) */
  action?: ReactNode;
  /** Conteúdo customizado (substitui title/subtitle) */
  children?: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'md',
      clickable = false,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.card,
      styles[variant],
      styles[`padding-${padding}`],
      clickable && styles.clickable,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className, ...props }, ref) => {
    const classNames = [styles.header, className].filter(Boolean).join(' ');

    if (children) {
      return (
        <div ref={ref} className={classNames} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={classNames} {...props}>
        <div className={styles.headerContent}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action && <div className={styles.headerAction}>{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.content, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    const classNames = [styles.footer, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
