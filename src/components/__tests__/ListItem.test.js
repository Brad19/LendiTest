
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ListItem from '../ListItem';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native');

const data = {
  title: 'Github is hacked',
  url: 'https://githube.com',
  comments_count: 5,
};

describe('News', () => {
  it('validate news item', async () => {
    const {getByText, getByLabelText} = render(
      <ListItem item={data} index={1} />,
    );
    expect(getByLabelText('newsItem')).toBeTruthy();
    expect(getByLabelText('newsTitle')).toBeTruthy();
    expect(getByLabelText('commentsImage')).toBeTruthy();
    expect(getByText('Github is hacked')).toBeTruthy();
    expect(getByText('https://githube.com')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });
});
