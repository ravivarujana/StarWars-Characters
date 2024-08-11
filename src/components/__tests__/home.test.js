import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../Home';
import { fetchAllPeople } from '../../store/slices/characterDataSlice';

// Mock the required modules
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../store/slices/characterDataSlice', () => ({
  fetchAllPeople: jest.fn(),
}));

const mockStore = configureStore([thunk]);

describe('Home Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      characterData: {
        data: [
          { name: 'Luke Skywalker' },
          { name: 'Darth Vader' },
          { name: 'Leia Organa' },
        ],
        isLoading: false,
      },
      pagination: {
        pageNumber: 1,
      },
    });

    // Mock useDispatch
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(jest.fn());
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText('Star War Heroes')).toBeInTheDocument();
  });

  it('dispatches fetchAllPeople on mount', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(fetchAllPeople).toHaveBeenCalled();
  });

  it('renders character cards when data is loaded', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('renders shimmer effect when loading', () => {
    store = mockStore({
      characterData: {
        data: [],
        isLoading: true,
      },
      pagination: {
        pageNumber: 1,
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getAllByTestId('shimmer')).toHaveLength(10);
  });

  it('filters characters based on search', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search Character');
    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.queryByText('Darth Vader')).not.toBeInTheDocument();
    });
  });

  it('clears search filter', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search Character');
    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Luke')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('×'));

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
      expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    });
  });

  it('shows "No Result Found" when search yields no results', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search Character');
    fireEvent.change(searchInput, { target: { value: 'NonexistentCharacter' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('No Result Found !!')).toBeInTheDocument();
    });
  });
});
