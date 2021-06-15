import {ENUM_SUITS} from "utils/config";

export class Card {
	private readonly _name: string | null;
	private readonly _value: number;
	private readonly _suit: ENUM_SUITS;
	private readonly _isAce: boolean;
	private _id: number = 0;

	constructor(name: string | null, value: number, suit: ENUM_SUITS, isAce: boolean, id: number) {
		this._name = name;
		this._value = value;
		this._suit = suit;
		this._isAce = isAce;
		this._id = id;
	}

	public get getName() {
		return this._name
	}

	public get getValue() {
		return this._value
	}

	public get getSuit() {
		return this._suit
	}

	public get isAce() {
		return this._isAce
	}

	public get getId() {
		return this._id
	}

	public toJSON() {
		return {
			name: this.getName,
			value: this.getValue,
			suit: this.getSuit,
			isAce: this._isAce,
			id: this.getId
		}
	}
}