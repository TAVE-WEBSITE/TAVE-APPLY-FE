export function handleBirthInput(value: string, setBirth: (val: string) => void) {
    const numbers = value.replace(/[^\d]/g, '').slice(0, 6);
    setBirth(numbers);
}

export function formatBirth(value: string): string {
    const yy = parseInt(value.slice(0, 2), 10);
    const mm = value.slice(2, 4);
    const dd = value.slice(4, 6);

    const year = yy <= 20 ? 2000 + yy : 1900 + yy;

    return `${year}-${mm}-${dd}`;
}
