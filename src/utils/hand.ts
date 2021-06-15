import {Card} from "utils/card";
import { groupBy, filter, sumBy } from 'lodash';
import {ENUM_CARD_CLASSNAMES} from "utils/config";

export class Hand {
	private _cards: Card[] = [];
	private readonly _name: string = '';
	private _isOpen = false;

	public setCards(cards: Card[]) {
		this._cards = cards;
	}

	constructor(name: string) {
		this._name = name;
	}

	public get getCards() {
		return this._cards
	}

	public get getName() {
		return this._name
	}

	public getPairs() {
		if(!this._isOpen) {
			return null
		}
		const grouped = groupBy(this._cards, (card) => card.getName);
		return filter(grouped, (group) => group.length === 2)
	}

	public getPairsValue() {
		if(!this._isOpen) {
			return null
		}

		return sumBy(this.getPairs(), (pair) => {
			return pair[0].getValue
		})
	}

	public openHand() {
		this._isOpen = true;
		return this;
	}

	public get isOpenHand() {
		return this._isOpen
	}

	public getClassName(card: Card) {
		const classes = [];
		if(this._isOpen) {
			classes.push(ENUM_CARD_CLASSNAMES.OPEN);
			const pairs = this.getPairs();
			if(pairs) {
				pairs.forEach((pair, index) => {
					if(pair.includes(card)) {
						classes.push(`Pair--${index}`)
					}
				})
			}
		} else {
			classes.push(ENUM_CARD_CLASSNAMES.CLOSED)
		}

		return classes.join(' ')
	}
}