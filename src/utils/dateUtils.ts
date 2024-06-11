const formatDate = (dateString: string): string[] => {
    const date = new Date(dateString);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const time = `${hours}:${minutes}`;
    const day = date.getDate();
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const month = months[date.getMonth()];
    const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return [time, `${day} ${month}`, dayOfWeek];
}; 
export { formatDate};