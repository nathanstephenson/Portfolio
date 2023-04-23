import 'App.css'
import './Footer.css'
import { GITHUB_ICON } from 'images/svg'

const FOOTER = "Footer"

export default function Footer() {
	return (
	  <div id={FOOTER} className={FOOTER}>
	  	<div className='Footer-row'>
			by Nathan Stephenson
		</div>
	  	<div className='Footer-row'>
		  	{'\uFF3B'}<a href='https://github.com/nathanstephenson/Portfolio'  target='_blank' rel='noreferrer noopener'>{GITHUB_ICON} project repo</a>{'\uFF3D'}
		</div>
		<div className='Footer-row'>
			{'\uFF3B'}made with <a href='https://beta.reactjs.org/'  target='_blank' rel='noreferrer noopener'>React</a>{'\uFF3D'}
		</div>
	  </div>
	);
  }
