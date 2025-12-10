// src/utils/input-formatting.ts

const cleanNumber = (value: string | undefined): string => {
    return value ? value.replace(/\D/g, '') : '';
};

export const formatCpf = (value: string | undefined): string => {
    const cleaned = cleanNumber(value).substring(0, 11);
    if (cleaned.length > 9) {
        return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
    if (cleaned.length > 6) {
        return cleaned.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
    }
    if (cleaned.length > 3) {
        return cleaned.replace(/^(\d{3})(\d{3})$/, '$1.$2');
    }
    return cleaned;
};

export const formatPhone = (value: string | undefined): string => {
    const cleaned = cleanNumber(value).substring(0, 11); // Max 11 digitos
    if (cleaned.length > 10) {
        return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    if (cleaned.length > 6) {
        return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
    if (cleaned.length > 2) {
        return cleaned.replace(/^(\d{2})(\d+)$/, '($1) $2');
    }
    return cleaned;
};