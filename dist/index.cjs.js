'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function preparePath(path) {
  return path.replace('[', '.').replace(']', '');
}

const parseErrorSchema = (error) =>
  Array.isArray(error.inner) && error.inner.length
    ? error.inner.reduce((previous, { path, message, type }) => {
        const preparedPath = preparePath(path);
        if (!previous[preparedPath]) {
          previous[preparedPath] = [];
        }
        previous[preparedPath].push({ message, type });
        return previous;
      }, {})
    : {
        [preparePath(error.path)]: [{ message: error.message, type: error.type }]
      };

const yupResolver = (schema) => async (values) => {
  try {
    return {
      values: await schema.validate(values, { abortEarly: false }),
      errors: {}
    };
  } catch (e) {
    return {
      values: {},
      errors: parseErrorSchema(e)
    };
  }
};

exports.yupResolver = yupResolver;
