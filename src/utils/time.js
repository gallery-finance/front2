
export const getLeftTime = (time)=>{
    console.log('calcuTime', time)
    if (time) {

        const time1 = time * 1000;
        const date = new Date(time1);
        const now = new Date();
        const lefttime =  14*24*60*60*1000 - (now - date);
        let leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24));
        let lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24);
        let leftm = Math.floor(lefttime / (1000 * 60) % 60);
        let lefts = Math.floor(lefttime / 1000 % 60);
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

    if(0 < time && time < 24){
        return 50
    }else if(24 < time && time < 48){
        return 40
    }else if(48 < time && time < 72){
        return 30
    }else if(72 < time && time < 96){
        return 20
    }else if(96 < time && time < 120){
        return 15
    }else if(120 < time && time < 144){
        return 10
    }else if(144 < time && time < 168){
        return 8
    }else if(168 < time && time < 192){
        return 6
    }else if(192 < time && time < 216){
        return 4
    }else if(216 < time && time < 240){
        return 2
    }else {
        return 50
    }
}