import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const NAVBAR = "Navbar"
const NAVBAR_WIDTH_THIN = "5vw"
const NAVBAR_WIDTH_WIDE = "20vw"

const SMALL_HOME = '\u2302'
const WIDE_HOME = SMALL_HOME + ' HOME'
const SMALL_ABOUT = '\u2139'
const WIDE_ABOUT = SMALL_ABOUT + ' ABOUT'

const DAY_LOGO = '\u2600'
const NIGHT_LOGO = '\u236E'

export default function Navbar() {
	document.documentElement.style.setProperty("--navbar-width-thin", NAVBAR_WIDTH_THIN)
	document.documentElement.style.setProperty("--navbar-width-wide", NAVBAR_WIDTH_WIDE)

	var [pageState, setPageState] = useState({
		currentPage: "",
		darkMode: false
	})
	var [textState, setTextState] = useState({
		home: SMALL_HOME,
		about: SMALL_ABOUT,
		dark: darkModeToggleText(pageState)
	})

	function widen() {
		setTextState({
			home: WIDE_HOME,
			about: WIDE_ABOUT,
			dark: textState.dark
		})
		document.getElementById(NAVBAR)!.style.width = NAVBAR_WIDTH_WIDE
	}
	
	function shrink() {
		setTextState({
			home: SMALL_HOME,
			about: SMALL_ABOUT,
			dark: textState.dark
		})
		document.getElementById(NAVBAR)!.style.width = NAVBAR_WIDTH_THIN
	}

	const updateNightMode = () => {
		setPageState({
			currentPage: pageState.currentPage,
			darkMode: !pageState.darkMode
		})
		setTextState({
			home: textState.home,
			about: textState.about,
			dark: darkModeToggleText(pageState)
		})
	}

	const updatePageState = (linkTo: string) => {
		setPageState({
			currentPage: linkTo,
			darkMode: pageState.darkMode
		})
	}


	return (
		<div className="Navbar" id="Navbar" onMouseOver={widen} onMouseLeave={shrink}>
			<NavbarItem name={textState.home} linkTo="" onClick={updatePageState}/>
			<NavbarItem name={textState.about} linkTo="about" onClick={updatePageState}/>
			<NavbarItem name={textState.dark} linkTo={pageState.currentPage} onClick={updateNightMode}/>
		</div>
	)
}

function NavbarItem(props: {name: string, linkTo: string, onClick: (linkTo: string)=>void}) {
	return (
		<div className="NavbarItem" onClick={()=>{props.onClick(props.linkTo)}}>
			<Link to={props.linkTo}>{props.name}</Link>
		</div>
	)
}

function darkModeToggleText(pageState:any) : string{
	return pageState.darkMode ? NIGHT_LOGO : DAY_LOGO
}
