import {useLayoutEffect, useState} from "react"
import {Line} from 'react-chartjs-2'

export default function Invest(){
	const [data, setData] = useState([])

	useLayoutEffect(() => {
		getData('AAPL').then(res => console.log(res))
	}, [])

	return (
		<>
			This is going to house all my invest stuff
		</>
	)
}

interface OutputData {
	value: number,
	timestamp: number
}

async function getData(ticker: string): Promise<OutputData[]> {
	try {
		const response = await fetch("http://localhost:8080/visualise?" + ticker, {mode: 'no-cors'})
		console.log(response)
		if (!response.ok) {
			throw new Error(`Failed to fetch data for ticker ${ticker}: ${response.statusText}`)
		}
		return response.json()
	} catch (error) {
		if(error instanceof Error){
			throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`)
		}
		throw error
	}	
}

