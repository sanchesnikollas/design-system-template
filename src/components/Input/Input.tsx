import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label do input */
  label?: string;
  /** Texto de ajuda abaixo do input */
  helperText?: string;
  /** Mensagem de erro */
  errorMessage?: string;
  /** Se o input está em estado de erro */
  hasError?: boolean;
  /** Tamanho do input */
  size?: InputSize;
  /** Se o input ocupa toda a largura */
  fullWidth?: boolean;
  /** Ícone à esquerda do input */
  leftIcon?: ReactNode;
  /** Ícone à direita do input */
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      hasError = false,
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const showError = hasError && errorMessage;
    const describedBy = [showError && errorId, helperText && helperId].filter(Boolean).join(' ');

    const wrapperClasses = [styles.wrapper, fullWidth && styles.fullWidth, className]
      .filter(Boolean)
      .join(' ');

    const inputContainerClasses = [
      styles.inputContainer,
      styles[size],
      showError && styles.error,
      disabled && styles.disabled,
      leftIcon && styles.hasLeftIcon,
      rightIcon && styles.hasRightIcon,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={inputContainerClasses}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            id={id}
            className={styles.input}
            disabled={disabled}
            aria-invalid={showError ? 'true' : undefined}
            aria-describedby={describedBy || undefined}
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
        {showError && (
          <span id={errorId} className={styles.errorMessage} role="alert">
            {errorMessage}
          </span>
        )}
        {helperText && !showError && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
