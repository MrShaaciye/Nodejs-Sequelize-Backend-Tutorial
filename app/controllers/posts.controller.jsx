const db = require(`../configure/db.config.jsx`);
const postModel = db.postModel;
const userModel = db.userModel;

const sequelize = db.sequelize;
const DataTypes = db.DataTypes;
const QueryTypes = db.QueryTypes;
const Op = db.Op;

/* Create New Post */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await postModel.create(
			{
				name: req.body.name,
				title: req.body.title,
				content: req.body.content,
				userId: req.body.userId,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();

		let response = {
			posts: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while creating post.` });
		});
	}
};

/* Find by Each Attribute/All Posts */
exports.findAll = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const name = req.query.name;
		const title = req.query.title;
		const content = req.query.content;
		const userId = req.query.userId;
		let finder = name ? { name: { [Op.like]: `%${name}%` } } : title ? { title: { [Op.like]: `%${title}%` } } : content ? { content: { [Op.like]: `%${content}%` } } : userId ? { userId: { [Op.like]: `%${userId}%` } } : null;
		let data = await postModel.findAndCountAll({
			as: `posts`,
			attributes: [`id`, `name`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: userModel,
					as: `users`,
					attributes: [`id`, `name`, `password`, `email`, `isActive`, `createdAt`, `updatedAt`, `deletedAt`],
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
			posts: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving posts.` });
	}
};

/* Find One Post by id */
exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await postModel.findOne({
			as: `posts`,
			attributes: [`id`, `name`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: userModel,
					as: `users`,
					attributes: [`id`, `name`, `password`, `email`, `isActive`, `createdAt`, `updatedAt`, `deletedAt`],
				},
			],
			where: { id: id },
			paranoid: false,
		});

		let response = {
			posts: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving post by id.` });
	}
};

/* Update One Post by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await postModel.update(req.body, { where: { id: id } });

		let response = {
			posts: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while Updating post by id.` });
		});
	}
};

/* Restore One Post by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await postModel.restore({ where: { id: id } });

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while restoring post by id.` });
	}
};

/* Delete One Post by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await postModel.destroy({ where: { id: id } });

		let response = {
			posts: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting post by id.` });
	}
};
