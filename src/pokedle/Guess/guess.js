import React, { useEffect, useRef } from 'react';
import { useGetPokemonByNameQuery, useGetPokemonSpeciesInfoByNameQuery } from '../../redux/pokemonSlice';
import { useSelector } from 'react-redux';
import './guess.css';

const Guess = ({ pokemonName }) => {
  const { data: selectedPokemonNormalInfo, error: selectedError, isLoading: selectedLoading } = useGetPokemonByNameQuery(pokemonName);
  const { data: selectedPokemonSpeciesInfo } = useGetPokemonSpeciesInfoByNameQuery(pokemonName);

  const realPokemonName = useSelector((state) => state.selectedPokemon.realPokemon);
  const { data: realPokemonNormalInfo, error: realError, isLoading: realLoading } = useGetPokemonByNameQuery(realPokemonName);
  const { data: realPokemonSpeciesInfo } = useGetPokemonSpeciesInfoByNameQuery(realPokemonName);

  const textRefs = useRef([]);

  useEffect(() => {
    textRefs.current.forEach((ref) => {
      if (ref) {
        adjustFontSize(ref);
      }
    });
  }, [selectedPokemonNormalInfo, selectedPokemonSpeciesInfo, realPokemonNormalInfo, realPokemonSpeciesInfo]);

  const adjustFontSize = (element) => {
    let fontSize = parseInt(window.getComputedStyle(element).fontSize);
    while (element.scrollWidth > element.clientWidth && fontSize > 0) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
    }
  };

  if (selectedLoading || realLoading) return <div>Loading...</div>;
  if (selectedError || realError) return <div>Error: {selectedError?.message || realError?.message}</div>;

  if (!selectedPokemonNormalInfo || !selectedPokemonSpeciesInfo || !realPokemonNormalInfo || !realPokemonSpeciesInfo) {
    return <div>No data available</div>;
  }

  const selectedPokemon = {
    type1: selectedPokemonNormalInfo.types[0]?.type.name || 'none',
    type2: selectedPokemonNormalInfo.types[1]?.type.name || 'none',
    habitat: selectedPokemonSpeciesInfo.habitat?.name || 'unknown',
    color: selectedPokemonSpeciesInfo.color?.name || 'unknown',
    height: selectedPokemonNormalInfo.height,
    weight: selectedPokemonNormalInfo.weight,
  };

  const realPokemon = {
    type1: realPokemonNormalInfo.types[0]?.type.name || 'none',
    type2: realPokemonNormalInfo.types[1]?.type.name || 'none',
    habitat: realPokemonSpeciesInfo.habitat?.name || 'unknown',
    color: realPokemonSpeciesInfo.color?.name || 'unknown',
    height: realPokemonNormalInfo.height,
    weight: realPokemonNormalInfo.weight,
  };

  const compare = (guessedField, realField, isNumerical) => {
    if (guessedField === realField) {
      return 'correct';
    } else if (!isNumerical && (guessedField.includes(realField) || realField.includes(guessedField))) {
      return 'close';
    } else if (isNumerical && guessedField < realField) {
      return 'wrong-increase';
    } else if (isNumerical && guessedField > realField) {
      return 'wrong-decrease';
    } else {
      return 'wrong';
    }
  };

  function formatHeight(height) {
        const meters = height /10 >= 1 ? `${Math.floor(height/10)}m `: '';
        const centimeters = height % 10 > 0 ? `${(height * 10) %100}cm`: '';
        return `${meters}${centimeters}`
    }

  function formatWeight(weight) {
    return `${weight / 10}kg`;
  }

  return (
    <div className='guess-row'>
      <div className='guess-row-sprite-div'>
        <img src={selectedPokemonNormalInfo.sprites.front_default} alt={pokemonName} />
      </div>
      <div className={compare(selectedPokemon.type1, realPokemon.type1, false)}>
        <p ref={(el) => (textRefs.current[0] = el)}>{selectedPokemon.type1}</p>
      </div>
      <div className={compare(selectedPokemon.type2, realPokemon.type2, false)}>
        <p ref={(el) => (textRefs.current[1] = el)}>{selectedPokemon.type2}</p>
      </div>
      <div className={compare(selectedPokemon.habitat, realPokemon.habitat, false)}>
        <p ref={(el) => (textRefs.current[2] = el)}>{selectedPokemon.habitat}</p>
      </div>
      <div className={compare(selectedPokemon.color, realPokemon.color, false)}>
        <p ref={(el) => (textRefs.current[3] = el)}>{selectedPokemon.color}</p>
      </div>
      <div className={compare(selectedPokemon.height, realPokemon.height, true)}>
        <p ref={(el) => (textRefs.current[4] = el)}>{formatHeight(selectedPokemon.height)}</p>
      </div>
      <div className={compare(selectedPokemon.weight, realPokemon.weight, true)}>
        <p ref={(el) => (textRefs.current[5] = el)}>{formatWeight(selectedPokemon.weight)}</p>
      </div>
    </div>
  );
};

export default Guess;