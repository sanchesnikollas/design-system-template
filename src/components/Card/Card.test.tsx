import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';

describe('Card', () => {
  it('renders correctly with children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container, rerender } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstChild).toHaveClass('elevated');

    rerender(<Card variant="outlined">Content</Card>);
    expect(container.firstChild).toHaveClass('outlined');

    rerender(<Card variant="filled">Content</Card>);
    expect(container.firstChild).toHaveClass('filled');
  });

  it('applies padding classes correctly', () => {
    const { container, rerender } = render(<Card padding="none">Content</Card>);
    expect(container.firstChild).toHaveClass('padding-none');

    rerender(<Card padding="sm">Content</Card>);
    expect(container.firstChild).toHaveClass('padding-sm');

    rerender(<Card padding="md">Content</Card>);
    expect(container.firstChild).toHaveClass('padding-md');

    rerender(<Card padding="lg">Content</Card>);
    expect(container.firstChild).toHaveClass('padding-lg');
  });

  it('applies clickable state correctly', () => {
    const { container } = render(<Card clickable>Clickable</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('clickable');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('handles click events when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable onClick={handleClick}>
        Click me
      </Card>
    );

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies fullWidth class when prop is true', () => {
    const { container } = render(<Card fullWidth>Content</Card>);
    expect(container.firstChild).toHaveClass('fullWidth');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardHeader', () => {
  it('renders title and subtitle', () => {
    render(<CardHeader title="Title" subtitle="Subtitle" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<CardHeader title="Title" action={<button>Action</button>} />);
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('renders children instead of title/subtitle when provided', () => {
    render(<CardHeader>Custom header content</CardHeader>);
    expect(screen.getByText('Custom header content')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<CardHeader ref={ref} title="Title" />);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(<CardContent>Content here</CardContent>);
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<CardContent ref={ref}>Content</CardContent>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<CardFooter ref={ref}>Footer</CardFooter>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('Card composition', () => {
  it('renders complete card with all parts', () => {
    render(
      <Card>
        <CardHeader title="Header Title" subtitle="Header Subtitle" />
        <CardContent>Main content</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>
    );

    expect(screen.getByText('Header Title')).toBeInTheDocument();
    expect(screen.getByText('Header Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Footer actions')).toBeInTheDocument();
  });
});
