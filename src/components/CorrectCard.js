
import { useContext, useState, useRef, useEffect } from "react"
import { PokemonContext } from "./PokemonGame"

export default function CorrectCard() {

	const pokemon = useContext(PokemonContext)
	const [ ashStyle, setAshStyle ] = useState({})
	const [ imgStyle, setImgStyle ] = useState({})

	useEffect( () => {
		setAshStyle({transform: "translateY(-190px)"})
		setImgStyle({filter: "brightness(1.0)"})
	}, [])

	return (
		<>
			<img className="correct-card--logo" src="../images/logo.png" />
			<img className="correct-card--img" style={imgStyle} src={pokemon.img} />
			<form className="correct-card--inputs">
				<span className="success">Success!</span>
				<i 
					className="fa-solid fa-arrow-right-long" 
					onClick={pokemon.newPokemon}>
				</i>
			</form>
			<div className="guess-card--foot">
				<img className="pokeball" src="../images/pokeball.png" />
				<p>Right Guesses</p>
				<b>{pokemon.guesses}</b>
			</div>
			<img className="ash" style={ashStyle} src="../images/ash.png" />
		</>
	)
}