import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import 'App.css'
import './Navbar.css'
import { getIntValue } from 'Utils'
import { MOON, SUN, SQUARE as HOME, ABOUT, PROJECTS } from 'images/svg'

const APP_INCLUDING_FOOTER = "App-including-footer"
const BLUR_AMOUNT = "10px"

const NAVBAR_ITEM = "NavbarItem"
const NAVBAR = "Navbar"
const NAVBAR_WIDTH_THIN = "5%"
const NAVBAR_WIDTH_WIDE = "20%"

const SMALL_HOME = HOME
const WIDE_HOME = <>HOME</>
const SMALL_ABOUT = ABOUT
const WIDE_ABOUT = <>ABOUT</>
const SMALL_PROJECTS = PROJECTS
const WIDE_PROJECTS = <>PROJECTS</>
const DAY_LOGO = MOON
const NIGHT_LOGO = SUN

export default function Navbar() {
	var [pageState, setPageState] = useState({
		currentPage: "",
		darkMode: true
	})
	var [textState, setTextState] = useState({
		home: SMALL_HOME,
		about: SMALL_ABOUT,
		projects: SMALL_PROJECTS,
		dark: NIGHT_LOGO
	})
	const navbarWidthThin = getNavbarWidthThin()

	useLayoutEffect(() => {
		setNavbarPosition()
		window.addEventListener('resize', setNavbarPosition)
	}, [])

	function widen() {
		if(isNavbarVertical()){
			setTimeout(() => {
				if(document.getElementById(NAVBAR)!.style.width === NAVBAR_WIDTH_WIDE){
					setTextState({
						home: WIDE_HOME,
						about: WIDE_ABOUT,
						projects: WIDE_PROJECTS,
						dark: textState.dark
					})
				}
			}, 50)
			document.getElementById(NAVBAR)!.style.width = NAVBAR_WIDTH_WIDE
			document.documentElement.style.setProperty("--main-blur-amount", BLUR_AMOUNT)
		}
	}
	
	function shrink() {
		if(isNavbarVertical()){
			setTextState({
				home: SMALL_HOME,
				about: SMALL_ABOUT,
				projects: SMALL_PROJECTS,
				dark: textState.dark
			})
			document.getElementById(NAVBAR)!.style.width = navbarWidthThin
			document.documentElement.style.setProperty("--main-blur-amount", "0px")
		}
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
			projects: textState.projects,
			dark: darkMode ? NIGHT_LOGO : DAY_LOGO
		})
		if(darkMode){
			document.documentElement.style.setProperty('--background-colour-primary', 'var(--background-colour-primary-dark)')
			document.documentElement.style.setProperty('--background-colour-secondary', 'var(--background-colour-secondary-dark)')
			document.documentElement.style.setProperty('--text-colour-primary', 'var(--background-colour-primary-light)')
			document.documentElement.style.setProperty('--text-colour-secondary', 'var(--background-colour-primary-dark)')
		} else {
			document.documentElement.style.setProperty('--background-colour-primary', 'var(--background-colour-primary-light)')
			document.documentElement.style.setProperty('--background-colour-secondary', 'var(--background-colour-secondary-light)')
			document.documentElement.style.setProperty('--text-colour-primary', 'var(--background-colour-primary-dark)')
			document.documentElement.style.setProperty('--text-colour-secondary', 'var(--background-colour-primary-light)')
		}
	}

	const updateCurrentPage = (linkTo: string) => {
		setPageState({
			currentPage: linkTo,
			darkMode: pageState.darkMode
		})
		document.documentElement.scrollTop = 0;
	}

	return (
		<div className={NAVBAR} id={NAVBAR} onMouseOver={widen} onMouseLeave={shrink}>
			<NavbarItem name={textState.home} linkTo="" onClick={updateCurrentPage}/>
			<NavbarItem name={textState.about} linkTo="about" onClick={updateCurrentPage}/>
			<NavbarItem name={textState.projects} linkTo="projects" onClick={updateCurrentPage}/>
			<NavbarItem name={textState.dark} linkTo={pageState.currentPage} onClick={updateNightMode}/>
		</div>
	)
}

function NavbarItem(props: {name: JSX.Element, linkTo: string, onClick: (linkTo: string)=>void}) {
	return (
		<div id={Math.random().toString()} className={NAVBAR_ITEM} onClick={()=>{props.onClick(props.linkTo)}}>
			<Link to={props.linkTo}>{props.name}</Link>
		</div>
	)
}
function setNavbarPosition() {
	const isVertical : boolean = isNavbarVertical()
	const navbarWidthThin : string = getNavbarWidthThin()
	document.documentElement.style.setProperty("--navbar-width-thin", navbarWidthThin)
	document.documentElement.style.setProperty("--navbar-width-wide", NAVBAR_WIDTH_WIDE)
	document.documentElement.style.setProperty("--navbar-item-spacing", "1" + (isVertical ? "vh" : "vw"))
	document.getElementById(NAVBAR)!.style.bottom = isVertical ? "0vh" : "auto"
	document.getElementById(NAVBAR)!.style.right = isVertical ? "auto" : "0vw"
	document.getElementById(NAVBAR)!.style.flexDirection = isVertical ? "column" : "row"
	document.getElementById(NAVBAR)!.style.height = isVertical ? "100%" : navbarWidthThin
	document.getElementById(NAVBAR)!.style.minHeight = isVertical ? "100%" : navbarWidthThin
	document.getElementById(NAVBAR)!.style.width = isVertical ? navbarWidthThin : "100%"
	document.getElementById(NAVBAR)!.style.minWidth = isVertical ? navbarWidthThin : "100%"
	// document.getElementById(APP_INCLUDING_FOOTER)!.style.marginLeft = isVertical ? navbarWidthThin : "0vw"
	document.getElementById(APP_INCLUDING_FOOTER)!.style.marginTop = isVertical ? "0vh" : getIntValue(NAVBAR_WIDTH_THIN)+"%"

	//Correctly position day/night option in navbar
	const navbarItems = document.getElementsByClassName("NavbarItem")!
	const lastNavbarItemId = navbarItems.item(navbarItems.length - 1)!.getAttribute("id")!
	document.getElementById(lastNavbarItemId)!.style.marginInlineStart = isVertical ? "var(--navbar-item-spacing)" : "auto"
	document.getElementById(lastNavbarItemId)!.style.marginBlockStart = isVertical ? "auto" : "var(--navbar-item-spacing)"
}

function getNavbarWidthThin(){
	const amount = Math.min(getIntValue(NAVBAR_WIDTH_THIN) * getAspectRatio(), getIntValue(NAVBAR_WIDTH_THIN))
	return amount + "%"
}

function isNavbarVertical() : boolean {
	const aspect: number = getAspectRatio()
	return aspect > 0.9
}

function getAspectRatio() : number {
	const height: number = window.innerHeight
	const width: number = window.innerWidth
	const aspect: number = width / height
	return aspect
}
