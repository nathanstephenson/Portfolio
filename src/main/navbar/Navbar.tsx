import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
const DAY_LOGO = SUN
const NIGHT_LOGO = MOON

const locationIcons = new Map()
locationIcons.set(undefined, SMALL_HOME)
locationIcons.set("about", SMALL_ABOUT)
locationIcons.set("projects", SMALL_PROJECTS)

export default function Navbar() {
	const location = useLocation().pathname.match('([^#/]+$)')?.[0]

	const [textState, setTextState] = useState({
		home: SMALL_HOME,
		about: SMALL_ABOUT,
		projects: SMALL_PROJECTS
	})
	const [currentPage, setCurrentPage] = useState({
		address: location ? location : "",
		logo: locationIcons.get(location)
	})
	const [darkModeToggle, setDarkModeToggle] = useState({
		isDark: true,
		text: NIGHT_LOGO,
	})
	const [isOpen, setIsOpen] = useState(false)

	useLayoutEffect(()=>{
		function closeIfClickOutside(e: any) {
			if(e.target!.className !== NAVBAR_ITEM 
				&& e.target!.className !== NAVBAR 
				&& e.target!.className.baseVal !== 'NavbarIcon' 
				&& e.target!.className.baseVal !== ''){
				shrink()
			}
		}
		document.addEventListener('click', closeIfClickOutside)
		changeThemeColor()
	}, [])

	useEffect(()=>{
		function updateCurrentPage(linkTo: string = "", pageLogo: JSX.Element) {
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
		updateCurrentPage(location, locationIcons.get(location))
	}, [location])

	function widen() {
		if(isOpen){
			return;
		}
		setTimeout(() => {
			setTextState({
				home: WIDE_HOME,
				about: WIDE_ABOUT,
				projects: WIDE_PROJECTS
			})
		}, 50)
		setIsOpen(true)
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
		setIsOpen(false)
		document.documentElement.style.setProperty("--main-blur-amount", "0px")
		document.documentElement.style.setProperty("--body-interaction", "all")
		document.documentElement.style.setProperty("--webkit-user-select", "text")
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
		changeThemeColor()
	}

	return (
		<div className={`${NAVBAR} ${isOpen ? 'open' : 'closed'}`} id={NAVBAR} onClick={widen} onMouseLeave={shrink}>
			{isOpen ? <>
				<NavbarItem name={textState.home} linkTo="" pageLogo={SMALL_HOME}/>
				<NavbarItem name={textState.about} linkTo="about" pageLogo={SMALL_ABOUT}/>
				<NavbarItem name={textState.projects} linkTo="projects" pageLogo={SMALL_PROJECTS}/>
				<NavbarItem name={darkModeToggle.text} linkTo={currentPage.address} pageLogo={currentPage.logo} onClick={updateDarkMode}/>
			</> : <>
				<div id={Math.random().toString()} className={NAVBAR_ITEM}>{currentPage.logo}</div>
			</>}
		</div>
	)
}

function NavbarItem(props: {name: JSX.Element, linkTo: string, pageLogo: JSX.Element, onClick?: (linkTo: string, pageLogo: JSX.Element)=>void}) {
	return (
		<div id={Math.random().toString()} className={NAVBAR_ITEM} onClick={props.onClick ? ()=>{props.onClick!(props.linkTo, props.pageLogo)} : ()=>{}}>
			<Link to={props.linkTo}>{props.name}</Link>
		</div>
	)
}

function changeThemeColor() {
    const metaThemeColor = document.querySelector("meta[name=theme-color]")!
    metaThemeColor.setAttribute("content", document.documentElement.getAttribute("var(--background-colour-primary)")!)
	console.log(metaThemeColor,document.documentElement.getAttribute("var(--background-colour-primary)"))
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
