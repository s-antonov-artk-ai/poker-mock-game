import {uniqueId} from "lodash";
import * as React from "react";
import {Fragment, useCallback, useState} from "react";
import styled, {css} from "styled-components";
import {Desk} from "utils/desk";

const DeskTable = styled.div`
    min-height: 250px;
    background: green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 30px;
`;

const Card = styled.div`
	width: 50px;
	height: 75px;
	background: #fff;
	margin-right: 2px;
	
	&.Pair {
		&--0 {
			background: aquamarine;
		}
		&--1 {
			background: yellow;
		}
	}
`;

interface IHanStyle {
	isWinner: boolean
}

const Hand = styled.div<IHanStyle>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    text-align: center;
    margin: 5px;
    ${(props) => props.isWinner && css`
    	transform: scale(1.1);
    	border: 2px solid blue;
    `}
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
`;

const Button = styled.button`
    border: none;
    background: beige;
    color: #000;
    border-radius: 20px;
    height: 40px;
    margin-right: 10px;
    padding: 0 20px;
    box-shadow: -5px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
    cursor: pointer;
`;

const Wrapper = styled.div`
   width: 500px;
`;

export const Poker = () => {
	const [desk] = useState(new Desk());
	const [,render] = useState(uniqueId());

	const openHands = useCallback(() => {
		desk.openHands();
		render(uniqueId());
	}, [desk])

	const generateHands = useCallback(() => {
		desk.generateHands();
		render(uniqueId());
	}, [desk])

	const addHand = useCallback(() => {
		desk.addHand();
		render(uniqueId());
	}, [desk])

	const clear = useCallback(() => {
		desk.clear();
		render(uniqueId());
	}, [desk])

	return (
		<Wrapper>
			<DeskTable>
				{desk.getHands.map((hand) => (
					<Hand key={hand.getName} isWinner={desk.isWinner(hand)}>
						{hand.getCards.map((card) => hand.isOpenHand ? (
							<Card className={hand.getClassName(card)}>
								{card.getName} <br/>
								{card.getSuit} <br/>
							</Card>
						) : (
							<Card>
								-- <br/>
								--
							</Card>
						))}
					</Hand>
				))}
			</DeskTable>

			<Buttons>
				{!desk.getHands.length && (
					<Button onClick={generateHands}>
						generate hands
					</Button>
				)}

				<Button onClick={openHands}>
					open hands
				</Button>

				{!!desk.getHands.length && (
					<Fragment>
						<Button onClick={addHand} >
							add hand
						</Button>

						<Button onClick={clear} >
							clear
						</Button>
					</Fragment>
				)}
			</Buttons>
		</Wrapper>
	)
};

export default Poker;
