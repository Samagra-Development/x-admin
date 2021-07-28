const buildGupshup = (template, variables) => {
  let index = 0;
  return template.replace(/{#var#}/gi, () => {
    return String(variables[index++]);
  });
};

export default buildGupshup;
