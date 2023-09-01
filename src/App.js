// import logo from './logo.svg';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer'
import { Header_main } from './header/header_main';
import Instructions from './instructions';


function App() {
  const test = "RAM"
  return (
    <div className="App">
      <>

      <Header_main></Header_main>
      <Instructions/>
      <PathfindingVisualizer></PathfindingVisualizer>
      </>
    </div>
  );
}

export default App;

//https://github.com/Ace7568/Visualizer.git
