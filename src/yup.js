const parseErrorSchema = (error) =>
  Array.isArray(error.inner) && error.inner.length
    ? error.inner.reduce((previous, { path, message, type }) => {
        previous[path] = { message, type };
        return previous;
      }, {})
    : {
        [error.path]: { message: error.message, type: error.type }
      };

export const yupResolver = (schema) => async (values) => {
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
