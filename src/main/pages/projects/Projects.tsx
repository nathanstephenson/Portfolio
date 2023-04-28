import ContentBox from 'main/components/contentBox/ContentBox'
import { useLayoutEffect, useState } from 'react';
import initiald from 'images/initiald.jpg'
import portfolioImage from 'images/projects/portfolio.png'

import './Projects.css'

const DND20 = 'dnd20'
const ASPIRE_GAME = 'aspire-game'
const C130 = 'c130'
const PORTFOLIO = 'portfolio'

export default function Home() {
	const [repositories, setRepositories] = useState([<></>])

	useLayoutEffect(() => {
		getRepositories('nathanstephenson')
		.then((repositories) => sortRepositories(repositories))
		.then(repos => {
			setRepositories(repos.map(repo => {
				const repoName: string = getRepoName(repo.name)
				const repoDescription: string = getRepoDescription(repo)
				const repoImage: string = getRepoImage(repo.name)
				return (
					<ContentBox text={repoName} className='project' linkTarget={repo.html_url} img={repoImage} imgAlt={repo.name} outline={true}>
						<p>{repoDescription}</p>
					</ContentBox>
				)
			}))
		})
	}, [])

	return (
		<div className="ProjectsContainer">
			{repositories}
		</div>
	)
}

interface Repository {
	name: string;
	pushed_at: string;
	description: string;
	html_url: string;
}

//fetch repositories from GitHub API
async function getRepositories(username: string): Promise<Repository[]> {
	try {
	const response = await fetch(`https://api.github.com/users/${username}/repos`);
	if (!response.ok) {
		throw new Error(`Failed to fetch repositories for user ${username}: ${response.statusText}`);
	}
	return response.json();
	} catch (error) {
		if(error instanceof Error){
			throw new Error(`Failed to fetch repositories for user ${username}: ${error.message}`);
		}
		throw error
	}
}

//sort repositories by date in descending order
function sortRepositories(repositories: Repository[]): Repository[] {
	console.log(repositories)
	return repositories.sort((a, b) => {
		const dateA = new Date(a.pushed_at);
		const dateB = new Date(b.pushed_at);
		return dateB.getTime() - dateA.getTime();
	});
}

function getRepoName(name: string): string {
	let displayName = name
	switch (name.toLowerCase()) {
		case DND20:
			displayName = `Tabletop Game Simulator`
			break
		case ASPIRE_GAME:
			displayName = `Graphics Engine`
			break
		case C130:
			displayName = `Wiley Edge Demo Repo`
			break
	}
	if(displayName !== name){
		displayName += ` (${name})`
	}
	return displayName
}

function getRepoDescription(repo: Repository): string {
	const name = repo.name
	switch (name.toLowerCase()) {
		case DND20:
			return `Final Year Project: This was a proof of concept of how I would build a web-client for a tabletop game, inspired by the rules of the popular game "Dungeons and Dragons". The front-end is built in React and the backend is on a Node Express server, with Apollo-GraphQL as middleware.`
		case ASPIRE_GAME:
			return `This is an exploration into developing in C++ with OpenGL. The aim is to create a graphical display that can later be used to develop platformer games.`
		case C130:
			return `A demo project created as part of Wiley Edge training. This was a simple Java project containing a couple of exercises which were deliverables for the course.`
		case PORTFOLIO:
			return `You're looking at it: this website is meant to demonstrate my ability to develop using React and TypeScript, and will also function as a hub for any projects I work on that have output APIs.`
		default:
			return repo.description
	}
}

function getRepoImage(name: string): string {
	switch (name.toLowerCase()) {
		case PORTFOLIO:
			return portfolioImage
		default:
			return initiald
	}
}
