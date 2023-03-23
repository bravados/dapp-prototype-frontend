import react from 'react';

import { useKirunalabsContext } from '../KirunalabsContext';

describe('useKirunalabsContext', () => {
  describe('when context provider is not used', () => {
    beforeEach(() => {
      jest.spyOn(react, 'useContext').mockImplementation(() => null);
    });

    it('raises an exception', () => {
      expect(useKirunalabsContext).toThrowError();
    });
  });

  describe('when the context provider is present', () => {
    const value = {};

    beforeEach(() => {
      jest.spyOn(react, 'useContext').mockImplementation(() => value);
    });

    it('returns the context value', () => {
      expect(useKirunalabsContext()).toEqual(value);
    });
  });
});
