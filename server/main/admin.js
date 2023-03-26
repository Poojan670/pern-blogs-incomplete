const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const {
  db,
  User,
  Tags,
  Category,
  Comments,
  Likes,
  PostContent,
  PostTags,
  Posts,
  Ratings,
} = require("../src/model/index");
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
      resource: User,
      options: {
        parent: userParent,
        properties: {
          password: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
      },
    },
    { resource: Category, options: { parent: postParent } },
    { resource: Tags, options: { parent: postParent } },
    { resource: Posts, options: { parent: postParent } },
    { resource: PostTags, options: { parent: postParent } },
    { resource: PostContent, options: { parent: postParent } },
    { resource: Comments, options: { parent: postParent } },
    { resource: Ratings, options: { parent: postParent } },
    { resource: Likes, options: { parent: postParent } },
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
