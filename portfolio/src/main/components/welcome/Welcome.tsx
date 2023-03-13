import { useLayoutEffect, useRef } from "react";

import './Welcome.css'

const WELCOME = "Welcome"

export default function Welcome(props: any) {

	useLayoutEffect(() => {
		function onScroll() {
			const welcome = document.getElementById(WELCOME)!
			const height = Number.parseInt(welcome.style.minHeight!.match('^[0-9]*')?.[0]!)
			const welcomeHeight = (height / 100) * window.innerHeight;
			const scrollPercent = calculateSrollPercent(welcomeHeight, 0.5)
			console.log(scrollPercent)
			welcome.style.opacity = scrollPercent + '%'
			welcome.style.minHeight = '100vh'
			// if(scrollPercent === 0){
			// 	welcome.remove()
			// 	window.removeEventListener('scroll', onScroll)
			// 	setTimeout(() => {
			// 		document.documentElement.scrollTop = 0;
			// 	}, 100)
			// }
		}
	  	window.addEventListener('scroll', onScroll)
	}, []);

	return (
		<div id={WELCOME} className={WELCOME}>
			Welcome
		</div>
	)
}

function calculateSrollPercent(componentHeight: number, rate: number) : number{
	const welcomeScrollAmount = (componentHeight - window.scrollY/rate)
	const welcomeScrollPercent = (welcomeScrollAmount/componentHeight)*100
	return welcomeScrollPercent > 0 ? welcomeScrollPercent : 0
}
