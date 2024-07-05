/**
 * Get current date in format: 07/05/2024
 */
export function getCurrentFormattedDate(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();

    return `${month}/${day}/${year}`;
}
