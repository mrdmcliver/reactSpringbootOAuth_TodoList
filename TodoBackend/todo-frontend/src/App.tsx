
import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

type AppComponent = (attr:{title: string}) => JSX.Element;

const App: AppComponent = (attr) => {

  const [message, setMessage] = useState<string>('loading...');

  useEffect(() => {

    fetch('/api/auth/test').then(
      res => res.text().then(val => setMessage(val))
    );
  }, []);
  
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>{attr.title}</h1>
          <p>{message}</p>
          <Link to="/todos">View the todo list</Link>
          <Outlet/>
        </header>
      </div>
    </>
  );
}

export default App;
