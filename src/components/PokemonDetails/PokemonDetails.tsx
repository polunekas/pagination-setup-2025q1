import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PokemonDetails.module.css';
import { fetchPokemonData } from '../../utils/api';
import Loader from '../Loader/Loader';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
}

const PokemonDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const data = await fetchPokemonData(id);
        if (!data || !data.name) {
          throw new Error('Invalid Pokémon data');
        }
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) return <Loader />;
  if (!pokemon) return <div>Pokemon not found</div>;

  return (
    <div className={styles.detailsContainer}>
      <h2>{pokemon.name}</h2>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>
        Abilities:{' '}
        {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
      </p>
      <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
    </div>
  );
};

export default PokemonDetails;
