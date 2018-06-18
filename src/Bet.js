class Bet {
  constructor (json) {
    this.details = json.details
    this.stake = +json.stake
    this.winnings = +json.winnings
  }
}

export {
  Bet
}
