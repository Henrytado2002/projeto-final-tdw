import React, { useEffect, useState } from 'react';
import Header from '../navdrawer/Header';
import PokemonSearch from './pokemonSearch/pokemonSearch';
import Guess from './Guess/guess';
import { useGetGen1PokemonListQuery, useGetPokemonByNameQuery } from '../redux/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setRealPokemon } from '../redux/selectedPokemonSlice';
import './pokedle.css';



const Pokedle = () => {
    const dispatch = useDispatch();
    const { data: pokemonList, error, isLoading } = useGetGen1PokemonListQuery();
    const [guesses, setGuesses] = useState([]);
    const [hasWon, setHasWon] = useState(false);
    const [showWinMessage, setShowWinMessage] = useState(false);

    useEffect(() => {
        if (pokemonList && pokemonList.results) {
            const rand_poke_name = pokemonList.results[Math.floor(Math.random() * 151)].name;
            dispatch(setRealPokemon(rand_poke_name));
        }
    }, [pokemonList, dispatch]);

    const handlePokemonClick = (pokemonName) => {
        if(guesses.includes(pokemonName)){
            alert('You already guessed that pokemon!')
        }else{
            setGuesses((prevGuesses) => [pokemonName, ...prevGuesses ]);
        }
    };

    const selectedPokemon = useSelector((state) => state.selectedPokemon.realPokemon);
    const realPokemon = useSelector((state) => state.selectedPokemon.selectedPokemon);

    useEffect(() => {
        win();
    }, [guesses]);

    const win = () => {
        if (selectedPokemon === realPokemon && !(selectedPokemon === null || realPokemon === null)) {
            setHasWon(true);
            setShowWinMessage(true);
        }
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
                    <img src='./pokedle.png' className="pokedle-title"/>
                    <PokemonSearch onPokemonClick={handlePokemonClick} />
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
                    <div className="playarea">
                        {guesses.map((pokemonName, index) => (
                            <Guess key={index} pokemonName={pokemonName} />
                        ))}
                    </div>
                </div>
            </div>
            {showWinMessage &&  (
                <div className="win-message-wrapper">
                    <div className="win-message">
                        <div className="win-message-content">
                            <img className='win-img' src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGEzcjJ3N2FtZmdxYzNndnZkbnFoeGU2enBodG9iZ3N0aXZsejY3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yOWoBXl9clt5dBDstA/giphy.gif" alt="celebration" />
                            <div className="win-text">
                            <button className="close-button" onClick={()=>{setShowWinMessage(false)}}>X</button>
                                <h2>Congratulations!</h2>
                                <h2>You've guessed the pokemon!</h2>
                                <img></img>
                                <h2>Guesses: {guesses.length}</h2>
                            </div>
                        </div>
                        <button className='win-button' onClick={() => window.location.reload()}>Play Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pokedle;