
import { useContext, useState } from "react"
import { PokemonContext } from "./PokemonGame"

export default function WrongCard() {

	const pokemon = useContext(PokemonContext)

	return (
		<>
			<img className="wrong-card--logo" src={"../images/logo.png"} />
			<img className="wrong-card--img img-black" src={pokemon.img} />
			<form className="wrong-card--inputs">
				<p>Wrong Answer!</p>
				<input 
					className="tryagain" 
					type="button" 
					value="Try Again"
					onClick={pokemon.newTry} 
				/>
			</form>
			<div className="guess-card--foot">
				<img className="pokeball" src={"../images/pokeball.png"} />
				<p>Right Guesses</p>
				<b>{pokemon.guesses}</b>
			</div>
			<img className="wrong" src={"../images/wrong.png"} />
		</>
	)
}