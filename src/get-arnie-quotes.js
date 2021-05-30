const { httpGet } = require('./mock-http-interface');

const AFFIRMATIVE = "Arnie Quote";
const NEGATIVE = "FAILURE";

const formatData = (data) => {

  let obj = {};
  const message = JSON.parse(data.body);
  const keys = data.status === 200 ? AFFIRMATIVE : NEGATIVE;

  obj[`${keys}`] = message.message;
  return obj;

}

const getArnieQuotes = async (urls) => {

  let arnies = urls.map((item) => {
    return httpGet(item).then((response) => formatData(response));
  });

  return Promise.all(arnies);

}

module.exports = {
  getArnieQuotes,
};
