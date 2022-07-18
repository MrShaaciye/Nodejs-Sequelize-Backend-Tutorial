const db = require(`../configure/db.config.jsx`);
const postTagModel = db.postTagModel;
const postModel = db.postModel;
const tagModel = db.tagModel;

const sequelize = db.sequelize;
const DataTypes = db.DataTypes;
const QueryTypes = db.QueryTypes;
const op = db.Op;

/* Create New PostTag */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await postTagModel.create(
			{
				postId: req.body.postId,
				tagId: req.body.tagId,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();

		let response = {
			postTags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while creating postTag.` });
		});
	}
};

/* Find by Each Attribute/All PostTags */
exports.findAllPosts = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const name = req.query.name;
		const title = req.query.title;
		const content = req.query.content;
		const userId = req.query.userId;
		let finder = name ? { name: { [op.like]: `%${name}%` } } : title ? { title: { [op.like]: `%${title}%` } } : content ? { content: { [op.like]: `%${content}%` } } : userId ? { userId: { [op.like]: `%${userId}%` } } : null;
		let data = await postModel.findAndCountAll({
			attributes: [`id`, `name`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: tagModel,
					attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`],
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
		res.status(500).json({ message: `Error occurred while retrieving postTags.` });
	}
};

/* Find by Each Attribute/All TagPosts */
exports.findAllTags = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const name = req.query.name;
		let finder = name ? { name: { [op.like]: `%${name}%` } } : null;
		let data = await tagModel.findAndCountAll({
			attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: postModel,
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
			tags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving tagPosts.` });
	}
};

/* Find One PostTag by id */
exports.findOnePost = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await postModel.findOne({
			attributes: [`id`, `name`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: tagModel,
					attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`],
				},
			],
			where: { id: id },
		});

		let response = {
			posts: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving postTag by id..` });
	}
};

/* Find One TagPost by id */
exports.findOneTag = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagModel.findOne({
			attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: postModel,
					attributes: [`id`, `name`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
				},
			],
			where: { id: id },
		});

		let response = {
			tags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving tagPost by id.` });
	}
};

/* Update One PostTag by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await postTagModel.update(req.body, { where: { id: id } });

		let response = {
			postTags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while updating postTag by id.` });
		});
	}
};

/* Restore One PostTag by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await postTagModel.restore({ where: { id: id } });

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while restoring postTag by id.` });
	}
};

/* Delete One PostTag by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await postTagModel.destroy({ where: { id: id } });

		let response = {
			postTags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting postTag by id.` });
	}
};
