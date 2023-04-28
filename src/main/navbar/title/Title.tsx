import { useLayoutEffect } from 'react'
import './Title.css'

const TITLE = "Title"
const PLACEHOLDER = "Placeholder"

export default function Title(props: {name: string}) {
	useLayoutEffect(()=>{
		console.log(props.name)
	}, [])
	return (
		<div className={`${TITLE} ${props.name.endsWith(PLACEHOLDER) ? '.hidden' : ''}`}>
			{props.name}
		</div>
	)
}
