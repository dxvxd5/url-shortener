import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './index';

describe('Checkbox Component', () => {
  it('generates a unique id based on the label and links the label to the checkbox', () => {
    render(<Checkbox label="Unique Label" />);
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Unique Label').closest('label');
    expect(label).toBeInTheDocument();
    expect(checkbox.id).toBe('unique-label-checkbox');
    if (label) expect(checkbox.id).toEqual(label.htmlFor);
  });

  it('renders the checkbox with the correct label', () => {
    render(<Checkbox label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with the correct initial checked state', () => {
    render(<Checkbox label="Test Label" checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  describe('onChange handler', () => {
    it('calls onChange handler when checkbox is clicked', () => {
      const handleChange = vi.fn();
      render(<Checkbox label="Test Label" onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox); // First click to toggle on
      expect(handleChange).toHaveBeenCalledWith(true);
      fireEvent.click(checkbox); // Second click to toggle off
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('calls onChange handler when label container is clicked', () => {
      const handleChange = vi.fn();
      render(<Checkbox label="Test Label" onChange={handleChange} />);
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toBeInTheDocument();
      if (label) {
        fireEvent.click(label); // First click to check
        expect(handleChange).toHaveBeenCalledWith(true);
        fireEvent.click(label); // Second click to uncheck
        expect(handleChange).toHaveBeenCalledWith(false);
      }
    });
  });

  describe('checkbox check and uncheck behavior', () => {
    it('properly toggles the checkbox when clicked', () => {
      render(<Checkbox label="Test Label" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked(); // Initially unchecked
      fireEvent.click(checkbox); // First click to check
      expect(checkbox).toBeChecked();
      fireEvent.click(checkbox); // Second click to uncheck
      expect(checkbox).not.toBeChecked();
    });

    it('properly toggles the checkbox when label container is clicked', () => {
      render(<Checkbox label="Test Label" />);
      const label = screen.getByText('Test Label').closest('label');
      const checkbox = screen.getByRole('checkbox');
      expect(label).toBeInTheDocument();
      expect(checkbox).not.toBeChecked(); // Initially unchecked
      if (label) {
        fireEvent.click(label); // First click to check
        expect(checkbox).toBeChecked();
        fireEvent.click(label); // Second click to uncheck
        expect(checkbox).not.toBeChecked();
      }
    });
  });

  describe('error cases', () => {
    it('renders without onChange handler', () => {
      render(<Checkbox label="Test Label" />);
      const checkbox = screen.getByRole('checkbox');
      expect(() => fireEvent.click(checkbox)).not.toThrow();
    });

    it('handles empty label gracefully', () => {
      render(<Checkbox label="" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.id).toBe('-checkbox'); // or whatever your default ID format is
    });

    it('handles undefined checked prop', () => {
      render(<Checkbox label="Test Label" checked={undefined} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked(); // should default to false
    });
  });
});
