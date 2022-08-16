import {render, waitFor} from '@testing-library/react-native';
import News from '../NewsList';
import * as axios from 'axios';

jest.mock('@react-navigation/native');
jest.mock('axios');

const response = {
  data: [
    {
      title: 'git hub',
      url: 'https://github.com',
    },
  ],
};

describe('News', () => {
  it('validate news list page', async () => {
    jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve(response));
    const {getByText, getByLabelText} = render(<News />);
    expect(getByText('News')).toBeTruthy();
    expect(getByLabelText('searchInput')).toBeTruthy();
    await waitFor(() => {
      expect(getByLabelText('newsDataList')).toBeTruthy();
    });
  });
});
