import ContentBox from 'main/components/contentBox/ContentBox'
import { useLayoutEffect, useState } from 'react';
import initiald from 'images/initiald.jpg'

export default function Home() {
	const [repositories, setRepositories] = useState([<></>])

	useLayoutEffect(() => {
		getRepositories('nathanstephenson')
		.then((repositories) => sortRepositories(repositories))
		.then(repos => {
			setRepositories(repos.map(repo => {
				return (
					<ContentBox text={repo.name} linkTarget={repo.html_url} img={initiald} imgAlt='Initial D' outline={true}>
						<p>This will be the description</p>
					</ContentBox>
				)
			}))
		})
	}, [])

	return (
		<>
			{repositories}
		</>
	)
}
// Define a TypeScript interface for a repository object
interface Repository {
	name: string;
	updated_at: string;
	description: string;
	html_url: string;
  }
  
  // Function to fetch repositories from GitHub API
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
  
  // Function to sort repositories by updated_at date in descending order
  function sortRepositories(repositories: Repository[]): Repository[] {
	return repositories.sort((a, b) => {
	  const dateA = new Date(a.updated_at);
	  const dateB = new Date(b.updated_at);
	  return dateB.getTime() - dateA.getTime();
	});
  }
  
  // Function to format repository data with title, last updated, and brief summary
  function formatRepository(repository: Repository): string {
	const title = repository.name;
	const lastUpdated = new Date(repository.updated_at).toLocaleDateString();
	const summary = repository.description || 'No description available';
	return `Title: ${title}\nLast Updated: ${lastUpdated}\nSummary: ${summary}`;
  }
