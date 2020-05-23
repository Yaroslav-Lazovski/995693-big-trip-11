const tabNames = [`Table`, `Stats`];

const generateArrs = (arr) => {
  return arr.map((item) => {
    return {
      name: item
    };
  });
};


const generateTabs = () => {
  return generateArrs(tabNames);
};

export {generateTabs};
