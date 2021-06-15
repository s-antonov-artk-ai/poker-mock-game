import {maxBy, shuffle} from "lodash";
import {Card} from "utils/card";
import {CARD_NAMES, ENUM_GAME_STATE, ENUM_RATES, RATES, SUITS} from "utils/config";
import {Hand} from "utils/hand";

export class Desk {
	private _cards: Card[] = [];
	private _hands: Hand[] = [];
	private _game_state: ENUM_GAME_STATE = ENUM_GAME_STATE.INITIAL;
	private _winner: Hand | null = null;

	constructor() {
		this._init();
	}

	public get getCards() {
		return this._cards;
	}

	public get getHands() {
		return this._hands;
	}

	public isWinner(hand: Hand) {
		return this._winner === hand;
	}

	public generateHands(count: number = 2) {
		for(let i = 0; i < count; i++) {
			this.addHand()
		}

		this._setDeskState(ENUM_GAME_STATE.PRE_FLOP);

		return this._hands
	}

	public addHand() {
		this._getHandCards()
		const hand = new Hand(`Player ${this._hands.length++}`);
		const dealCards = this._getHandCards();
		if(dealCards.length === 5) {
			hand.setCards(dealCards);
			this._hands.push(hand);
		} else {
			alert('No cards')
		}
	}

	public openHands() {
		this._hands.forEach(hand => {
			hand.openHand();
		});
		this.setWinner();
		this._setDeskState(ENUM_GAME_STATE.OPENED);
		return this;
	}

	public checkPairs() {
		this._hands.forEach(hand => {
			console.log(hand.getPairs());
		})
		return this;
	}

	public getDeskState() {
		return this._game_state;
	}

	public clear() {
		this._init();
	}

	private _init() {
		const cards = this._generateDeskCards();
		const shuffledCards = this._shuffleCards(cards);
		this._setDeskCards(shuffledCards);
		this._hands = [];
	}

	private setWinner() {
		console.log(this._hands);
		const max = maxBy(this._hands, (hand) => hand?.getPairsValue());

		if(max) {
			this._winner = max;
		}
	}

	private _setDeskState(state: ENUM_GAME_STATE) {
		this._game_state = state
	}

	private _setDeskCards(cards: Card[]) {
		this._cards = cards
	}

	private _shuffleCards(cards: Card[]) {
		return shuffle(cards);
	}

	private _generateDeskCards() {

		let ids = 0;
		const cards: Card[] = []
		SUITS.forEach((suit) => {
			for (let i = 2; i <= 14; i++) {
				const isAce = i === CARD_NAMES.length - 1;
				cards.push(new Card(
					CARD_NAMES[i],
					i,
					suit,
					isAce,
					ids++
			))
			}
		});

		return cards
	}

	private _getHandCards() {
		const randValue = Math.random();
		let value: ENUM_RATES = ENUM_RATES.None;
		for (let i = 0; i < RATES.length; i++) {
			if (randValue < RATES[i].rate) {
				value = RATES[i].type
				break;
			}
		}

		if(value === ENUM_RATES.Pair) {
			const pair = this._getPair();
			const rest_cards = this._cards.splice(0, 3);
			return shuffle([...pair, ...rest_cards])
		}

		if(value === ENUM_RATES.TwoPairs) {
			const pair = this._getPair();
			const nextPair = this._getPair();
			const rest_cards = this._cards.splice(0, 1);
			return shuffle([...pair, ...nextPair, ...rest_cards])
		}

		return this._cards.splice(0, 5)
	}

	private _getPair(){
		const [firstCard, ...rest] = this._cards;
		const nextIndex = rest.findIndex((card) => card.getName === firstCard.getName);

		const nextCard = this._cards.splice(nextIndex, 1);
		return [firstCard, ...nextCard]
	}
}