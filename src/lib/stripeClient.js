import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside of a component’s render to avoid recreating the Stripe object on every render.
let stripePromise;

export const getStripe = () => {
    if (!stripePromise) {
        const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
        if (!key) {
            console.warn('VITE_STRIPE_PUBLIC_KEY is not defined in your environment variables.');
        }
        stripePromise = loadStripe(key || '');
    }
    return stripePromise;
};
