const parseErrorSchema = (error) =>
  Array.isArray(error.inner) && error.inner.length
    ? error.inner.reduce((previous, { path, message }) => {
      previous[path] = message;
      return previous;
    }, {})
    : {
      [error.path]: error.message
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
