import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './App/AppHeader';

function App() {
  return (
    <div className="App">
      <BrowserRouter><AppHeader></AppHeader></BrowserRouter>
    </div>
  );
}

export default App;
