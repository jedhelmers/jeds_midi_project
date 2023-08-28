import MidiGrid from './components/MidiGrid';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ width: 50 }} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <MidiGrid />

      </header>
    </div>
  );
}

export default App;
