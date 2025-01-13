import { getBalance } from "./sql.mjs";

// let rouletteBets = [ { userId:0, name:"rudy", bet:1000, choice:"Red" } ];
let rouletteBets = [];
let crashBets = [];

const getBetSum = (arr) => {
    let sum = 0;
    arr.forEach((value)=>{
        sum += value.bet;
    });

    return sum;
}

const checkIfInBets = (bets, userId) => {
    return bets.filter(user => user.userId == userId).length != 0;
}

const getTrueBalance = async (userId) => {
    const rouletteBetsSum = getBetSum(rouletteBets.filter((value)=>value.userId == userId));
    const balance = (await getBalance(userId)) - rouletteBetsSum;

    return balance;
}

export { getTrueBalance,checkIfInBets , rouletteBets };