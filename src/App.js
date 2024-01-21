import './App.css';
import Home from './pages/Home/Home';
import { GeneralSettings } from './GeneralSettings';

function App() {
  return (
    <GeneralSettings>
      <div className="App">
        <Home />
      </div>
    </GeneralSettings>
  );
}

export default App;
