import { transformAndValidateSync } from 'class-transformer-validator';
import { Wallet } from '../wallet';
import { nearWallet } from '../__mocks__/wallet';

describe('when instance is valid', () => {
  it('correctly deserializes all the attributes', () => {
    const instance = transformAndValidateSync(Wallet, nearWallet);

    expect(instance.id).toEqual(nearWallet.id);
    expect(instance.blockchain).toEqual(nearWallet.blockchain);
    expect(instance.address).toEqual(nearWallet.address);
    expect(instance.userId).toEqual(nearWallet.userId);
  });
});

describe('when instance is not valid', () => {
  describe('when blockchain is not recognized', () => {
    it.each([
      { blockchain: undefined },
      { blockchain: '' },
      { blockchain: 'APTOS' },
    ])('throws an error for %s', async (invalidData) => {
      await expect(async () =>
        Wallet.fromData({
          ...nearWallet,
          ...invalidData,
        }),
      ).rejects.toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({ property: 'blockchain' }),
        ]),
      );
    });
  });

  describe('when address is not specified', () => {
    it.each([{ address: undefined }, { address: '' }])(
      'throws an error for %s',
      async (invalidData) => {
        await expect(async () =>
          Wallet.fromData({
            ...nearWallet,
            ...invalidData,
          }),
        ).rejects.toMatchObject(
          expect.arrayContaining([
            expect.objectContaining({ property: 'address' }),
          ]),
        );
      },
    );
  });
});
