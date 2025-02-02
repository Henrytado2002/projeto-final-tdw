import React, { useEffect, useState } from 'react';
import Header from '../navdrawer/Header';
import PokemonSearch from './pokemonSearch/pokemonSearch';
import Guess from './Guess/guess';
import { useGetGen1PokemonListQuery, useGetPokemonByNameQuery } from '../redux/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { incrementPokedleGamesWon, submitGuesses } from '../firebase/firestore';
import { setRealPokemon } from '../redux/selectedPokemonSlice';

import { BsFillQuestionCircleFill } from "react-icons/bs";

import './pokedle.css';

const Pokedle = () => {
    const dispatch = useDispatch();
    const { data: pokemonList, error, isLoading } = useGetGen1PokemonListQuery();
    const [guesses, setGuesses] = useState([]);
    const [showRules, setShowRules] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [showWinMessage, setShowWinMessage] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => { //as soon as pokemon =List is avalibale, get a random pokemon from
        if (pokemonList && pokemonList.results) {
            const rand_poke_name = pokemonList.results[Math.floor(Math.random() * 151)].name;
            dispatch(setRealPokemon(rand_poke_name));
        }
    }, [pokemonList, dispatch]);

    const handlePokemonClick = (pokemonName) => {
        if (guesses.includes(pokemonName)) {
            alert('You already guessed that pokemon!');
        } else {
            setGuesses((prevGuesses) => [pokemonName, ...prevGuesses]);
        }
    };

    const selectedPokemon = useSelector((state) => state.selectedPokemon.selectedPokemon);
    const realPokemon = useSelector((state) => state.selectedPokemon.realPokemon);
    const { data: realPokemonData } = useGetPokemonByNameQuery(realPokemon);

    function averageGuesses() {
        const array = user.pokedleGuesses;
        if (array.length === 0) {
            return 0;
        } else {
            // return the rounded mean of the numbers of guesses that the user has already done 
            return Math.round(array.reduce((a, b) => a + b) / array.length);
        }
    }

    useEffect(() => {
        win();
    }, [guesses]);

    const win = async () => {
        if (selectedPokemon === realPokemon && !(selectedPokemon === null || realPokemon === null)) {
            setHasWon(true);
            setShowWinMessage(true);
            if (user) {
                await incrementPokedleGamesWon(user.uid); // Increment games won for the user
                await submitGuesses(user.uid, guesses); // Add the number of guesses to the array in the user document
            }
        }
    };

    const handleCloseWinMessage = () => {
        setShowWinMessage(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>Error: {error.message}</div>;
    }

    if (!pokemonList || !pokemonList.results) {
        console.log('No data available');
        return <div>No data available</div>;
    }

    return (
        <div className='pokedle'>
            <Header />
            <div className="pokedle-container-wrapper">
                <div className="pokedle-container">
                    <div className="rules-button" onClick={() => { setShowRules(true) }}><BsFillQuestionCircleFill className="rules-button-icon" /></div>
                    <img src="/pokedle.png" className="pokedle-title" alt="Pokedle Title" />
                    <PokemonSearch onPokemonClick={handlePokemonClick} hasWon={hasWon} />
                    <div className="playarea">
                        <h2 className='playarea-title'>Previous Guesses:</h2>
                        <div className="guesses-header">
                            <div className="guesses-header-item">Sprite</div>
                            <div className="guesses-header-item">Type 1</div>
                            <div className="guesses-header-item">Type 2</div>
                            <div className="guesses-header-item">Habitat</div>
                            <div className="guesses-header-item">Color</div>
                            <div className="guesses-header-item">Height</div>
                            <div className="guesses-header-item">Weight</div>
                        </div>
                        {guesses.map((pokemonName, index) => (
                            <Guess key={index} pokemonName={pokemonName} />
                        ))}
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
                                <h2>Congratulations,<br />you've guessed it!</h2>
                                <h2>It was  {realPokemon}</h2>
                                {realPokemonData && realPokemonData.sprites && (
                                    <img className='pokemon-guessed-win-image' src={realPokemonData.sprites.front_default} alt="Guessed Pokemon" />
                                )}
                                <h2>Number of guesses: {guesses.length}</h2>
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
                        <h2>Pokédle Rules:</h2>
                        <ul>
                            <li>You win if you guess the correct pokemon.</li>
                            <li>Star by guessing a pokemon on the search bar.</li>
                            <li>Each guess will give you information about the pokemon you chose.</li>
                            <li>Each field of the information will show you how the correct<br></br> pokemon and the pokemon you chose are alike.</li>
                            <li>If the field is green, they're alike, if it's red, they're not.</li>
                            <li>If the field shows an arrow, the value either goes up or down, <br></br>indicated by the arrow.</li>
                            <li>Try to guess the Pokémon in as few guesses as possible.</li>
                        </ul>
                    </div>
                </div>
            )}
            <div className="pokedle-user-info-container">
                <p className="pokedle-user-info-name">{user.name}</p>
                <div className='pokedle-info-card-container'>
                    <div className='pokedle-info-card'>
                        <p className="pokedle-user-info-games-text">Pokedle <br />Games won</p>
                        <div className='pokedle-info-card-number'>{user.pokedleGamesWon}</div>
                    </div>
                    <div className='pokedle-info-card'>
                        <p className="pokedle-user-info-games-text">Average <br /> Guesses</p>
                        <div className='pokedle-info-card-number'>{averageGuesses()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pokedle;