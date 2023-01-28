import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const NAVBAR = "Navbar"
const NAVBAR_WIDTH_THIN = "5vw"
const NAVBAR_WIDTH_WIDE = "20vw"

var SMALL_HOME = '\u2302'
var WIDE_HOME = SMALL_HOME + ' HOME'
var SMALL_ABOUT = '\u2139'
var WIDE_ABOUT = SMALL_ABOUT + ' ABOUT'

export default function Navbar() {
	var [state, setState] = useState({
		home: SMALL_HOME,
		about: SMALL_ABOUT
	})

	document.documentElement.style.setProperty("--navbar-width-thin", NAVBAR_WIDTH_THIN)
	document.documentElement.style.setProperty("--navbar-width-wide", NAVBAR_WIDTH_WIDE)

	return (
		<div className="Navbar" id="Navbar" onMouseOver={()=>{widen(setState)}} onMouseLeave={()=>{shrink(setState)}}>
			<NavbarItem name={state.home} linkTo=""/>
			<NavbarItem name={state.about} linkTo=""/>
		</div>
	)
}

function NavbarItem(props: {name: string, linkTo: string}) {
	return (
		<div className="NavbarItem">
			<Link to={props.linkTo}>{props.name}</Link>
		</div>
	)
}

function widen(setState: Function) {
	setState({
		home: WIDE_HOME,
		about: WIDE_ABOUT
	})
	document.getElementById(NAVBAR)!.style.width = NAVBAR_WIDTH_WIDE
}

function shrink(setState: Function) {
	setState({
		home: SMALL_HOME,
		about: SMALL_ABOUT
	})
	document.getElementById(NAVBAR)!.style.width = NAVBAR_WIDTH_THIN
}
