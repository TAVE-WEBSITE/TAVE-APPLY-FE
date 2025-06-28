export default function formatOrdinal(n: string): string {
    const num = Number(n);

    if (isNaN(num)) return n;

    const lastTwo = num % 100;

    if (lastTwo >= 11 && lastTwo <= 13) {
        return `${n}TH`;
    }

    const last = num % 10;

    switch (last) {
        case 1:
            return `${n}ST`;
        case 2:
            return `${n}ND`;
        case 3:
            return `${n}RD`;
        default:
            return `${n}TH`;
    }
}
