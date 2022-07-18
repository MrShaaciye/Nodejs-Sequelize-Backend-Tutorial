const { Sequelize, DataTypes, QueryTypes, Op } = require(`sequelize`);

const sequelize = new Sequelize(`shaiyedbms`, `root`, ``, {
	host: `localhost`,
	dialect: `mysql`,
	logging: true,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log(`Connection has been established successfully...`);
	})
	.catch((err) => {
		console.error(`Unable to connect to the database: ${err}`);
	});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.QueryTypes = QueryTypes;
db.Op = Op;

// alter: false
db.sequelize
	.sync({ force: false, alter: false, match: /shaiyedbms$/ })
	.then(() => {
		console.log(`Tables were Synced successfully!`);
	})
	.catch((err) => {
		console.log(`Tables weren't Synced successfully!`);
	});

db.userModel = require(`../models/users.model.jsx`)(sequelize, DataTypes);
db.postModel = require(`../models/posts.model.jsx`)(sequelize, DataTypes);
db.tagModel = require(`../models/tags.model.jsx`)(sequelize, DataTypes);
db.postTagModel = require(`../models/postTags.model.jsx`)(sequelize, DataTypes);
db.videoModel = require(`../models/videos.model.jsx`)(sequelize, DataTypes);
db.imageModel = require(`../models/images.model.jsx`)(sequelize, DataTypes);
db.commentModel = require(`../models/comments.model.jsx`)(sequelize, DataTypes);
db.employeeModel = require(`../models/employees.model.jsx`)(sequelize, DataTypes);
db.tagTaggableModel = require(`../models/tagsTaggable.model.jsx`)(sequelize, DataTypes);

/* Scope */
db.userModel.addScope(`checkGender`, { where: { gender: `Male` } });
db.userModel.addScope(`checkEmail`, { where: { email: { [Op.like]: `%@gmail.com%` } } });
db.userModel.addScope(`includePost`, { include: [{ model: db.posts, as: `posts`, attributes: [`title`, `content`] }] });
db.userModel.addScope(`selectUser`, { attributes: [`name`, `email`] });
db.userModel.addScope(`checkLimit`, { limit: 2, offset: 6 });

/* One to One */
// db.userModel.hasOne(db.postModel, { as: `posts`, foreignKey: `userId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });

/* One to Many */
// db.userModel.scope(`checkGender`),
db.userModel.hasMany(db.postModel, { as: `posts`, foreignKey: `userId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.postModel.belongsTo(db.userModel, { as: `users`, foreignKey: `userId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.userModel.hasMany(db.employeeModel, { as: `employees`, foreignKey: `userId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.employeeModel.belongsTo(db.userModel, { as: `users`, foreignKey: `userId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });

/* Many to Many */
db.postModel.belongsToMany(db.tagModel, { through: `posttags`, foreignKey: `postId` });
db.tagModel.belongsToMany(db.postModel, { through: `posttags`, foreignKey: `tagId` });

/* Polymorphic One to Many */
db.imageModel.hasMany(db.commentModel, { as: `comments`, foreignKey: `commentId`, constraints: false, scope: { commentType: `image` } });
db.videoModel.hasMany(db.commentModel, { as: `comments`, foreignKey: `commentId`, constraints: false, scope: { commentType: `video` } });
db.commentModel.belongsTo(db.imageModel, { foreignKey: `commentId`, constraints: false });
db.commentModel.belongsTo(db.videoModel, { foreignKey: `commentId`, constraints: false });

/* Polymorphic Many to Many */
db.imageModel.belongsToMany(db.tagModel, { through: { model: db.tagTaggableModel, unique: false, scope: { taggableType: `image` } }, foreignKey: `taggableId`, constraints: false });
db.tagModel.belongsToMany(db.imageModel, { through: { model: db.tagTaggableModel, unique: false, scope: { taggableType: `image` } }, foreignKey: `tagId`, constraints: false });
db.videoModel.belongsToMany(db.tagModel, { through: { model: db.tagTaggableModel, unique: false, scope: { taggableType: `video` } }, foreignKey: `taggableId`, constraints: false });
db.tagModel.belongsToMany(db.videoModel, { through: { model: db.tagTaggableModel, unique: false, scope: { taggableType: `video` } }, foreignKey: `tagId`, constraints: false });

module.exports = db;
