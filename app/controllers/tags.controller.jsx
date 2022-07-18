const db = require(`../configure/db.config.jsx`);
const tagModel = db.tagModel;

const sequelize = db.sequelize;
const DataTypes = db.DataTypes;
const QueryTypes = db.QueryTypes;
const Op = db.Op;

/* Create New Tag */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await tagModel.create(
			{
				name: req.body.name,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();

		let response = {
			tags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while creating tags.` });
		});
	}
};

/* Find by Each Attribute/All Tags */
exports.findAll = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const name = req.query.name;
		let finder = name ? { name: { [Op.like]: `%${name}%` } } : null;
		let data = await tagModel.findAndCountAll({
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
		res.status(500).json({ message: `Error occurred while retrieving tags.` });
	}
};

/* Find One Tag by id */
exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagModel.findOne({ where: { id: id } });

		let response = {
			tags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred retrieving tag by id.` });
	}
};

/* Update One Tag by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagModel.update(req.body, { where: { id: id } });

		let response = {
			tags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while Updating tag by id.` });
		});
	}
};

/* Restore One Post by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagModel.restore({ where: { id: id } });

		let response = {
			users: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while restoring tag by id.` });
	}
};

/* Delete One Tag by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await tagModel.destroy({ where: { id: id } });

		let response = {
			tags: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting tag by id.` });
	}
};
