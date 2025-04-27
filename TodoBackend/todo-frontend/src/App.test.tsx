import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App test', () => {

  let originalFetch: any;

  beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn(() => Promise.resolve({

          text: () => Promise.resolve({
              value: "Testing something!"
          })
      })) as jest.Mock;
  });

  afterEach(() => {
      global.fetch = originalFetch;
  });

  test('renders learn react link', async () => {

    act(() => render(

      <BrowserRouter>
        <App title='ok'/>
      </BrowserRouter>
    ));
    
    const titleElement = screen.getByText(/ok/i);
    expect(titleElement).toBeInTheDocument();

    const messElement = await waitFor(() => screen.getByText(/loading.../i));
    expect(messElement).toBeInTheDocument();
  });
});