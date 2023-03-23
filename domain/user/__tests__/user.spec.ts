import { alice } from '@domain/user/__mocks__/user';
import { User } from '../..';

describe('when the instance is valid', () => {
  it('correctly deserializes all the attributes', () => {
    const instance = User.fromData(alice);

    expect(instance.id).toEqual(alice.id);
    expect(instance.name).toEqual(alice.name);
    expect(instance.email).toEqual(alice.email);
    expect(instance.avatar).toEqual(alice.avatar);
    expect(instance.type).toEqual(alice.type);
    expect(instance.wallets[0].id).toEqual(alice.wallets[0].id);
    expect(instance.wallets[0].blockchain).toEqual(alice.wallets[0].blockchain);
    expect(instance.wallets[0].address).toEqual(alice.wallets[0].address);
    expect(instance.wallets[0].userId).toEqual(alice.wallets[0].userId);
  });
});

describe('when the instance is not valid', () => {
  describe('when the mandatory properties are missing', () => {
    it.each([
      [{ id: undefined }, 'id'],
      [{ name: undefined }, 'name'],
      [{ type: undefined }, 'type'],
      [{ wallets: undefined }, 'wallets'],
    ])(
      'throws a validation error for %s',
      async (invalidData, property: string) => {
        await expect(async () =>
          User.fromData({ ...alice, ...invalidData }),
        ).rejects.toMatchObject(
          expect.arrayContaining([expect.objectContaining({ property })]),
        );
      },
    );
  });
  describe('when user type is not recognized', () => {
    it('throws a validation error', async () => {
      await expect(async () =>
        User.fromData({ ...alice, type: 'SALESMAN' }),
      ).rejects.toMatchObject(
        expect.arrayContaining([expect.objectContaining({ property: 'type' })]),
      );
    });
  });
});

describe(`with null values that can be null`, () => {
  it.each([
    [{ email: null }, 'email'],
    [{ avatar: null }, 'avatar'],
  ])(
    'does not throw a validation error for %s',
    async (validData, property: string) => {
      const instance = User.fromData({
        ...alice,
        ...validData,
      });
      // @ts-ignore
      expect(instance[property]).toBeNull();
    },
  );
});
