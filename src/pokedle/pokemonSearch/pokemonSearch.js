import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGen1PokemonListQuery, useGetPokemonByNameQuery } from '../../redux/pokemonSlice';
import { setSelectedPokemon } from '../../redux/selectedPokemonSlice';
import './pokemonSearch.css';
import '../../index.css';

const PokemonSearch = ({ onPokemonClick, hasWon }) => {
  const [search, setSearch] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const { data: pokemonList, error: listError, isLoading: listLoading } = useGetGen1PokemonListQuery();
  const dispatch = useDispatch();

  const auxiliary1 = useSelector((state) => state.selectedPokemon.selectedPokemon);
  const auxiliary2 = useSelector((state) => state.selectedPokemon.realPokemon);
  useEffect(() => {console.log(auxiliary1, auxiliary2)}, [auxiliary1, auxiliary2]);

  useEffect(() => {
    if (pokemonList && search) {
      const filtered = pokemonList.results
        .filter((pokemon) => pokemon.name.includes(search.toLowerCase()))
        .slice(0, 10); // Limit to 10 results
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon([]);
    }
  }, [pokemonList, search]);

  

  return (
    <div className='pokemon-search-container'>
      <input className='pokemon-search-input'
        type="text"
        placeholder="Enter Pokémon Name"
        value={search}
        disabled={hasWon}
        onChange={(e) => setSearch(e.target.value)}
      />
      {listLoading && <div className='pokemon-list-container-placeholder'>Loading...</div>}
      {listError && <div className='pokemon-list-container-placeholder'>Error: {listError.message}</div>}
      {filteredPokemon.length > 0 && (
        <div className='pokemon-list-container'>
          <ul className='pokemon-list'>
            {filteredPokemon.map((pokemon) => (
              <PokemonDetails key={pokemon.name} name={pokemon.name} onClick={() => {
                dispatch(setSelectedPokemon(pokemon.name));
                onPokemonClick(pokemon.name);
                setSearch('');
              }} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PokemonDetails = ({ name, onClick }) => {
  const { data: pokemon, error, isLoading } = useGetPokemonByNameQuery(name);

  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (isLoading) return <li className='pokemon-list-item'>Loading...</li>;
  if (error) return <li className='pokemon-list-item'>Error: {error.message}</li>;

  return (
    <li className='pokemon-list-item' onClick={onClick}>
      <div className='pokemon-list-item-container'>
        <img className='pokemon-list-item-sprite' src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h2 className='pokemon-list-item-name'>{capitalize(pokemon.name)}</h2>
      </div>
    </li>
  );
};

export default PokemonSearch;