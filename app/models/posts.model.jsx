module.exports = (sequelize, DataTypes) => {
	const Posts = sequelize.define(
		`posts`,
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
						msg: `Post name is required.`,
					},
					len: {
						args: [3, 50],
						msg: `Post name must be between 3 and 50 characters.`,
					},
				},
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Post title is required.`,
					},
					len: {
						args: [3, 50],
						msg: `Post title must be between 3 and 50 characters.`,
					},
				},
			},
			content: {
				type: DataTypes.STRING(1000),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Post content is required.`,
					},
					len: {
						args: [3, 100],
						msg: `Post content must be between 10 and 250 characters.`,
					},
				},
			},
			userId: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Post userId ID is required.`,
					},
					isInt: {
						args: true,
						msg: `Post userId ID must be an integer.`,
					},
				},
			},
		},
		{
			timestamps: true,
			paranoid: true,
		}
	);
	return Posts;
};
