import logo from './logo.svg';
import './App.css';
import { routes } from './routes/Router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
