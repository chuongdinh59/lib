const SUCCESS = 200;
const ERROR = 500;
module.exports = handleStatus = (status = 1, res, data) => {
  status = status ? SUCCESS : ERROR;
  return res.status(status).json(data);
};
