import 'App.css'
import './Footer.css'
import { GITHUB_ICON } from 'images/svg'

const FOOTER = "Footer"

export default function Footer() {
	return (
	  <div id={FOOTER} className={FOOTER}>
	  	<div className='Footer-row'>
			Nathan Stephenson | <a href='https://github.com/nathanstephenson'  target='_blank' rel='noreferrer noopener'>{GITHUB_ICON} github</a>
		</div>
		<div className='Footer-row'>
			{'\uFF3B'}made with <a href='https://beta.reactjs.org/'  target='_blank' rel='noreferrer noopener'>React{'\uFF3D'}</a>
		</div>
	  </div>
	);
  }
