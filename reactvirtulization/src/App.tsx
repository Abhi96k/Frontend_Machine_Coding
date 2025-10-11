import "./App.css";

import FixedVirtualList from "./Componets/FixedVirtualList";

function App() {
  return (
    <div id="app">
      <FixedVirtualList
        className="rv-list"
        height={400}
        itemHeight={30}
        total={10000}
        renderItem={(index) => <div>Item {index}</div>}
      />
    </div>
  ); 
}

export default App;
