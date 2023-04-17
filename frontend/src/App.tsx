import GoalsContainer from './components/GoalsContainer';

import './App.scss';

function App() {
  return (
    <div className="App flex flex-col">
      <div className="bg-green-200">header will be here</div>
      <GoalsContainer />
      <div className="bg-slate-500">footer</div>
    </div>
  );
}

export default App;
