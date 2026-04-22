import { translate } from '@docusaurus/Translate';

const EMAIL_REGEX = new RegExp(
    `.+\\..+@(edu\\.)?${translate({ id: 'validation.email.domain' }).replace('.', '\\.')}$`,
    'i'
);

export const validateEmail = (email?: string) => {
    if (!email) {
        return { valid: false, message: translate({ id: 'validation.missing-field' }, { field: 'E-Mail' }) };
    }
    const isValid = EMAIL_REGEX.test(email);
    if (isValid) {
        return { valid: true };
    }
    return { valid: false, message: translate({ id: 'validation.email.domain.error' }) };
};

export const validatePhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) {
        return {
            valid: false,
            message: translate({ id: 'validation.missing-field' }, { field: 'Telefon' })
        };
    }
    const cleaned = phoneNumber.replace(/\s+/g, '');
    const isValid = /^07\d{8}$/.test(cleaned);
    if (isValid) {
        return { valid: true };
    }
    return { valid: false, message: translate({ id: 'validation.phone.error' }) };
};
