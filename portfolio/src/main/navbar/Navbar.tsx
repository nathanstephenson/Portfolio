import React from "react";
import { Link } from 'react-router-dom'

const NAVBAR_WIDTH = "--navbar-width"
const NAVBAR = "Navbar"
const APP = "App-main"

export default function Navbar() {

	return (
		<div className="Navbar" id="Navbar" onMouseOver={()=>{widen()}} onMouseLeave={()=>{shrink()}}>
			<NavbarItem name="Home" linkTo=""/>
			<NavbarItem name="About" linkTo=""/>
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

function widen() {
	document.getElementById(NAVBAR)!.style.width = "20vw"
	document.getElementById(APP)!.style.width = "80vw"
}

function shrink() {
	document.getElementById(NAVBAR)!.style.width = document.documentElement.style.getPropertyValue(NAVBAR_WIDTH)
	document.getElementById(APP)!.style.width = "90vw"
}
