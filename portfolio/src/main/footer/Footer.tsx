import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import './Footer.css'

export default function Footer() {
	return (
	  <div className="Footer">
		<table>
			<tr>
				<td>
					Nathan Stephenson
				</td>
			</tr>
			<tr>
				<td>
					Github
				</td>
			</tr>
			<tr>
				<td>
					Made with React
				</td>
			</tr>
		</table>
	  </div>
	);
  }
