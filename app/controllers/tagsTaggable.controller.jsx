const db = require(`../configure/db.config.jsx`);
const tagTaggableModel = db.tagTaggableModel;
const tagModel = db.tagModel;
const videoModel = db.videoModel;
const imageModel = db.imageModel;

const sequelize = db.sequelize;
const DataTypes = db.DataTypes;
const QueryTypes = db.QueryTypes;
const op = db.Op;

/* Create New TagTaggable */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await tagTaggableModel.create(
			{
				tagId: req.body.tagId,
				taggableId: req.body.taggableId,
				taggableType: req.body.taggableType,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();
		let response = {
			tagTaggables: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while creating tagTaggable.` });
		});
	}
};

/* Find by Each Attribute/All TagTaggables */
exports.findAll = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const name = req.query.name;
		let finder = name ? { name: { [op.like]: `%${name}%` } } : null;
		let data = await tagModel.findAndCountAll({
			include: [imageModel, videoModel],
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
		res.status(500).json({ message: `Error occurred while retrieving tagTaggables.` });
	}
};

/* Find One TagTaggable by id */
exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagModel.findOne({
			include: [imageModel, videoModel],
			where: { id: id },
		});

		let response = {
			tags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving tagTaggable by id.` });
	}
};

/* Update One TagTaggable by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagTaggableModel.update(req.body, { where: { id: id } });

		let response = {
			taggable: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while updating tagTaggable by id.` });
		});
	}
};

/* Delete One TagTaggable by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagTaggableModel.restore({ where: { id: id } });

		let response = {
			taggable: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting tagTaggable by id.` });
	}
};

/* Delete One TagTaggable by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagTaggableModel.destroy({ where: { id: id } });

		let response = {
			taggable: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting tagTaggable by id.` });
	}
};
