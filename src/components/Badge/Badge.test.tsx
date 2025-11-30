import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders correctly with children', () => {
    render(<Badge>Test content</Badge>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container, rerender } = render(<Badge variant="default">Content</Badge>);
    expect(container.firstChild).toHaveClass('default');

    rerender(<Badge variant="success">Content</Badge>);
    expect(container.firstChild).toHaveClass('success');
    rerender(<Badge variant="warning">Content</Badge>);
    expect(container.firstChild).toHaveClass('warning');
    rerender(<Badge variant="error">Content</Badge>);
    expect(container.firstChild).toHaveClass('error');
    rerender(<Badge variant="info">Content</Badge>);
    expect(container.firstChild).toHaveClass('info');
  });

  it('applies size classes correctly', () => {
    const { container, rerender } = render(<Badge size="sm">Content</Badge>);
    expect(container.firstChild).toHaveClass('sm');

    rerender(<Badge size="md">Content</Badge>);
    expect(container.firstChild).toHaveClass('md');
    rerender(<Badge size="lg">Content</Badge>);
    expect(container.firstChild).toHaveClass('lg');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Badge ref={ref}>Content</Badge>);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">Content</Badge>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
