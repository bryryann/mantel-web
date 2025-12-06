export function exportError(err: string): number {
    const regex = /(\d+)$/;
    const match = err.match(regex);

    return match ? Number(match[1]) : -1;
}

