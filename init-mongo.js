db = db.getSiblingDB('app');

db.createUser({
  user: "user",
  pwd: "password",
  roles: [
    { role: "readWrite", db: "app" }
  ]
});

print("User 'user' criado com sucesso no banco 'app'");
