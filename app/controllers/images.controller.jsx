const db = require(`../configure/db.config.jsx`);
const imageModel = db.imageModel;
const commentModel = db.commentModel;

const sequelize = db.sequelize;
const QueryTypes = db.QueryTypes;
const DataTypes = db.DataTypes;
const Op = db.Op;

/* Create New Image */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await imageModel.create(
			{
				title: req.body.title,
				url: req.body.url,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();
		let response = {
			images: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while creating image.` });
		});
	}
};

/* Find by Each Attribute/All Employees */
exports.findAll = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const title = req.query.title;
		const url = req.query.url;
		let finder = title ? { title: { [Op.like]: `%${title}%` } } : url ? { url: { [Op.like]: `%${url}%` } } : null;
		let data = await imageModel.findAndCountAll({
			as: `images`,
			attributes: [`id`, `title`, `url`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: commentModel,
					as: `comments`,
					attributes: [`id`, `title`, `commentId`, `commentType`, `createdAt`, `updatedAt`, `deletedAt`],
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
			images: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving images.` });
	}
};

/* Find One Image by id */
exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await imageModel.findOne({
			as: `images`,
			attributes: [`id`, `title`, `url`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: commentModel,
					as: `comments`,
					attributes: [`id`, `title`, `commentId`, `commentType`, `createdAt`, `updatedAt`, `deletedAt`],
				},
			],
			where: { id: id },
		});

		let response = {
			images: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving image by id.` });
	}
};

/* Update One Image by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await imageModel.update(req.body, { where: { id: id } });

		let response = {
			images: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while updating image by id.` });
		});
	}
};

/* Restore One Image by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await imageModel.restore({ where: { id: id } });

		let response = {
			images: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while restoring image by id.` });
	}
};

/* Delete One Image by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await imageModel.destroy({ where: { id: id } });

		let response = {
			images: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting image by id.` });
	}
};
