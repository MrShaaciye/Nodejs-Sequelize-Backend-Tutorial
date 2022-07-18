const db = require(`../configure/db.config.jsx`);
const commentModel = db.commentModel;
const videoModel = db.videoModel;
const imageModel = db.imageModel;

const sequelize = db.sequelize;
const QueryTypes = db.QueryTypes;
const DataTypes = db.DataTypes;
const Op = db.Op;

/* Create New Comment */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await commentModel.create(
			{
				title: req.body.title,
				commentId: req.body.commentId,
				commentType: req.body.commentType,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();

		let response = {
			comments: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while creating comment.` });
		});
	}
};

/* Find by Each Attribute/All Comments */
exports.findAll = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const title = req.query.title;
		const commentId = req.query.commentId;
		const commentType = req.query.commentType;
		let finder = title ? { title: { [Op.like]: `%${title}%` } } : commentId ? { commentId: { [Op.like]: `%${commentId}%` } } : commentType ? { commentType: { [Op.like]: `%${commentType}%` } } : null;
		let data = await commentModel.findAndCountAll({
			include: [imageModel, videoModel],
			transaction: transactions,
			lock: false,
			paranoid: false,
			order: [[`id`, `DESC`]],
			where: finder,
		});
		transactions.commit();

		let response = {
			comments: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving comments.` });
	}
};

/* Find One Comment by id */
exports.findOne = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const id = req.params.id;
		let data = await commentModel.findOne({
			include: [imageModel, videoModel],
			where: { id: id },
		});

		let response = {
			comments: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving comment by id.` });
	}
};

/* Update One Comment by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await commentModel.update(req.body, { where: { id: id } });

		let response = {
			comments: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while updating comment by id.` });
		});
	}
};

/* Restore One Comment by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await commentModel.restore({ where: { id: id } });

		let response = {
			comments: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while restoring comment by id.` });
	}
};

/* Delete One Comment by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await commentModel.destroy({ where: { id: id } });

		let response = {
			comments: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting comment by id.` });
	}
};
