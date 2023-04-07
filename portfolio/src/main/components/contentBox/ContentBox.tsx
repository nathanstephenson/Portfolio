import { useEffect, useRef, useState } from "react";

import './ContentBox.css'

const CONTENT_BOX = "ContentBox"

export default function ContentBox(props: {img?: string, imgAlt?: string, text?: string, linkText?: string, linkTarget?: string, outline?: boolean, children?: any}) {
	const [isVisible, setVisible] = useState(false);
	const domRef = useRef(null);
	const id = Math.random().toString()

	useEffect(() => {

	  const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			setVisible(entry.isIntersecting)
		});
	  });
	  console.log(props)
	  if(props.outline){
		  document.getElementById(id)!.style.border = "var(--border-colour)"
	  }
	  observer.observe(domRef.current!);
	}, []);

	return (
		<div className={`${CONTENT_BOX} ${isVisible ? 'is-visible' : ''}`} id={id} ref={domRef}>
			<>
				{props.img && <img src={props.img} alt={props.imgAlt ? props.imgAlt : 'image'}/>}
				{props.text && <p>{props.text}</p>}
				{props.linkText && <a href={props.linkTarget}>{props.linkText}</a>}
			</>
			{props.children}
		</div>
	)
}
