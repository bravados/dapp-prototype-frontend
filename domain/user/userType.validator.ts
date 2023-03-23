import { registerDecorator, ValidationOptions } from 'class-validator';

function IsValidUserType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidUserType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          const validTypes = ['INDIVIDUAL', 'ARTIST', 'ADMIN'];

          return validTypes.includes(value as string);
        },
      },
    });
  };
}

export { IsValidUserType };
