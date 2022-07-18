const db = require(`../configure/db.config.jsx`);
const userModel = db.userModel;
const postModel = db.postModel;

const sequelize = db.sequelize;
const DataTypes = db.DataTypes;
const QueryTypes = db.QueryTypes;
const Op = db.Op;

/* Create New User */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await userModel.create(
			{
				name: req.body.name,
				password: req.body.password,
				email: req.body.email,
				isActive: req.body.isActive,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while creating user.` });
		});
	}
};

/* Find by Each Attribute/All Users */
exports.findAll = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const name = req.query.name;
		const password = req.query.password;
		const email = req.query.email;
		const isActive = req.query.isActive;
		let finder = name ? { name: { [Op.like]: `%${name}%` } } : password ? { password: { [Op.like]: `%${password}%` } } : email ? { email: { [Op.like]: `%${email}%` } } : isActive ? { isActive: { [Op.like]: `%${isActive}%` } } : null;
		let data = await userModel.findAndCountAll({
			as: `users`,
			attributes: [`id`, `name`, `password`, `email`, `isActive`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: postModel,
					as: `posts`,
					attributes: [`id`, `name`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
				},
			],
			transaction: transactions,
			lock: false,
			paranoid: false,
			order: [[`id`, `DESC`]],
			where: finder,
		});
		transactions.commit();

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving all users.` });
	}
};

/* Find One User by id */
exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await userModel.findOne({
			as: `users`,
			attributes: [`id`, `name`, `password`, `email`, `isActive`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: postModel,
					as: `posts`,
					attributes: [`id`, `name`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
				},
			],
			where: { id: id },
		});

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving user by id.` });
	}
};

/* Update One User by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await userModel.update(req.body, { where: { id: id } });

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while Updating user by id.` });
		});
	}
};

/* Restore One User by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await userModel.restore({ where: { id: id } });

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while restoring user by id.` });
	}
};

/* Delete One User by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await userModel.destroy({ where: { id: id } });

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting user by id.` });
	}
};

/* Bulk Create */
// let data = await tagCtrl.bulkCreate([{ name: `Football` }, { name: `Article` }]);

/* Truncate Table */
// let data = await tagCtrl.truncate();

/* Find & Concat All */
// let data = await userCtrl.findAll({
// 	attributes:[`id`,	`title`,	[`description`, `desc`], [`published`, `pub`],
// 		[Sequelize.fn(`CONCAT`, Sequelize.col(`id`), `-aad`), `total`]
// 	],
// 	group: [`title`],
// 	order: [[`title`, `DESC`]],
// 	limit: 2,
// 	offset: 1,
// 	raw: true,
// });

/* Include & Exclude */
// let data = await userCtrl.findAll({
// 	attributes: {
// 		exclude: [`id`, `published`],
// 		include: [
// 			[Sequelize.fn(`CONCAT`, Sequelize.col(`title`), ` Framework`), `FullTitle`]
// 		]
// 	},
// });

/* Condition */
// let data = await userCtrl.findAll({
// 	where: {
// 		id: {
// 			[Op.in]: [2, 4],
// 		},
// 		description: {
// 			[Op.like]: `%Tut#%`,
// 		},
// 	},
// 	attributes: [
// 		[`title`, `Tit`],
// 		[`description`, `Desc`],
// 	],
// });

/* QueryTypes */
// const data = await sequelize.query(`SELECT * FROM users`, {
// type: QueryTypes.SELECT,
// model: userModel,
// mapToModel: true,
// replacements: { published: true }, // published =:published
// replacements: [false], // published = ?
// replacements: { published: [true, false] }, // published IN(:published)
// replacements: { searchDescription: `%Tut#%` }, // description LIKE :searchDescription
// bind: { published: false }, // published = $published
// plain: true,
// transaction: transactions,
// lock: false,
// paranoid: false,
// where: finder,
// });

/* QueryInterface */
// const queryInterface = sequelize.getQueryInterface();
// const queryInterfaceData = async (req, res) => {
// try {
//	/* Query Interface Create Table */
//	// queryInterface.createTable(`sales`, {
//	// 	id: {
//	// 		type: DataTypes.INTEGER(11),
//	// 		primaryKey: true,
//	// 		autoIncrement: true,
//	// 		allowNull: false,
//	// 		unique: true,
//	// 	},
//	// });

// 		/* Query Interface Add Column to Sales Table */
// 		// queryInterface.addColumn(`sales`, `name`, {
// 		// 	type: DataTypes.STRING(50),
// 		// 	allowNull: false,
// 		// 	unique: true,
// 		// });

// 		/* Query Interface Change Column to Sales Table */
// 		// queryInterface.changeColumn(`sales`, `name`, {
// 		// 	type: DataTypes.BOOLEAN,
// 		// 	allowNull: false,
// 		// 	defaultValue: false,
// 		// });

// 		/* Query Interface Remove Column to Sales Table */
// 		// queryInterface.removeColumn(`sales`, `name`);

// 		/* Query Interface Drop Sales Table */
// 		// queryInterface.dropTable(`sales`);
// }

/* check scope */
// let data = await userCtrl.scope([`checkGender`]).findAll({});
// let data = await userCtrl.scope([`checkGender`, `checkEmail`]).findAll({});
// let data = await userCtrl.scope(`includePosts`).findAll({});
// let data = await userCtrl.scope([`includePosts`, `selectUsers`, `checkLimit`]).findAll({});
// let data = await userCtrl.findAll({ include: [{ model: postCtrl, as: `posts` }] });
// let data = await postCtrl.findAll({ include: [{ model: userCtrl, as: `users` }] });
