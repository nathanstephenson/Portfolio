import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './navbar/Navbar'
import About from './pages/about/About'
import Home from './pages/home/Home'

export default function Main() {
	return(
		<Router>
			<Navbar />
			<div className='App-main'>
				<Routes>
					<Route path="" element={<Home/>} />
					<Route path="about" element={<About/>} />
				</Routes>
			</div>
		</Router>
	)
}
