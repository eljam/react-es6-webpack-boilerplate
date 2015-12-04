import { expect } from 'chai';
import { render } from 'reagent';
import React from 'react';
import Hello from '../hello';

describe('<Hello />', () => {

  it('should render the name in params: eljam', () => {
    const params = { name: 'eljam' };
    const wrapper = render(<Hello params={params} />);
    expect(wrapper.text()).to.contain('eljam');
  });
});
