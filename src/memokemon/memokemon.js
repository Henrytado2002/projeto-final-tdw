import React, { useState, useEffect } from 'react';
import './memokemon.css';
import { useSelector } from 'react-redux';
import { useGetGen1PokemonListQuery } from '../redux/pokemonSlice';
import { incrementMemokemonGamesWon } from '../firebase/firestore';
import Header from '../navdrawer/Header';

import { BsFillQuestionCircleFill } from "react-icons/bs";

const shuffleArray = (array) => {
	return array.sort(() => Math.random() - 0.5);
};

const Memokemon = () => {
	const { data: pokemonList, error, isLoading } = useGetGen1PokemonListQuery();
	const [firstCard, setFirstCard] = useState(null);
	const [secondCard, setSecondCard] = useState(null);
	const [matchedPairs, setMatchedPairs] = useState(0);
	const [hasWon, setHasWon] = useState(false);
	const [showWinMessage, setShowWinMessage] = useState(false);
	const [cards, setCards] = useState([]);
	const [showRules, setShowRules] = useState(false);
	const user = useSelector((state) => state.user);

	useEffect(() => { //sequence to execute when the pokemon list is fetched from the databse 
		if (pokemonList && pokemonList.results) {
			const getRandomPokemonIndices = () => {
				const indices = new Set();
				while (indices.size < 8) { //get 8 random index numbers to select 8 random pokemon
					const randomIndex = Math.floor(Math.random() * pokemonList.results.length);
					indices.add(randomIndex);
				}
				return Array.from(indices);
			};

			const randomPokemonIndices = getRandomPokemonIndices();
			const selectedPokemon = randomPokemonIndices.map(index => pokemonList.results[index].name);

			const fetchPokemonSprites = async () => {
				const sprites = await Promise.all(
					selectedPokemon.map(async (name) => {
						const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); //I was havbing a small problem with undefined objects, so i had to do it like this...
						const data = await response.json();
						return data.sprites.front_default;
					})
				);

				const cardsArray = sprites.flatMap((sprite, index) => [
					{ id: index * 2, content: sprite, flipped: false },
					{ id: index * 2 + 1, content: sprite, flipped: false },
				]);

				setCards(shuffleArray(cardsArray));
			};

			fetchPokemonSprites();
		}
	}, [pokemonList]);

	useEffect(() => {
		if (firstCard && secondCard) {
			if (firstCard.content === secondCard.content) { //flipped cards are the same
				setCards(prevCards =>
					prevCards.map(card =>
						card.id === firstCard.id || card.id === secondCard.id ? { ...card, matched: true } : card
					)
				);
				setMatchedPairs(prev => prev + 1);
				resetCards();
			} else { //flipped cards are different
				setTimeout(() => {
					setCards(prevCards =>
						prevCards.map(card =>
							card.id === firstCard.id || card.id === secondCard.id ? { ...card, flipped: false } : card
						)
					);
					resetCards();
				}, 1000);
			}
		}
	}, [firstCard, secondCard]);

	useEffect(() => { //win sequence, checks if the player won in every play
		if (matchedPairs > 0 && matchedPairs === cards.length / 2) {
			win();
		}
	}, [matchedPairs]);

	const resetCards = () => {
		setFirstCard(null);
		setSecondCard(null);
	};

	const win = async () => {
		setHasWon(true);
		setShowWinMessage(true);
		if (user) {
			await incrementMemokemonGamesWon(user.uid);
		}
	};

	const handleCardClick = (card) => {
		if (firstCard === null) {
			setFirstCard(card);
			setCards(prevCards =>
				prevCards.map(c =>
					c.id === card.id ? { ...c, flipped: true } : c
				)
			);
		} else if (secondCard === null && card.id !== firstCard.id) {
			setSecondCard(card);
			setCards(prevCards =>
				prevCards.map(c =>
					c.id === card.id ? { ...c, flipped: true } : c
				)
			);
		}
	};

	const handleCloseWinMessage = () => {
		setShowWinMessage(false);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!pokemonList || !pokemonList.results) {
		return <div>No data available</div>;
	}

	return (
		<div className='memokemon-page-container'>
			<Header />
			<div className='memokemon-page-container-wrapper'>
				<div className="memokemon-board">
					<div className="rules-button" onClick={() => { setShowRules(true) }}><BsFillQuestionCircleFill className="rules-button-icon" /></div>
					<div className='memokemon-title-wrapper'>
						<img className='memokemon-title' src='./memokemon.png' />
					</div>
					{cards.map((card) => (
						<div
							key={card.id}
							className={`memokemon-card ${card.flipped ? 'flipped' : ''}`}
							onClick={() => !card.matched && !card.flipped && handleCardClick(card)}
						>
							<div className="memokemon-card-front">
								<img src={card.content} alt="pokemon" />
							</div>
							<div className="memokemon-card-back"><img className='card-back-pokemon' src='./Pokebola-pokeball-png-0.png' /></div>
						</div>
					))}
				</div>
			</div>
			<div className="pokedle-user-info-container">
				<p className="pokedle-user-info-name">{user.name}</p>
				<div className='pokedle-info-card-container'>
					<div className='pokedle-info-card'>
						<p className="pokedle-user-info-games-text">Memokemon <br />Games won</p>
						<div className='pokedle-info-card-number'>{hasWon ? user.memokemonGamesWon : user.memokemonGamesWon + 1}</div>
					</div>
				</div>
			</div>
			{showWinMessage && (
				<div className="win-message-wrapper">
					<div className="win-message">
						<div className="win-message-content">
							<img className='win-img' src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGEzcjJ3N2FtZmdxYzNndnZkbnFoeGU2enBodG9iZ3N0aXZsejY3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yOWoBXl9clt5dBDstA/giphy.gif" alt="celebration" />
							<div className="win-text">
								<button className="close-button" onClick={handleCloseWinMessage}>X</button>
								<h2>Congratulations,<br />You Won!</h2>

								<button className='win-button' onClick={() => window.location.reload()}>Play Again</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{showRules && (
				<div className="rules-overlay">
					<div className="rules-content">
						<button className="close-button" onClick={() => { setShowRules(false) }}>X</button>
						<h2>Memokemon Rules:</h2>
						<ul>
							<li>Click the cards to flip them.</li>
							<li>The objective is to find the pairs of pokemon in the cards.</li>
							<li>You may only have two cards flipped at one time.</li>
							<li>You if you find all the pairs of pokemon!</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Memokemon;