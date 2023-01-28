import { Link } from 'react-router-dom'
import './Navbar.css'

const NAVBAR = "Navbar"
const NAVBAR_WIDTH_THIN = "10vw"
const NAVBAR_WIDTH_WIDE = "20vw"

export default function Navbar() {
	document.documentElement.style.setProperty("--navbar-width-thin", NAVBAR_WIDTH_THIN)
	document.documentElement.style.setProperty("--navbar-width-wide", NAVBAR_WIDTH_WIDE)

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
	document.getElementById(NAVBAR)!.style.width = NAVBAR_WIDTH_WIDE
}

function shrink() {
	document.getElementById(NAVBAR)!.style.width = NAVBAR_WIDTH_THIN
}
