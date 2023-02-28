const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const db = require("../src/model/index");
const Connect = require("connect-pg-simple");
const session = require("express-session");

const DEFAULT_ADMIN = {
  email: process.env.DEFAULT_ADMIN_USERNAME,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const userParent = {
  name: "users",
  icon: "User",
};
const postParent = {
  name: "blogs",
  icon: "blog",
};

AdminJS.registerAdapter(AdminJSSequelize);
const adminJs = new AdminJS({
  databases: [db],
  rootPath: "/admin",
  resources: [
    {
      resource: db.user,
      options: {
        parent: userParent,
        properties: {
          password: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
      },
    },
    { resource: db.category, options: { parent: postParent } },
    { resource: db.tags, options: { parent: postParent } },
    { resource: db.posts, options: { parent: postParent } },
    { resource: db.postTags, options: { parent: postParent } },
    { resource: db.postContent, options: { parent: postParent } },
    { resource: db.comments, options: { parent: postParent } },
  ],
});

module.exports = function (app) {
  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DEV_DATABASE_URL,
      ssl: process.env.NODE_ENV === "production",
    },
    tableName: "session",
    createTableIfMissing: true,
  });

  const router = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: "sessionsecret",
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: "sessionsecret",
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );
  app.use(adminJs.options.rootPath, router);
};
