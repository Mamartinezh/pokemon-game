
import logoImg from "../images/logo.png"
import pokeImg from "../images/pokeball.png"
import questImg from "../images/question.png"
import wrongImg from "../images/wrong.png"
import ashImg from "../images/ash.png"
import { useEffect, useReducer, 
	useRef, useState, createContext } from "react"
import GuessCard from "./GuessCard"
import WrongCard from "./WrongCard"
import CorrectCard from "./CorrectCard"
import LoadingCard from "./LoadingCard"

const pokemonReducer = (state, action) => {
	switch (action.type) {
		case "NEW_GUESS":
			return ({
				...state,
				isGuessed: true,
				isCorrect: action.val
			})
		case "NEW_POKEMON":
			return ({
				...state,
				name: action.name,
				img: action.img,
				isGuessed: false,
				isCorrect: false,
				isLoading: false
			})
		case "LOADING":
			return ({
				...state,
				isLoading: true,
			})
		case "NEW_TRY":
			return ({
				...state,
				isGuessed: false,
				isCorrect: false
			})	
		default: return state
	}
}

export const PokemonContext = createContext()

export default function PokemonGame() {

	const [ pokemon, dispatch ] = useReducer(pokemonReducer, {
		name: "",
		img: "",
		isGuessed: false,
		isCorrect: false,
		isLoading: false
	})
	const [ input, setInput ] = useState("")
	let guessCount = useRef(0)

	useEffect(() => {
		newPokemon()
	}, [])

	async function newPokemon() {
		let id = Math.ceil(Math.random() * 151)
		dispatch({type:"LOADING"})
		await new Promise(r => setTimeout(r, 500))
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
			.then(res => res.json())
			.then(data => dispatch({
				type: "NEW_POKEMON", 
				name: data.name,
 				img: data.sprites.other.dream_world.front_default
			}))
	}	

	function evalPokemon(name) {
		dispatch({type:"NEW_GUESS", val: name === pokemon.name})
		if (name === pokemon.name) guessCount.current++
	}

	console.log(pokemon.name)

	return (

		<div className={`pokemon-card 
			${pokemon.isGuessed && !pokemon.isCorrect ? "wrong-bg" : ""} 
			${pokemon.isCorrect ? "correct-bg" : ""}`}>

			<PokemonContext.Provider value={{
				name: pokemon.name,
				img: pokemon.img,
				newPokemon,
				evalPokemon,
				newTry: () => dispatch({type:"NEW_TRY"}),
				guesses: guessCount.current
			}}>
				{!pokemon.isGuessed && <GuessCard />}
				{pokemon.isLoading && <LoadingCard />}
				{pokemon.isGuessed && !pokemon.isCorrect &&
					<WrongCard />
				}
				{pokemon.isCorrect && <CorrectCard />}
			</PokemonContext.Provider>

		</div>

	)

}
