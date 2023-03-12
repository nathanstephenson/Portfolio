import { useRef, useState } from "react";

import './Welcome.css'

const WELCOME = "Welcome"

export default function Welcome(props: any) {
	const domRef = useRef(null);

	
	return (
		<div className={WELCOME} ref={domRef}>
			Welcome
		</div>
	)
}
