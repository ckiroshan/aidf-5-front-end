import './App.css'
import User from './Iroshan';

function App() {
  return (
    <div className="border-2 border-black m-5 text-center p-3">
      <User name="Bryan" />
      <User name="Micheal" />
      <User name="Iroshan" age="20" />
    </div>
  );
}

export default App;
