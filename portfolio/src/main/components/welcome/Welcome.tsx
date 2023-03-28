import { useLayoutEffect } from "react";

import './Welcome.css'

const WELCOME = "Welcome"
const WELCOME_CONTENT = "Welcome-content"
const WELCOME_TEXT = "Welcome-text";
const PARALLAX_MODIFIER = 0.8;

export default function Welcome(props: any) {
	document.documentElement.style.setProperty('--parallax-modifier', PARALLAX_MODIFIER.toString())

	useLayoutEffect(() => {
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
	  	window.addEventListener('scroll', render)
		render()
	}, []);

	return (
		<div id={WELCOME} className={WELCOME}>
			<div id={WELCOME_CONTENT}>
				<p className={WELCOME_TEXT}>Nathan Stephenson</p>
			</div>
		</div>
	)
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
