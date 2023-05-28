import { useEffect, useRef, useState } from "react";

import 'App.css'
import './ContentBox.css'
import { getIntValue } from "Utils";

const CONTENT_BOX = "ContentBox"
const CONTENT_BOX_IMAGE_AND_MAIN = "ContentBoxImageMain"
const CONTENT_BOX_IMAGE = "ContentBoxImage"
const CONTENT_BOX_MAIN = "ContentBoxMain"
const CONTENT_BOX_TITLE = "ContentBoxTitle"
const CONTENT_BOX_CHILDREN = "ContentBoxChildren"
const CONTENT_BOX_MAIN_AND_MORE_BUTTON = "ContentBoxMainMoreButton"
const CONTENT_BOX_MORE = "ContentBoxMore"
const CONTENT_BOX_MORE_BUTTON = "ContentBoxMoreButton" 

export default function ContentBox(props: {id?: string, className?:string, img?: string, imgAlt?: string, text?: string, linkTarget?: string, outline?: boolean, children?: any, more?: JSX.Element}) {
	const [isVisible, setVisible] = useState(false);
	const [showMore, setShowMore] = useState(false);
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

	useEffect(() => {
		if(props.outline){
			if(props.more && showMore){
				document.getElementById(CONTENT_BOX_IMAGE_AND_MAIN+id)!.style.borderBottom = "var(--border-colour)"
			} else {
				document.getElementById(CONTENT_BOX_IMAGE_AND_MAIN+id)!.style.borderBottom = ""
			}
		}
	}, [showMore])
	
	const image = <img id={CONTENT_BOX_IMAGE+id} src={props.img} alt={props.imgAlt ? props.imgAlt : 'image'} />
	const moreButton = <button className={CONTENT_BOX_MORE_BUTTON} onClick={() => setShowMore(!showMore)}>{showMore ? "/\\" : "\\/"}</button>
	return (
		<div className={`${CONTENT_BOX} ${props.className ? props.className  : ''} ${isVisible ? '' : 'invisible'} ${props.outline ? 'outlined' : ''}`} id={id} ref={domRef}>
			<div id={CONTENT_BOX_IMAGE_AND_MAIN+id} className={`${CONTENT_BOX_IMAGE_AND_MAIN}`}>
				{props.img && (props.text ? <div className={CONTENT_BOX_IMAGE}>{image}</div> : image)}
				<div className={CONTENT_BOX_MAIN_AND_MORE_BUTTON}>
					<div className={CONTENT_BOX_MAIN}>
						{props.text && 
							(!props.linkTarget ? <p id={CONTENT_BOX_TITLE+id} className={CONTENT_BOX_TITLE}>{props.text}</p> 
									: <a id={CONTENT_BOX_TITLE+id} className={CONTENT_BOX_TITLE} href={props.linkTarget} target='_blank' rel="noreferrer">{props.text}</a>
							)
						}
						<div className={CONTENT_BOX_CHILDREN}>{props.children}</div>
					</div>
					{props.more && moreButton}
				</div>
			</div>
			{showMore && <div className={CONTENT_BOX_MORE}>{props.more}</div>}
		</div>
	)
}

