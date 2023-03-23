import react from 'react';

import { useNearContext } from '../NearContext';

describe('useNearContext', () => {
  describe('when context provider is not used', () => {
    beforeEach(() => {
      jest.spyOn(react, 'useContext').mockImplementation(() => null);
    });

    it('raises an exception', () => {
      expect(useNearContext).toThrowError();
    });
  });

  describe('when the context provider is present', () => {
    const value = {};

    beforeEach(() => {
      jest.spyOn(react, 'useContext').mockImplementation(() => value);
    });

    it('returns the context value', () => {
      expect(useNearContext()).toEqual(value);
    });
  });
});
