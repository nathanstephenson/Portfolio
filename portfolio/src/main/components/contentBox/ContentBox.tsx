import { useEffect, useRef, useState } from "react";

import 'App.css'
import './ContentBox.css'
import { getIntValue } from "Utils";

const CONTENT_BOX = "ContentBox"
const CONTENT_BOX_IMAGE = "ContentBoxImage"
const CONTENT_BOX_MAIN = "ContentBoxMain"
const CONTENT_BOX_TITLE = "ContentBoxTitle"

export default function ContentBox(props: {id?: string, img?: string, imgAlt?: string, text?: string, linkTarget?: string, outline?: boolean, children?: any}) {
	const [isVisible, setVisible] = useState(false);
	const domRef = useRef(null);
	const id = props.id ? props.id : Math.random().toString();

	useEffect(() => {

	  const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			setVisible(entry.isIntersecting)
			if(entry.isIntersecting){
				observer.disconnect()
			}
		});
	  });
	  if(props.outline){
			document.getElementById(id)!.style.borderTop = "var(--border-colour)"
		  	document.getElementById(id)!.style.borderBottom = "var(--border-colour)"
		  	document.getElementById(id)!.style.marginBottom = "2rem"
		  	if(props.children){
				document.getElementById(CONTENT_BOX_TITLE+id)!.style.borderBottom = "var(--border-colour)"
			}
			if(!props.img){
				const padding = "1rem";
				document.getElementById(CONTENT_BOX_TITLE+id)!.style.paddingLeft = padding
				document.getElementById(CONTENT_BOX_TITLE+id)!.style.paddingRight = padding
			}
	  }
	  observer.observe(domRef.current!);
	}, []);
	
	const image = <img id={CONTENT_BOX_IMAGE+id} src={props.img} alt={props.imgAlt ? props.imgAlt : 'image'} />
	return (
		<div className={`${CONTENT_BOX} ${isVisible ? '' : 'invisible'}`} id={id} ref={domRef}>
			{props.img && 
				(props.text ? <div className={CONTENT_BOX_IMAGE}>{image}</div> 
						: image
				)
			}
			<div className={CONTENT_BOX_MAIN}>
				{props.text && 
					(!props.linkTarget ? <p id={CONTENT_BOX_TITLE+id} className={CONTENT_BOX_TITLE}>{props.text}</p> 
							: <a id={CONTENT_BOX_TITLE+id} className={CONTENT_BOX_TITLE} href={props.linkTarget} target='_blank' rel="noreferrer">{props.text}</a>
					)
				}
				{props.children}
			</div>
		</div>
	)
}
