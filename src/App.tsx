import './App.css';
import "ol/ol.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "react-splitter-layout/lib/index.css";
import { AppDefEditor } from './components/app-def-editor';

function App() {
  return (
    <div className="App bp3-dark">
      <AppDefEditor />
    </div>
  );
}

export default App;
