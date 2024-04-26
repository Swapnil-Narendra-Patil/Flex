import { render, screen, fireEvent } from '@testing-library/react';
// import Button from '../../../components/Button'; // Adjust the import path as needed

describe('Button Component', () => {
  it('triggers the assigned onClick function when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick} title="Click Me" />);
    
    const button = screen.getByRole('button', { name: "Click Me" });
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('displays loading state if a loading prop is passed', () => {
    render(<Button loading={true} title="Loading..." />);
    
    expect(screen.getByRole('button', { name: "Loading..." })).toBeDisabled();
    // Assuming the button shows a spinner or changes style when loading
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});