import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './navbar/Navbar';
import Home from './home/Home'

export default function Main() {
	return(
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route path="" element={<Home/>} />
				</Routes>
			</div>
		</Router>
	)
}
