import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import About from './pages/about/About'
import Home from './pages/home/Home'

export default function Main() {
	return(
		<Router>
			<Navbar />
			<div id="App-including-footer" className="App-including-footer">
				<div id="App-main" className="App-main">
					<Routes>
						<Route path="" element={<Home/>} />
						<Route path="about" element={<About/>} />
					</Routes>
				</div>
				<Footer/>
			</div>
		</Router>
	)
}
