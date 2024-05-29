/**
 * Get data form LS
 * @param {*} key
 */
const getDataLS = (key) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};

/**
 * Save data to Ls
 * @param {*} key
 * @param {*} data
 */
const sendDataLS = (key, incomeData) => {
  const data = localStorage.getItem(key);

  let lsData;
  if (data) {
    lsData = JSON.parse(data);
  } else {
    lsData = [];
  }

  lsData.push(incomeData);

  localStorage.setItem(key, JSON.stringify(incomeData));
};

const getSingledata = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (data) {
    return data.find((item) => item.id == id);
  } else {
    return false;
  }
};

const deleteSingleData = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  const deleteData = data.filter((item) => item.id != id);
  localStorage.setItem(key, JSON.stringify(deleteData));
};
