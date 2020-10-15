
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

export const getPercent = (time) =>{
    if(0 <time < 24){
        return 50
    }else if(24 <time < 48){
        return 40
    }else if(48 <time < 72){
        return 30
    }else if(72 <time < 96){
        return 20
    }else if(96 <time < 120){
        return 15
    }else if(120 <time < 144){
        return 10
    }else if(144 <time < 168){
        return 8
    }else if(168 <time < 192){
        return 6
    }else if(192 <time < 216){
        return 4
    }else if(216 <time < 240){
        return 2
    }else {
        return 0
    }
}