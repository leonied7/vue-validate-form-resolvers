import type { Schema, ValidationError } from 'yup';

import type { Resolver, ResolverResult, Errors } from './resolver';

function preparePath (path: string): string {
  return path.replace('[', '.').replace(']', '');
}

const parseErrorSchema = (error: ValidationError): Errors => {
  const errors: Errors = {};
  return Array.isArray(error.inner) && (error.inner.length > 0)
    ? error.inner.reduce((previous, { path, message, type }) => {
      const preparedPath = preparePath(path ?? '');
      if (previous[preparedPath] === undefined) {
        previous[preparedPath] = [];
      }
      previous[preparedPath].push({ message, type });
      return previous;
    }, errors)
    : {
        [preparePath(error.path ?? '')]: [{ message: error.message, type: error.type }]
      };
};

export const yupResolver = (schema: Schema): Resolver => async (values: unknown): Promise<ResolverResult> => {
  try {
    return {
      values: await schema.validate(values, { abortEarly: false }),
      errors: {}
    };
  } catch (e) {
    return {
      values: {},
      errors: parseErrorSchema(e as ValidationError)
    };
  }
};
