import React from "react";
import Pokemon from "./Pokemon";
import Button from "./Button";
import pokemons from "./data";

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonIndex: 0,
      pokemonType: "all",
    };
    this.filteredPokemon = this.fetchFilteredPokemon.bind(this);
    this.setAllPokemons = this.setAllPokemons.bind(this);
    this.carousel = this.carousel.bind(this);
    this.setPokemonState = this.setPokemonState.bind(this);
  }

  fetchFilteredPokemon() {
    const { pokemons } = this.props;
    const { pokemonType } = this.state;

    return pokemons.filter((pokemon) => {
      if (pokemonType === "all") return true;
      return pokemon.type === pokemonType;
    });
  }

  setAllPokemons() {
    this.setState({ pokemonType: "all" });
  }

  carousel(btnClicked) {
    const { pokemonIndex } = this.state;
    const filteredPokemon = this.fetchFilteredPokemon();
    const pokemon = filteredPokemon;
    if (pokemonIndex + btnClicked === pokemon.length)
      return this.setState({ pokemonIndex: 0 });
    if (pokemonIndex + btnClicked < 0)
      return this.setState({ pokemonIndex: pokemon.length - 1 });
    this.setState({ pokemonIndex: pokemonIndex + btnClicked });
  }

  setPokemonState(type) {
    this.setState({ pokemonType: type, pokemonIndex: 0 });
  }

  render() {
    const filteredPokemon = this.fetchFilteredPokemon();
    const pokemon = filteredPokemon[this.state.pokemonIndex];
    const newArrayPokemons = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    return (
      <div className="pokedex">
        <div className="pokedex-buttons-panel">
          <Button onClick={() => this.carousel(-1)} className="btn-previous-next">Previous Pokemon</Button>
          <Button onClick={() => this.carousel(1)} className="btn-previous-next">Next Pokemon</Button>
        </div>
        <div className="pokemon-card">
          <Pokemon pokemon={pokemon} />
        </div>
        <Button onClick={this.setAllPokemons} className="btn-types">All</Button>
        {newArrayPokemons.map((type) => (
          <Button onClick={() => this.setPokemonState(type)} key={type} className="btn-types">
            {type}
          </Button>
        ))}
      </div>
    );
  }
}

export default Pokedex;
