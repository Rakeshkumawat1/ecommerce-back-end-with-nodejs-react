import './App.css';
import Header from './components/Header';
import MenuHeader from './components/MenuHeader';
import HomePage from './container/HomePage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProductListPage from './container/ProductListPage';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    {/* <Header/>
    <MenuHeader/> */}
    </div>
  );
}

export default App;
