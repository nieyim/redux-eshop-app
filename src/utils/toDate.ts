export function formatDateTime(date: number) {
    const createdAtDate = new Date(date);

    // Format the date and time as a string
    const formattedCreatedAt = createdAtDate.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return formattedCreatedAt;
}
