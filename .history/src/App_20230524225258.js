
import Flavonoid from "./component/Flavonoid";
import GammaTable from "./component/GammaTable";
import "./App.css"
import Gamma from "./component/Gamma"

function App() {
  return (
    <div className="App">
     {/* <Tables/> */}
     <Flavonoid/>
     <GammaTable/>
     <Gamma/>
    </div>
  );
}

export default App;