import { registerDecorator, ValidationOptions } from 'class-validator';

function IsValidBlockchain(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidBlockchain',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          const validTypes = ['near'];

          return validTypes.includes(value as string);
        },
      },
    });
  };
}

export { IsValidBlockchain };
