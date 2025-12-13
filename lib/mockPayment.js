
/**
 * Simulates a payment provider's card validation and fingerprinting.
 * In a real app, this would use Stripe.js or similar.
 */

export const mockPaymentProvider = {
    /**
     * Validates card details and generates a deterministic fingerprint.
     * @param {string} cardNumber 
     * @param {string} expiry 
     * @param {string} cvc 
     * @returns {Promise<{isValid: boolean, fingerprint: string, last4: string, error?: string}>}
     */
    validateCard: async (cardNumber, expiry, cvc) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Basic validation logic
        const cleanNumber = cardNumber.replace(/\s/g, '');

        if (cleanNumber.length < 16 || isNaN(cleanNumber)) {
            return { isValid: false, error: "Invalid card number" };
        }

        if (!expiry || !expiry.includes('/')) {
            return { isValid: false, error: "Invalid expiry date" };
        }

        if (cvc.length < 3 || isNaN(cvc)) {
            return { isValid: false, error: "Invalid CVC" };
        }

        // Deterministic fingerprint generation (mock)
        // In reality, Stripe generates this "fingerprint" field on the Token/PaymentMethod object.
        // We simulate it by hashing the card number (NEVER DO THIS IN PRODUCTION WITH REAL CARDS - USE STRIPE).
        // Since this is a demo/mock, we just use a simple string manipulation for the "hash".
        const fingerprint = `dock_fing_${cleanNumber.substring(0, 6)}_${cleanNumber.slice(-4)}`;

        return {
            isValid: true,
            fingerprint: fingerprint,
            last4: cleanNumber.slice(-4)
        };
    }
};

