module.exports = (query) => {
  let Search = {
    name: "",
    regex: "",
  };

  if (query.name) {
    Search.name = query.name;

    const regex = new RegExp(`.*${Search.name}.*`, "i");

    Search.regex = regex;
  }

  return Search;
};
