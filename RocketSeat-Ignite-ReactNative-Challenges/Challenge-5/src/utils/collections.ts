const collections = {
  user: "@gofinances:user",
  transactions: (user: string) => "@gofinances:transactions:user:" + user,
};

export default collections;
