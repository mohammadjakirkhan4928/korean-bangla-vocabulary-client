import logo from './logo.svg';
import './App.css';
import { routes } from './routes/Router';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
 

function App() {
  return (
    <div className="App">
       <RouterProvider router={routes}></RouterProvider>
       <Toaster></Toaster>
    </div>
  );
}

export default App;
