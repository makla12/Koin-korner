import { getBalance } from "./sql.mjs";

let rouletteBets = [];

let crashBets = [];

const getBetSum = (arr) => {
    let sum = 0;
    arr.forEach((value)=>{
        if(value.active) sum += value.bet;
    });

    return sum;
}

const checkIfInBets = (bets, userId, customFilter = () => {true}) => {
    return bets.filter(user => user.userId == userId).filter(customFilter).length != 0;
}

const getTrueBalance = async (userId) => {
    const rouletteBetsSum = getBetSum(rouletteBets.filter( value => value.userId == userId));
    const crashBetsSum = getBetSum(crashBets.filter(value => value.userId == userId));
    const balance = (await getBalance(userId)) - rouletteBetsSum - crashBetsSum;

    return balance;
}

export { getTrueBalance,checkIfInBets , rouletteBets, crashBets };