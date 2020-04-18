const filterNames = [`Everything`, `Future`, `Past`];
const tabNames = [`Table`, `Stats`];

const generateArrs = (arr) => {
  return arr.map((item) => {
    return {
      name: item
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
