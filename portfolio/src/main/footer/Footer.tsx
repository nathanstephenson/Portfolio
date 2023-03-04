import 'App.css'
import './Footer.css'
import { GITHUB_ICON } from 'images/svg'

const FOOTER = "Footer"

export default function Footer() {
	return (
	  <div id={FOOTER} className={FOOTER}>
	  	<div>
			Nathan Stephenson | <a href='https://github.com/nathanstephenson'  target='_blank' rel='noreferrer noopener'>{GITHUB_ICON} github</a>
		</div>
		<div>{'\uFF3B'}made with <a href='https://beta.reactjs.org/'  target='_blank' rel='noreferrer noopener'>React{'\uFF3D'}</a></div>
	  </div>
	);
  }
