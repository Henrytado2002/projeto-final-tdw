import React, { useEffect, useState } from 'react';
import Header from '../navdrawer/Header';
import PokemonSearch from './pokemonSearch/pokemonSearch';
import Guess from './Guess/guess';
import { useGetGen1PokemonListQuery, useGetPokemonByNameQuery } from '../redux/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { incrementPokedleGamesWon, submitGuesses } from '../firebase/firestore';
import { setRealPokemon } from '../redux/selectedPokemonSlice';
import './pokedle.css';

const Pokedle = () => {
    const dispatch = useDispatch();
    const { data: pokemonList, error, isLoading } = useGetGen1PokemonListQuery();
    const [guesses, setGuesses] = useState([]);
    const [hasWon, setHasWon] = useState(false);
    const [showWinMessage, setShowWinMessage] = useState(false);
    const user = useSelector((state) => state.user)

    useEffect(() => {
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

    const selectedPokemon = useSelector((state) => state.selectedPokemon.realPokemon);
    const realPokemon = useSelector((state) => state.selectedPokemon.selectedPokemon);
    const { data: realPokemonData } = useGetPokemonByNameQuery(realPokemon);

    useEffect(() => {
        win();
    }, [guesses]);

    const win = async() => {
        if (selectedPokemon === realPokemon && !(selectedPokemon === null || realPokemon === null)) {
            setHasWon(true);
            setShowWinMessage(true);
        }
        if (user) {
            await incrementPokedleGamesWon(user.uid); // Increment games won for the user
            await submitGuesses(user.id, guesses); //add the number of guesses to the array in the user document 
            
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
                    <img src="/pokedle.png" className="pokedle-title" alt="Pokedle Title"/>
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
                                <h2>Congratulations,<br/>you've guessed it!</h2>
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
        </div>
    );
};

export default Pokedle;