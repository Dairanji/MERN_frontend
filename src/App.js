
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
