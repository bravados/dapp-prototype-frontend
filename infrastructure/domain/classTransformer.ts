// wrapper of https://github.com/typestack/class-transformer
import {
  Type,
  Expose,
  Exclude,
  plainToInstance as _plainToInstance,
  instanceToPlain,
  ClassConstructor,
} from 'class-transformer';

const plainToInstance = <T, V>(Class: ClassConstructor<T>, plainData: V) =>
  _plainToInstance(Class, plainData, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });

export {
  plainToInstance,
  instanceToPlain,
  Type, // https://github.com/typestack/class-transformer#working-with-nested-objects
  Expose, // https://github.com/typestack/class-transformer#exposing-getters-and-method-return-values
  Exclude, // https://github.com/typestack/class-transformer#skipping-depend-of-operation
};
