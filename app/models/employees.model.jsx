module.exports = (sequelize, DataTypes) => {
	const Employees = sequelize.define(
		`employees`,
		{
			id: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				unique: true,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Employee name is required.`,
					},
					len: {
						args: [3, 50],
						msg: `Employee name must be between 3 and 50 characters.`,
					},
				},
			},
			job: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Employee job is required.`,
					},
					len: {
						args: [5, 50],
						msg: `Employee job must between 5 and 50 characters.`,
					},
				},
			},
			salary: {
				type: DataTypes.DECIMAL(18, 2),
				allowNull: false,
				defaultValue: 0.0,
				validate: {
					notEmpty: {
						args: true,
						msg: `Employee salary is required.`,
					},
					isDecimal: {
						args: true,
						msg: `Employee salary must be a decimal`,
					},
				},
			},
			userId: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Employee userId ID is required.`,
					},
					isInt: {
						args: true,
						msg: `Employee userId ID must be an integer.`,
					},
				},
			},
		},
		{
			timestamps: true,
			paranoid: true,
		}
	);
	return Employees;
};
