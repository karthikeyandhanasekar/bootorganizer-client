import './assets/css/index.css';
import { BrowserRouter } from 'react-router-dom'
import MainComponents from './MainComponents';
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainComponents />
      </div>
    </BrowserRouter>
  );
}

export default App;
