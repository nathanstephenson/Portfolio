import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Navbar.css'

const NAVBAR = "Navbar"
const NAVBAR_WIDTH_THIN = "5vw"
const NAVBAR_WIDTH_WIDE = "20vw"

const SMALL_HOME = '\u2302'
const WIDE_HOME = SMALL_HOME + ' HOME'
const SMALL_ABOUT = '\u2139'
const WIDE_ABOUT = SMALL_ABOUT + ' ABOUT'

const DAY_LOGO = '\u{26C5}'
const NIGHT_LOGO = '\u{1F312}'

export default function Navbar() {
	document.documentElement.style.setProperty("--navbar-width-thin", NAVBAR_WIDTH_THIN)
	document.documentElement.style.setProperty("--navbar-width-wide", NAVBAR_WIDTH_WIDE)

	var [pageState, setPageState] = useState({
		currentPage: "",
		darkMode: true
	})
	var [textState, setTextState] = useState({
		home: SMALL_HOME,
		about: SMALL_ABOUT,
		dark: NIGHT_LOGO
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
		const darkMode = !pageState.darkMode
		setPageState({
			currentPage: pageState.currentPage,
			darkMode: darkMode
		})
		setTextState({
			home: textState.home,
			about: textState.about,
			dark: darkMode ? NIGHT_LOGO : DAY_LOGO
		})
		if(darkMode){
			document.documentElement.style.setProperty('--background-colour-primary', 'var(--background-colour-primary-dark)')
			document.documentElement.style.setProperty('--background-colour-secondary', 'var(--background-colour-secondary-dark)')
			document.documentElement.style.setProperty('--text-colour', 'var(--background-colour-primary-light)')
		} else {
			document.documentElement.style.setProperty('--background-colour-primary', 'var(--background-colour-primary-light)')
			document.documentElement.style.setProperty('--background-colour-secondary', 'var(--background-colour-secondary-light)')
			document.documentElement.style.setProperty('--text-colour', 'var(--background-colour-primary-dark)')
		}
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
