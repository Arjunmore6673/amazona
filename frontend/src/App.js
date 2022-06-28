import data from './data';
import { BrowserRouter, Link, Route, Routes, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  console.log(data, 'data');
  return (
    <BrowserRouter>
      <div>
        <header className="App-header">
          <Link to="/">Amazona</Link>
        </header>
        <main className="container">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
