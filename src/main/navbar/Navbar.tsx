import { useLayoutEffect, useState } from 'react'
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
	const [textState, setTextState] = useState({
		home: SMALL_HOME,
		about: SMALL_ABOUT,
		projects: SMALL_PROJECTS
	})
	const [currentPage, setCurrentPage] = useState({
		address: "",
		logo: SMALL_HOME
	})
	const [darkModeToggle, setDarkModeToggle] = useState({
		isDark: false,
		text: NIGHT_LOGO,
	})
	const [isWide, setIsWide] = useState(false)

	useLayoutEffect(()=>{
		document.addEventListener('click', closeIfClickOutside)
	}, [])

	function widen() {
		if(isWide){
			return;
		}
		setTimeout(() => {
			setTextState({
				home: WIDE_HOME,
				about: WIDE_ABOUT,
				projects: WIDE_PROJECTS
			})
		}, 50)
		setIsWide(true)
		document.documentElement.style.setProperty("--main-blur-amount", BLUR_AMOUNT)
		document.documentElement.style.setProperty("--body-interaction", "none")
		document.documentElement.style.setProperty("--webkit-user-select", "none")
	}
	
	function shrink() {
		setTextState({
			home: SMALL_HOME,
			about: SMALL_ABOUT,
			projects: SMALL_PROJECTS
		})
		setIsWide(false)
		document.documentElement.style.setProperty("--main-blur-amount", "0px")
		document.documentElement.style.setProperty("--body-interaction", "all")
		document.documentElement.style.setProperty("--webkit-user-select", "text")
	}

	function updateCurrentPage(linkTo: string, pageLogo: JSX.Element) {
		if(linkTo === currentPage.address){
			setTimeout(shrink, 50)
			return;
		}
		setCurrentPage({
			address: linkTo,
			logo: pageLogo
		})
		document.documentElement.scrollTop = 0;
		setTimeout(shrink, 50)
	}

	function updateDarkMode() {
		const newDarkMode = !darkModeToggle.isDark
		setDarkModeToggle({
			isDark: newDarkMode, 
			text: newDarkMode ? NIGHT_LOGO : DAY_LOGO
		})
		if(newDarkMode){
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

	function closeIfClickOutside(e: any) {
		if(e.target!.className !== NAVBAR_ITEM && e.target!.className !== NAVBAR && e.target!.className.baseVal !== 'NavbarIcon' && e.target!.className.baseVal !== ''){
			shrink()
		}
	}

	return (
		<div className={NAVBAR} id={NAVBAR} onClick={widen} onMouseLeave={shrink}>
			{isWide ? <>
				<NavbarItem name={textState.home} linkTo="" pageLogo={SMALL_HOME} onClick={updateCurrentPage}/>
				<NavbarItem name={textState.about} linkTo="about" pageLogo={SMALL_ABOUT} onClick={updateCurrentPage}/>
				<NavbarItem name={textState.projects} linkTo="projects" pageLogo={SMALL_PROJECTS} onClick={updateCurrentPage}/>
				<NavbarItem name={darkModeToggle.text} linkTo={currentPage.address} pageLogo={currentPage.logo} onClick={updateDarkMode}/>
			</> : <>
				<div id={Math.random().toString()} className={NAVBAR_ITEM}>{currentPage.logo}</div>
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
	return getAspectRatio() < 0.9
}

function getAspectRatio() : number {
	const height: number = window.innerHeight
	const width: number = window.innerWidth
	const aspect: number = width / height
	return aspect
}
