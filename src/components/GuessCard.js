
import { useContext, useState } from "react"
import { PokemonContext } from "./PokemonGame"

export default function GuessCard() {

	const pokemon = useContext(PokemonContext)
	const [ input, setInput ] = useState("")

	return (
		<>
			<img className="guess-card--logo" src={"../images/logo.png"} />
			{pokemon.img ? 
				<img className="guess-card--img img-black" src={pokemon.img}/> 
				: 
				<div></div>
			} 
			<form className="guess-card--inputs">
				<input 
					className="guess-card--name" 
					placeholder="Pokemon name"
					name="pokemon-name"
					value={input}
					onChange={e => setInput(e.currentTarget.value)}
				/>
				<div className="guess-card--buttons">
					<p 
						className="skip" 
						onClick={pokemon.newPokemon}>
						Skip
					</p>
					<p 
						className="guess" 
						onClick={e => pokemon.evalPokemon(input)}>
						Guess
					</p>
				</div>
			</form>
			<div className="guess-card--foot">
				<img className="pokeball" src={"../images/pokeball.png"} />
				<p>Right Guesses</p>
				<b>{pokemon.guesses}</b>
			</div>
			<img className="question" src={"../images/question.png"} />
		</>
	)
}