import { App } from './App';
import { render } from '@testing-library/react';

describe('App', () => {
  it('見出しが表示されること', () => {
    const { getByRole } = render(<App />);

    expect(
      getByRole('heading', { name: 'Hello Vite⚡️', level: 1 }),
    ).toBeInTheDocument();
  });

  it('DOM snapshot matches', () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
