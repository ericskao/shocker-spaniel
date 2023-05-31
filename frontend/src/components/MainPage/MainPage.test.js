import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './MainPage';

describe('renders Goal Container', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>,
  );

  it('shows text input if no primary goal set', () => {
    const element = screen.getByText('What is your main focus for today?');
    expect(element).toBeInTheDocument();
  });
});
