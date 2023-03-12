import { useEffect, useRef, useState } from "react";

import './ContentBox.css'

const CONTENT_BOX = "ContentBox"

export default function ContentBox(props: any) {
	const [isVisible, setVisible] = useState(false);
	const domRef = useRef(null);

	useEffect(() => {
	  const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			setVisible(entry.isIntersecting)
		});
	  });
	  observer.observe(domRef.current!);
	}, []);

	return (
		<div className={`${CONTENT_BOX} ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
			{props.children}
		</div>
	)
}
