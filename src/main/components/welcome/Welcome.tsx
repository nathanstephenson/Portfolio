import { useLayoutEffect } from "react";

import './Welcome.css'
import ContentBox from "../contentBox/ContentBox";
import { GITHUB_ICON, LINKEDIN_ICON } from "images/svg";

const WELCOME = "Welcome"
const WELCOME_CONTENT = "WelcomeContent"
const WELCOME_TEXT = "WelcomeText";
const WELCOME_LINKS = "WelcomeLinks"
const PARALLAX_MODIFIER = 0.8;

export default function Welcome(props: any) {
	useLayoutEffect(() => {
		document.documentElement.style.setProperty('--parallax-modifier', PARALLAX_MODIFIER.toString())
	  	window.addEventListener('scroll', render)
		render()
		return () => {
			window.removeEventListener('scroll', render)
		}
	}, []);

	return (
		<div id={WELCOME} className={WELCOME}>
			<ContentBox id={WELCOME_CONTENT}>
				<p className={WELCOME_TEXT}>Nathan Stephenson</p>
				<div className={WELCOME_LINKS}>
					<WelcomeLink link='https://www.linkedin.com/in/nathan-stephenson-5873a81b3/' text={LINKEDIN_ICON}/> | 
					<WelcomeLink link='https://github.com/nathanstephenson' text={GITHUB_ICON}/>
				</div>
			</ContentBox>
		</div>
	)
}

function render() {
	const welcome = document.getElementById(WELCOME)!
	const height = Number.parseInt(welcome.style.minHeight!.match('^[0-9]*')?.[0]!)
	const welcomeHeight = (height / 100) * window.innerHeight;
	const scrollPercent = calculateSrollPercent(welcomeHeight, PARALLAX_MODIFIER)
	welcome.style.minHeight = '100vh'
	setContentPosition(scrollPercent);
	const welcome_content = document.getElementById(WELCOME_CONTENT)!
	console.log(welcome_content.style.transform)
}

function setContentPosition(scrollPercent: number) {
	const transformModifier = (200*PARALLAX_MODIFIER) - (scrollPercent * PARALLAX_MODIFIER);
	const welcome_content = document.getElementById(WELCOME_CONTENT)!
	const yVal = 100 - bellCurve(transformModifier, 50, 60) * 10000
	welcome_content.style.transform = 'translateY(' + yVal + '%)';
}

function calculateSrollPercent(componentHeight: number, rate: number) : number{
	const welcomeScrollAmount = (componentHeight - window.scrollY/rate)
	const welcomeScrollPercent = (welcomeScrollAmount/componentHeight)*100
	return welcomeScrollPercent > 0 ? welcomeScrollPercent : 0
}

function bellCurve(x: number, mean: number, standardDeviation: number) {
	var stdDev = standardDeviation || 1;
	var m = mean || 0;
	var variance = stdDev * stdDev;
	var a = 1 / Math.sqrt(2 * Math.PI * variance);
	var b = -1 * ((x - m) * (x - m)) / (2 * variance);
	return a * Math.exp(b);
}

function WelcomeLink(props: {link: string, text: JSX.Element}){
	return (
		<a href={props.link}  target='_blank' rel='noreferrer noopener'>{props.text}</a>
	)
}
