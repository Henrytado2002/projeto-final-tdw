import React, { useState, useEffect } from 'react';
import './memokemon.css';
import { useSelector } from 'react-redux';
import { useGetGen1PokemonListQuery } from '../redux/pokemonSlice';
import { incrementMemokemonGamesWon } from '../firebase/firestore';
import Header from '../navdrawer/Header';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Memokemon = () => {
  const { data: pokemonList, error, isLoading } = useGetGen1PokemonListQuery();
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [cards, setCards] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (pokemonList && pokemonList.results) {
      const getRandomPokemonIndices = () => {
        const indices = new Set();
        while (indices.size < 8) {
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
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
      if (firstCard.content === secondCard.content) {
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === firstCard.id || card.id === secondCard.id ? { ...card, matched: true } : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        resetCards();
      } else {
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

  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      win();
    }
  }, [matchedPairs]);

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
  };

  const win = async () => {
    if (matchedPairs === cards.length / 2) {
      setHasWon(true);
      if (user) {
        await incrementMemokemonGamesWon(user.uid);
      }
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
        <Header/>
        <div className='memokemon-page-container-wrapper'>
            <div className="memokemon-board">
                <div className='memokemon-title-wrapper'>
                    <img className='memokemon-title' src='./memokemon.png'/>
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
                    <div className="memokemon-card-back"><img className='card-back-pokemon' src='./Pokebola-pokeball-png-0.png'/></div>
                </div>
                ))}
            </div>
        </div>
      <div className="pokedle-user-info-container">
        <p className="pokedle-user-info-name">{user.name}</p>
        <div className='pokedle-info-card-container'>
          <div className='pokedle-info-card'>
            <p className="pokedle-user-info-games-text">Memokemon <br/>Games won</p>
            <div className='pokedle-info-card-number'>{ hasWon? user.memokemonGamesWon : user.memokemonGamesWon+1}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memokemon;