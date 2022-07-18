module.exports = (sequelize, DataTypes) => {
	const Tags = sequelize.define(
		`tags`,
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
						msg: `Tag name is required.`,
					},
					len: {
						args: [2, 50],
						msg: `Tag name must be between 1 and 50 characters.`,
					},
					isAlpha: {
						args: true,
						msg: `Tag name must be a string.`,
					},
				},
			},
		},
		{
			Timestamps: true,
			paranoid: true,
		}
	);
	return Tags;
};
