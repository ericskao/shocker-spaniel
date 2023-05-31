import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import Clock from './Clock';

describe('renders Clock component', () => {
  render(<Clock />);

  const element = screen.getByRole('heading');
  const timeNow = DateTime.now();

  it('displays the correct time', () => {
    expect(element).toBeInTheDocument();
    expect(element.textContent).toMatch(timeNow.toLocaleString(DateTime.TIME_SIMPLE));
    expect(element.textContent).not.toMatch(
      timeNow.plus({ hours: 1 }).toLocaleString(DateTime.TIME_SIMPLE),
    );
  });
});
