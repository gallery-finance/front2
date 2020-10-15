
export const getLeftTime = (time)=>{
    console.log('calcuTime', time)
    if (time) {
        let leftd = Math.floor(time / (1000 * 60 * 60 * 24));
        let lefth = Math.floor(time / (1000 * 60 * 60) % 24);
        let leftm = Math.floor(time / (1000 * 60) % 60);
        let lefts = Math.floor(time / 1000 % 60);
        const left = {
            days: leftd < 0 ? 0 : leftd,
            hours: lefth < 0 ? 0 : lefth,
            minutes: leftm < 0 ? 0 : leftm,
            seconds: lefts < 0 ? 0 : lefts,
        };
        return left
    } else {
        return null
    }
}