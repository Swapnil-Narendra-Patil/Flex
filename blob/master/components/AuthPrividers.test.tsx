import { render, screen, waitFor } from '@testing-library/react';
import { getProviders, signIn } from 'next-auth/react';
// import AuthProviders from '../../../components/AuthProviders';
// import Button from '../../../components/Button';

jest.mock('next-auth/react', () => ({
    getProviders: jest.fn(() => Promise.resolve({
        google: {
            id: 'google',
            name: 'Google',
            type: 'oauth',
            signinUrl: 'http://google.com/signin',
            callbackUrl: 'http://google.com/callback'
        }
    })),
    signIn: jest.fn(),
}));

jest.mock('../../components/Button', () => {
    return function DummyButton({ title, handleClick }) {
        return <button onClick={handleClick}>{title}</button>;
    };
});

describe('AuthProviders Component', () => {
    it('renders login options when the user is not authenticated', async () => {
        render(<AuthProviders />);
        await waitFor(() => {
            expect(screen.getByText('Sign In')).toBeInTheDocument();
        });
        // This checks that the Button is rendered with the correct props
        expect(Button).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Sign In',
                handleClick: expect.any(Function),
            }),
            expect.any(Object)
        );
    });

    it('calls signIn with correct provider when sign in button is clicked', async () => {
        render(<AuthProviders />);
        await waitFor(() => {
            screen.getByText('Sign In').click();
        });
        expect(signIn).toHaveBeenCalledWith('google');
    });

    // Placeholder for tests involving authenticated state:
    it('renders user profile access when the user is authenticated', async () => {
        // Mock or simulate authentication state here
    });
});