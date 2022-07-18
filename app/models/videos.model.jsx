module.exports = (sequelize, DataTypes) => {
	const Videos = sequelize.define(
		`videos`,
		{
			id: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				unique: true,
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Video title is required.`,
					},
					len: {
						args: [2, 50],
						msg: `Video title must be between 1 and 50 characters.`,
					},
				},
			},
			text: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Video text is required.`,
					},
					len: {
						args: [2, 100],
						msg: `Video text must be between 1 and 100 characters.`,
					},
				},
			},
		},
		{
			Timestamps: true,
			paranoid: true,
		}
	);
	return Videos;
};
