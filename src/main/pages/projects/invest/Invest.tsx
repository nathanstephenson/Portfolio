import {useEffect, useState} from "react"
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import {Scatter} from 'react-chartjs-2'

import './Invest.css'

import Title from "main/navbar/title/Title"
import ContentBox from "main/components/contentBox/ContentBox"

const REQ_ROOT = "http://localhost:8080/"

interface OutputData {
	value: number,
	timestamp: number
}

export default function Invest(): JSX.Element {
	const [ticker, setTicker] = useState('NFLX')
	const [data, setData] = useState([{value: 0, timestamp: 0}])
	const [tickerOptions, setTickerOptions] = useState([<></>])

	ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

	useEffect(() => {
		getData(ticker).then((res) => setData(res))
		getTickerOptions().then((res) => setTickerOptions(res.map(option => <TickerOption name={option} onClick={()=>{setTicker(option)}}/>)))
	}, [ticker])

	return (
		<>
			<Title name='Investing Algorithm'/>
			<Scatter data={mapChartData(ticker, data)}/>
			{tickerOptions.length === 0 ? <></> : <div className="TickerOptions">{tickerOptions}</div>}
			<button onClick={() => get(REQ_ROOT + "exec")}>Run Algo</button>
		</>
	)
}

function TickerOption(props: {name: string, onClick: ()=>void}): JSX.Element {
	return (
		<button onClick={props.onClick}>{props.name}</button>
	)
}

function mapChartData(ticker: string, data: OutputData[]) { // no return type thanks to bad ts compatibility
	const retVal = {
		datasets: [{
		      	label: ticker,
		     	data: data.map((dataPoint, index) => ({
				x: index,
				y: dataPoint.value,
		      	})),
		      	backgroundColor: 'rgba(255, 99, 132, 1)',
		}],
	}
	return retVal
}

async function getTickerOptions(): Promise<string[]> {
	const reqUrl = REQ_ROOT + "tickers"
	return get(reqUrl)
}

async function getData(ticker: string): Promise<OutputData[]> {
	const reqUrl = REQ_ROOT + "visualise?" + ticker
	return get(reqUrl)
}

async function get(reqUrl: string): Promise<any[]> {
	try {
		const response = await fetch(reqUrl)
		if (!response.ok) {
			throw new Error(`Failed to fetch data for ${reqUrl}: ${response.statusText}`)
		}
		return response.json()
	} catch (error) {
		if(error instanceof Error){
			throw new Error(`Error fetching data for ${reqUrl}: ${error.message}`)
		}
		throw error
	}	
}

