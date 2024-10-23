import './App.css'
import config from './config/config';

function App() {

    const {appwriteUrl, appwriteProjectId, appwriteDatabaseId, appwriteCollectionId, appwriteBucketId} = config;

    return (
		<>
			<h1>Blog App with React + Vite {appwriteUrl}</h1>
		</>
	);
}

export default App
