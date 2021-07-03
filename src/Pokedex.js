import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './Pokedex.css'

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeIndex: 0,
      filteredType: 'all'
    }

  }

  filteredPokemons = () => {
    const { pokemons } = this.props;
    const { filteredType } = this.state;

    return pokemons.filter( pokemon => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    });
  }

  filterPokemons = (filteredType) => {
    this.setState({
      pokeIndex: 0,
      filteredType,
    })
  }

  pokemonType = () => {
    const { pokemons } = this.props;

    return [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
  }

  nextPokemon = (numOfPoke) => {
    this.setState(state => ({
      pokeIndex: (state.pokeIndex + 1) % numOfPoke
    }))
  }

  render() {
    const { pokeIndex } = this.state;
    const filteredPokemons = this.filteredPokemons();
    const pokemon = filteredPokemons[pokeIndex];
    const pokemonType = this.pokemonType();

    return (
      <div className="pokedex">
        <Pokemon pokemon={ pokemon } />
        <div className="pokedex-buttons-panel">
          <Button
            onClick={() => this.filterPokemons('all')}
          >
            All
          </Button>
          { pokemonType.map(type => (
            <button
              key={ type }
              onClick={ () => this.filterPokemons(type) }
              className="filter-button"
            >
              { type }
            </button>
          ))}
        </div>
        <button
          className="pokedex-button"
          onClick={ () => this.nextPokemon(filteredPokemons.length) }
          disabled={ filteredPokemons.length <= 1 }
        >
          Poximo Pokémon
        </button>
        {/* {this.props.pokemons.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)} */}
      </div>
    );
  }
}

export default Pokedex;
