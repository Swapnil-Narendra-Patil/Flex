import { render, screen, fireEvent } from '@testing-library/react';
// import Button from '../../../components/Button';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';


describe('Button Component', () => {
    it('renders the button with the title', () => {
        render(<Button title="Click me" />);
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button title="Click me" handleClick={handleClick} />);
        const button = screen.getByRole('button', { name: 'Click me' });
        userEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('displays loading state', () => {
        render(<Button title="Loading..." submitting={true} />);
        const button = screen.getByRole('button', { name: 'Loading...' });
        expect(button).toBeDisabled();
        expect(button).toHaveClass('bg-black/50');
    });

    it('shows icons when provided', () => {
        render(<Button title="Icon Button" leftIcon="/path/to/leftIcon.png" rightIcon="/path/to/rightIcon.png" />);
        expect(screen.getByAltText('left icon')).toBeInTheDocument();
        expect(screen.getByAltText('right icon')).toBeInTheDocument();
    });

    it('applies dynamic styling', () => {
        render(<Button title="Styled Button" bgColor="bg-red-500" textColor="text-yellow-500" />);
        const button = screen.getByRole('button', { name: 'Styled Button' });
        expect(button).toHaveClass('bg-red-500 text-yellow-500');
    });
});