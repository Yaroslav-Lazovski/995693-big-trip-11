const filterNames = [`Everything`, `Future`, `Past`];
const tabNames = [`Table`, `Stats`];

const generateArrs = (arr) => {
  return arr.map((it) => {
    return {
      name: it
    };
  });
};

const generateFilters = () => {
  return generateArrs(filterNames);
};

const generateTabs = () => {
  return generateArrs(tabNames);
};

export {generateFilters, generateTabs};
