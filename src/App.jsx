import './App.css'

function App() {

  const envKey = import.meta.env;

  console.log(envKey.VITE_APPWRITE_URL);
  

  return (
		<>
			<h1>Blog App with React + Vite</h1>
		</>
  );
}

export default App
