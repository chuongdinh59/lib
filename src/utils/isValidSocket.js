const isValidSocket = (userOnline, userID) => {
  return userOnline.find((i) => i.userID === userID);
};

module.exports = isValidSocket;
