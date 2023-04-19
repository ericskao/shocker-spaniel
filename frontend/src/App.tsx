import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import GoalsContainer from './components/GoalsContainer';

import './App.scss';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App flex flex-col">
        <div className="bg-green-200">header will be here</div>
        <GoalsContainer />
        <div className="bg-slate-500">footer</div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
