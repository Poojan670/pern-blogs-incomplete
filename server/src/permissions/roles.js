const ROLES = {
  ADMIN: "ADMIN",
  MOD: "MOD",
  USER: "USER",
};

// User Permissions
exports.listUsersPermission = [ROLES.ADMIN, ROLES.MOD];
exports.deleteUserPermission = [ROLES.ADMIN];

// Category Permission
exports.postCategoryPermission = [ROLES.ADMIN];
exports.listCategoryPermission = [ROLES.ADMIN, ROLES.MOD];
exports.updateCategoryPermission = [ROLES.ADMIN, ROLES.MOD];
exports.deleteCategoryPermission = [ROLES.ADMIN];

// TagsPermission
exports.postTagsPermission = [ROLES.ADMIN];
exports.updateTagsPermission = [ROLES.ADMIN, ROLES.MOD];
exports.deleteTagsPermission = [ROLES.ADMIN];

// Category Permission
exports.postPermission = [ROLES.ADMIN, ROLES.MOD, ROLES.USER];

// Comments Permission
exports.addCommentPermission = [ROLES.ADMIN, ROLES.MOD, ROLES.USER];
