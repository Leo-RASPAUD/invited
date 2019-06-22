const removeEmptyValues = obj => {
  return Object.entries(obj).reduce((a, [key, value]) => {
    if (value !== '') {
      a[key] = value;
    }
    return a;
  }, {});
};

export default {
  removeEmptyValues,
};
