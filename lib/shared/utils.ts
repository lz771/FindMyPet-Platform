export function formatDate(dateLastSeen: Date) {
    const year = dateLastSeen.getFullYear();
    let month: string | number = dateLastSeen.getMonth() + 1;
    let date: string | number = dateLastSeen.getDate();

    if (month < 10) month = "0" + String(month);
    if (date < 10) date = "0" + String(date);

    return `${year}-${month}-${date}`;
}