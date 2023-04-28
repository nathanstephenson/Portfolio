import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import 'App.css'
import './Navbar.css'
import { MOON, SUN, BARS } from 'images/svg'
import Title from './title/Title'

const NAVBAR_ITEM = "NavbarItem"
const NAVBAR = "Navbar"
const HEADER = "Header"

const EMPTY_NAME = <></>
const HOME = <>HOME</>
const ABOUT = <>ABOUT</>
const PROJECTS = <>PROJECTS</>
const DAY_LOGO = SUN
const NIGHT_LOGO = MOON

export default function Navbar() {
	const location = useLocation().pathname.match('([^#/]+$)')?.[0]

	const [textState, setTextState] = useState({
		home: EMPTY_NAME,
		about: EMPTY_NAME,
		projects: EMPTY_NAME
	})
	const [currentPage, setCurrentPage] = useState({
		address: location ? location : "",
		logo: BARS
	})
	// const [title, updateTitle] = useState({
	// 	name: currentPage.address.toUpperCase(),
	// 	showTitle: currentPage.address !== ''
	// })
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
		function updateCurrentPage(linkTo: string = "") {
			if(linkTo === currentPage.address){
				setTimeout(shrink, 50)
				return;
			}
			setCurrentPage({
				address: linkTo,
				logo: currentPage.logo
			})
			// updateTitle(({
			// 	name: linkTo.toUpperCase(),
			// 	showTitle: linkTo !== ""
			// }))
			document.documentElement.scrollTop = 0;
			setTimeout(shrink, 50)
		}
		updateCurrentPage(location)
	}, [location])

	function widen() {
		if(isOpen){
			return;
		}
		setTimeout(() => {
			setTextState({
				home: HOME,
				about: ABOUT,
				projects: PROJECTS
			})
		}, 50)
		setIsOpen(true)
		document.documentElement.style.setProperty("--main-blur-amount", "var(--blur-amount)")
		document.documentElement.style.setProperty("--body-interaction", "none")
		document.documentElement.style.setProperty("--webkit-user-select", "none")
	}
	
	function shrink() {
		setTextState({
			home: EMPTY_NAME,
			about: EMPTY_NAME,
			projects: EMPTY_NAME
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
		<div className={HEADER}>
			<div className={`${NAVBAR} ${isOpen ? 'open' : 'closed'}`} id={NAVBAR} onClick={widen} onMouseLeave={shrink}>
				{isOpen ? <>
					<NavbarItem name={textState.home} linkTo=""/>
					<NavbarItem name={textState.about} linkTo="about"/>
					<NavbarItem name={textState.projects} linkTo="projects"/>
					<NavbarItem name={darkModeToggle.text} linkTo={currentPage.address} onClick={updateDarkMode}/>
				</> : <>
					<div id={Math.random().toString()} className={NAVBAR_ITEM}>{currentPage.logo}</div>
				</>}
			</div>
		</div>
	)
}

function NavbarItem(props: {name: JSX.Element, linkTo: string, onClick?: (linkTo: string)=>void}) {
	return (
		<div id={Math.random().toString()} className={NAVBAR_ITEM} onClick={props.onClick ? ()=>{props.onClick!(props.linkTo)} : ()=>{}}>
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
