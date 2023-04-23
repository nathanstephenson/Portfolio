import { useState } from 'react'
import { Link } from 'react-router-dom'

import 'App.css'
import './Navbar.css'
import { MOON, SUN, SQUARE as HOME, ABOUT, PROJECTS } from 'images/svg'

const BLUR_AMOUNT = "10px"

const NAVBAR_ITEM = "NavbarItem"
const NAVBAR = "Navbar"

const SMALL_HOME = HOME
const WIDE_HOME = <>{SMALL_HOME} HOME</>
const SMALL_ABOUT = ABOUT
const WIDE_ABOUT = <>{SMALL_ABOUT} ABOUT</>
const SMALL_PROJECTS = PROJECTS
const WIDE_PROJECTS = <>{SMALL_PROJECTS} PROJECTS</>
const DAY_LOGO = MOON
const NIGHT_LOGO = SUN

export default function Navbar() {
	var [pageState, setPageState] = useState({
		currentPageAddress: "",
		currentPageLogo: SMALL_HOME,
		isWide: false,
		darkMode: true
	})
	var [textState, setTextState] = useState({
		home: SMALL_HOME,
		about: SMALL_ABOUT,
		projects: SMALL_PROJECTS,
		dark: NIGHT_LOGO
	})

	function widen() {
		if(pageState.isWide){
			return;
		}
		setTimeout(() => {
			setTextState({
				home: WIDE_HOME,
				about: WIDE_ABOUT,
				projects: WIDE_PROJECTS,
				dark: textState.dark
			})
		}, 50)
		setPageState({
			currentPageAddress: pageState.currentPageAddress,
			currentPageLogo: pageState.currentPageLogo,
			isWide: true,
			darkMode: pageState.darkMode
		})
		document.documentElement.style.setProperty("--main-blur-amount", BLUR_AMOUNT)
		document.documentElement.style.setProperty("--body-interaction", "none")
	}
	
	function shrink() {
		setTextState({
			home: SMALL_HOME,
			about: SMALL_ABOUT,
			projects: SMALL_PROJECTS,
			dark: textState.dark
		})
		setPageState({
			currentPageAddress: pageState.currentPageAddress,
			currentPageLogo: pageState.currentPageLogo,
			isWide: false,
			darkMode: pageState.darkMode
		})
		document.documentElement.style.setProperty("--main-blur-amount", "0px")
		document.documentElement.style.setProperty("--body-interaction", "all")
	}

	function updateCurrentPage(linkTo: string, pageLogo: JSX.Element) {
		if(linkTo === pageState.currentPageAddress){
			setTimeout(shrink, 50)
			return;
		}
		console.log(linkTo)
		setPageState({
			currentPageAddress: linkTo,
			currentPageLogo: pageLogo,
			isWide: pageState.isWide,
			darkMode: pageState.darkMode
		})
		console.log(pageState)
		document.documentElement.scrollTop = 0;
		setTimeout(shrink, 50)
	}

	function updateNightMode() {
		const darkMode = !pageState.darkMode
		setTextState({
			home: textState.home,
			about: textState.about,
			projects: textState.projects,
			dark: darkMode ? NIGHT_LOGO : DAY_LOGO
		})
		setPageState({
			currentPageAddress: pageState.currentPageAddress,
			currentPageLogo: pageState.currentPageLogo,
			isWide: pageState.isWide,
			darkMode: darkMode
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

	return (
		<div className={NAVBAR} id={NAVBAR} onClick={widen} onMouseLeave={shrink}>
			{pageState.isWide ? <>
				<NavbarItem name={textState.home} linkTo="" pageLogo={SMALL_HOME} onClick={updateCurrentPage}/>
				<NavbarItem name={textState.about} linkTo="about" pageLogo={SMALL_ABOUT} onClick={updateCurrentPage}/>
				<NavbarItem name={textState.projects} linkTo="projects" pageLogo={SMALL_PROJECTS} onClick={updateCurrentPage}/>
				<NavbarItem name={textState.dark} linkTo={pageState.currentPageAddress} pageLogo={pageState.currentPageLogo} onClick={updateNightMode}/>
			</> : <>
				<div id={Math.random().toString()} className={NAVBAR_ITEM}>{pageState.currentPageLogo}</div>
			</>}
		</div>
	)
}

function NavbarItem(props: {name: JSX.Element, linkTo: string, pageLogo: JSX.Element, onClick: (linkTo: string, pageLogo: JSX.Element)=>void}) {
	return (
		<div id={Math.random().toString()} className={NAVBAR_ITEM} onClick={()=>{props.onClick(props.linkTo, props.pageLogo)}}>
			<Link to={props.linkTo}>{props.name}</Link>
		</div>
	)
}

function isPageVertical() : boolean {
	return getAspectRatio() > 0.9
}

function getAspectRatio() : number {
	const height: number = window.innerHeight
	const width: number = window.innerWidth
	const aspect: number = width / height
	return aspect
}
