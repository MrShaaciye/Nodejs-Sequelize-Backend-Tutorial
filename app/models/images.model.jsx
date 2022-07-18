module.exports = (sequelize, DataTypes) => {
	const Images = sequelize.define(
		`images`,
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
						msg: `Image title is required.`,
					},
					len: {
						args: [4, 50],
						msg: `Image title must be between 4 and 50 characters.`,
					},
				},
			},
			url: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Image url is required.`,
					},
					len: {
						args: [4, 50],
						msg: `Image url must be between 10 and 100 characters.`,
					},
				},
			},
		},
		{
			timestamps: true,
			paranoid: true,
		}
	);
	return Images;
};
