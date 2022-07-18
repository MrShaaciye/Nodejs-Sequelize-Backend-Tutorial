const db = require(`../configure/db.config.jsx`);
const employeeModel = db.employeeModel;
const userModel = db.userModel;

const sequelize = db.sequelize;
const QueryTypes = db.QueryTypes;
const DataTypes = db.DataTypes;
const Op = db.Op;

/* Create New Employee */
exports.create = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		let data = await employeeModel.create(
			{
				name: req.body.name,
				job: req.body.job,
				salary: req.body.salary,
				userId: req.body.userId,
			},
			{
				transaction: transactions,
			}
		);
		transactions.commit();

		let response = {
			employees: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error Occurred while creating employee.` });
		});
	}
};

/* Find by Each Attribute/All Employees */
exports.findAll = async (req, res) => {
	const transactions = await sequelize.transaction();
	try {
		const name = req.query.name;
		const job = req.query.job;
		const salary = req.query.salary;
		const userId = req.query.userId;
		let finder = name ? { name: { [Op.like]: `%${name}%` } } : job ? { job: { [Op.like]: `%${job}%` } } : salary ? { salary: { [Op.like]: `%${salary}%` } } : userId ? { userId: { [Op.like]: `%${userId}%` } } : null;
		let data = await employeeModel.findAndCountAll({
			as: `employees`,
			attributes: [`id`, `name`, `job`, `salary`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: userModel,
					as: `users`,
					attributes: [`id`, `name`, `password`, `email`, `createdAt`, `updatedAt`, `deletedAt`],
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
			employees: data,
		};
		res.status(200).json(response);
	} catch (err) {
		transactions.rollback();
		console.log(err);
		res.status(500).json({ message: `Some error occurred while retrieving employees.` });
	}
};

/* Find One Employee by id */
exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await employeeModel.findOne({
			as: `employees`,
			attributes: [`id`, `name`, `job`, `salary`, `userId`, `createdAt`, `updatedAt`, `deletedAt`],
			include: [
				{
					model: userModel,
					as: `users`,
					attributes: [`id`, `name`, `password`, `email`, `createdAt`, `updatedAt`, `deletedAt`],
				},
			],
			where: { id: id },
		});

		let response = {
			employees: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while retrieving employee by id.` });
	}
};

/* Update One Employee by id */
exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await employeeModel.update(req.body, { where: { id: id } });

		let response = {
			employees: data,
		};
		res.status(200).json(response);
	} catch (err) {
		const messages = {};
		err.errors.forEach((error) => {
			let message = error.message;
			messages[error.path] = message;
			console.log(messages);
			res.status(500).json({ message: `Error occurred while updating employee by id.` });
		});
	}
};

/* Restore One Employee by id */
exports.restore = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await employeeModel.restore({ where: { id: id } });

		let response = {
			employees: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting employee by id.` });
	}
};

/* Delete One Employee by id */
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		let data = await employeeModel.destroy({ where: { id: id } });

		let response = {
			employees: data,
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: `Error occurred while deleting employee by id.` });
	}
};
