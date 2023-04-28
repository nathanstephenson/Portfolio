import 'App.css'
import './Footer.css'
import { GITHUB_ICON } from 'images/svg'

const FOOTER = "Footer"
const FOOTER_ROW = "FooterRow"

export default function Footer() {
	return (
	  <div id={FOOTER} className={FOOTER}>
	  	<div className={FOOTER_ROW}>
			by Nathan Stephenson
		</div>
	  	<div className={FOOTER_ROW}>
		  	<div>{'\uFF3B'}<a href='https://github.com/nathanstephenson/Portfolio'  target='_blank' rel='noreferrer noopener'>{GITHUB_ICON} project repo</a>{'\uFF3D'}</div>
			<div>{'\uFF3B'}made with <a href='https://beta.reactjs.org/'  target='_blank' rel='noreferrer noopener'>React</a>{'\uFF3D'}</div>
		</div>
	  </div>
	);
  }
