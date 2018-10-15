export function formatHHMMSS(totalSeconds: number) {
    const totalHours = Math.trunc(totalSeconds / 3600);
    const restMinutes = Math.trunc((totalSeconds - totalHours * 3600) / 60);
    const restSeconds = totalSeconds - totalHours * 3600 - restMinutes * 60;

    const prefix = (duration: number) => duration < 10 ? '0' : '';

    const hoursString = totalHours > 0 ? `${prefix(totalHours)}${String(totalHours)}:` : '';
    const minutesString = `${prefix(restMinutes)}${String(restMinutes)}:`;
    const secondsString = `${prefix(restSeconds)}${String(restSeconds)}`;

    return hoursString + minutesString + secondsString;
}
