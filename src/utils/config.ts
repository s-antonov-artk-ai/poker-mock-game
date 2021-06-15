export enum ENUM_SUITS {
	CLUBS= 'clubs',
	HEARTS = 'hearts',
	DIAMONDS = 'diamonds',
	SPADES = 'spades'
}

export enum ENUM_GAME_STATE {
	INITIAL= 'initial',
	PRE_FLOP= 'pre_flop',
	OPENED = 'opened',
}

export enum ENUM_CARD_CLASSNAMES {
	CLOSED= 'closed',
	OPEN= 'open',
}

export enum ENUM_RATES {
	Pair= 'pair',
	TwoPairs='two-pairs',
	None='none'
}

export const RATES=[
	{
		type: ENUM_RATES.Pair,
		rate: 0.9
	},
	{
		type: ENUM_RATES.TwoPairs,
		rate: 0.03
	},
	{
		type: ENUM_RATES.None,
		rate: 0.07
	}
];

export const SUITS = [
	ENUM_SUITS.CLUBS,
	ENUM_SUITS.HEARTS,
	ENUM_SUITS.DIAMONDS,
	ENUM_SUITS.SPADES
];

export const CARD_NAMES = [
	null,
	null,
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"jack",
	"queen",
	"king",
	"ace"
];
