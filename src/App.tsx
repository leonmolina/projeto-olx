import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { RouteList } from './RouteList';

function App() {
  return (
    <>
      <Header />
      <RouteList />
      <Footer />
    </>
  );
}

export default App;
