const db = require(`../configure/db.config.jsx`);
const videoModel = db.videoModel;
const commentModel = db.commentModel;

const sequelize = db.sequelize;
const QueryTypes = db.QueryTypes;
const DataTypes = db.DataTypes;
const Op = db.Op;

/* Create New Video */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await videoModel.create(
			{
				title: req.body.title,
				text: req.body.text,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();

		let response = {
			videos: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while creating video.` });
		});
	}
};

/* Find by Each Attribute/All Videos */
exports.findAll = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const title = req.query.title;
		const text = req.query.text;
		let finder = title ? { title: { [Op.like]: `%${title}%` } } : text ? { text: { [Op.like]: `%${text}%` } } : null;
		let data = await videoModel.findAndCountAll({
			as: `videos`,
			attributes: [`id`, `title`, `text`, `createdAt`, `updatedAt`, `deletedAt`],
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
			videos: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving videos.` });
	}
};

/* Find One Video by id */
exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await videoModel.findOne({
			as: `videos`,
			attributes: [`id`, `title`, `text`, `createdAt`, `updatedAt`, `deletedAt`],
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
			videos: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving video by id.` });
	}
};

/* Update One Video by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await videoModel.update(req.body, { where: { id: id } });

		let response = {
			videos: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while updating video by id.` });
		});
	}
};

/* Restore One Video by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await videoModel.restore({ where: { id: id } });

		let response = {
			videos: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while restoring video by id.` });
	}
};

/* Delete One Video by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await videoModel.destroy({ where: { id: id } });

		let response = {
			videos: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting video by id.` });
	}
};
