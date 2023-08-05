import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Favourites from './Favourites';

//Snapshot test
it('renders correctly', () => {
  const tree = renderer.create(<Favourites />).toJSON();
  expect(tree).toMatchSnapshot();
});

//Unit test 
describe('Favourites', () => {
  it('should render the Favourites component', () => {
    const { container } = render(<Favourites />);
    expect(container.firstChild).toMatchSnapshot();
  });
});