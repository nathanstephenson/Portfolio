import React from "react";
import { Link } from 'react-router-dom'

const NAVBAR_WIDTH = "--navbar-width"

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
	document.getElementById("Navbar")!.style.width = "20wv"
}

function shrink() {
	document.getElementById("Navbar")!.style.width = document.documentElement.style.getPropertyValue(NAVBAR_WIDTH)
}
