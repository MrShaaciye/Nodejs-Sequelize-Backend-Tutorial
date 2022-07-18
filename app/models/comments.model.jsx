module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define(
		`comments`,
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
						msg: `Post title is required.`,
					},
					len: {
						args: [3, 50],
						msg: `Post title must be between 3 and 50 characters.`,
					},
				},
			},
			commentId: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Comment ID is required.`,
					},
					len: {
						args: [1, 11],
						msg: `Comment ID must be between 1 and 11 characters.`,
					},
					isInt: {
						args: true,
						msg: `Comment ID must be an integer.`,
					},
				},
			},
			commentType: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `Comment type is required.`,
					},
					len: {
						args: [4, 100],
						msg: `Comment type must be between 4 and 100 characters.`,
					},
				},
			},
		},
		{
			timestamps: true,
			paranoid: true,
		}
	);
	return Comments;
};
