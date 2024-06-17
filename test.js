function getSixRandomCards() {
  const suits = ["H", "D", "C", "S"];
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  let cards = [];
  const decks = 8;

  for (let i = 0; i < decks; i++) {
    for (let suit of suits) {
      for (let rank of ranks) {
        cards.push(suit + " " + rank);
      }
    }
  }

  cards.sort(() => Math.random() - 0.5);

  const selectedCards = cards.slice(0, 6);

  return selectedCards;
}

// Example usage

function baccaratOutcome(playerCards, bankerCards) {
  let history = []
  function cardValue(cardString, isPlayer) {
   
  let card = cardString.split(" ")[1]
    function getValue(card){
      switch (card) {
      
        case "A":
          return 1;
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          return parseInt(card);
        case "10":
        case "J":
        case "Q":
        case "K":
          return 0;
        default:
          return 0;
      }
    }
    const value = getValue(card)
    history.push({
      isPlayer,
      value,
      card: cardString
    })
    return value;
  }

  function totalPoints(cards,isPlayer) {
    
    let total = cards.reduce((acc, card) => acc + cardValue(card,isPlayer,), 0);
  
    return total % 10;
  }
  
  
  let playerPoints = totalPoints([playerCards[0],playerCards[1]], true);

  let bankerPoints = totalPoints([bankerCards[0],bankerCards[1]], false);
  const history2 = history[1]
  history[1] = history[2]
  history[2] = history2
  let playerDrawThirdCard = false;
  let bankerDrawThirdCard = false;

  if (playerPoints <= 5) {
    playerDrawThirdCard = true;
  } else if (bankerPoints <= 5) {
    bankerDrawThirdCard = true;
  } else {
    if (playerPoints > bankerPoints) {
      return {result: 1, history};
    } else if (bankerPoints > playerPoints) {
      return {result: 2, history};
    } else {
      return {result: 3, history};
    }
  }

  if (playerDrawThirdCard) {
    const playerThirdCardValue = cardValue(playerCards[2], true);
    playerPoints = (playerPoints + playerThirdCardValue) % 10
    if (playerThirdCardValue >= 0 && playerThirdCardValue <= 9) {
      if (bankerPoints <= 2) {
        bankerDrawThirdCard = true;
      } else if (bankerPoints === 3 && playerThirdCardValue !== 8) {
        bankerDrawThirdCard = true;
      } else if (
        bankerPoints === 4 &&
        playerThirdCardValue >= 2 &&
        playerThirdCardValue <= 7
      ) {
        bankerDrawThirdCard = true;
      } else if (
        bankerPoints === 5 &&
        playerThirdCardValue >= 4 &&
        playerThirdCardValue <= 7
      ) {
        bankerDrawThirdCard = true;
      } else if (
        bankerPoints === 6 &&
        (playerThirdCardValue === 6 || playerThirdCardValue === 7)
      ) {
        bankerDrawThirdCard = true;
      }
    }
  }
 

  if (bankerDrawThirdCard) {
    const bankerThirdCardValue = playerDrawThirdCard ?  cardValue( bankerCards[2], false) : cardValue(playerCards[2], false) ;
    
    if (bankerThirdCardValue >= 0 && bankerThirdCardValue <= 9) {
      bankerPoints = (bankerPoints + bankerThirdCardValue) % 10
      console.log(bankerPoints);
      if (bankerPoints === 3 && playerPoints !== 8) {
        return {result: 1, history};
      } else if (bankerPoints === 4 && playerPoints >= 2 && playerPoints <= 7) {
        return {result: 1, history};
      } else if (bankerPoints === 5 && playerPoints >= 4 && playerPoints <= 7) {
        return {result: 1, history};
      } else if (
        bankerPoints === 6 &&
        (playerPoints === 6 || playerPoints === 7)
      ) {
        return {result: 1, history};
      } else if (bankerPoints > playerPoints) {
        return {result: 2, history};
      } else if (bankerPoints < playerPoints) {
        return {result: 1, history};
      } else {
        return {result: 3, history};
      }
    }
  }
  
  if (!bankerDrawThirdCard || !playerDrawThirdCard) {
    if (playerPoints > bankerPoints) {
      return {result: 1, history};
    } else if (bankerPoints > playerPoints) {
      return {result: 2, history};
    } else {
      return {result: 23, history};
    }
  }
  
}

const sixCards = getSixRandomCards();

const result = baccaratOutcome(
    [sixCards[0],sixCards[2],sixCards[4]],
    [sixCards[1],sixCards[3],sixCards[5]]
);
console.log(result);