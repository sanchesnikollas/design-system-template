import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<Input label="Email" id="email-input" />);
    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', 'email-input');
    expect(input).toHaveAttribute('id', 'email-input');
  });

  it('renders helper text when provided', () => {
    render(<Input helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('renders error message when hasError is true', () => {
    render(<Input hasError errorMessage="This field is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('hides helper text when error is shown', () => {
    render(<Input helperText="Helper" hasError errorMessage="Error" />);
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders left icon when provided', () => {
    const Icon = () => <span data-testid="left-icon">icon</span>;
    render(<Input leftIcon={<Icon />} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when provided', () => {
    const Icon = () => <span data-testid="right-icon">icon</span>;
    render(<Input rightIcon={<Icon />} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container, rerender } = render(<Input size="sm" />);
    expect(container.querySelector('.inputContainer')).toHaveClass('sm');

    rerender(<Input size="md" />);
    expect(container.querySelector('.inputContainer')).toHaveClass('md');

    rerender(<Input size="lg" />);
    expect(container.querySelector('.inputContainer')).toHaveClass('lg');
  });

  it('applies fullWidth class when prop is true', () => {
    const { container } = render(<Input fullWidth />);
    expect(container.querySelector('.wrapper')).toHaveClass('fullWidth');
  });

  it('sets aria-invalid when hasError is true', () => {
    render(<Input hasError errorMessage="Error" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby for helper and error text', () => {
    const { rerender } = render(<Input id="test" helperText="Helper" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'test-helper');

    rerender(<Input id="test" hasError errorMessage="Error" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'test-error');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    expect(screen.getByRole('textbox', { hidden: true }) || document.querySelector('input')).toHaveAttribute('type', 'password');
  });
});
