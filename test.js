function getDeck() {
    const suits = ["H", "D", "C", "S"];
    const ranks = [
      "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
    ];
  
    let cards = [];
  
    for (let suit of suits) {
      for (let rank of ranks) {
        cards.push({card: suit + " " + rank, amount: getCardAmount(rank), isAce: rank === "A"});
      }
    }
  
    cards.sort(() => Math.random() - 0.5);
    return cards;
  }
  
  function getCardAmount(rank) {
    if (rank === "A") {
      return 11; // Ace can also be 1, but usually considered 11 initially
    } else if (["J", "Q", "K"].includes(rank)) {
      return 10;
    } else {
      return parseInt(rank);
    }
  }

  const deck = getDeck()

  let amount = 0
  let i = 0
  while(amount < 16){
    amount += deck[i].amount
    i++
  }
  
console.log(deck.splice(0,10));
  console.log(amount);
  