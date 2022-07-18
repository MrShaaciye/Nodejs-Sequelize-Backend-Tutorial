module.exports = (sequelize, DataTypes) => {
	const PostTags = sequelize.define(
		`posttags`,
		{
			id: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				unique: true,
			},
			postId: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `PostId is required.`,
					},
					isInt: {
						args: true,
						msg: `PostId must be an integer.`,
					},
				},
			},
			tagId: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `TagId is required.`,
					},
					isInt: {
						args: true,
						msg: `TagId must be an integer.`,
					},
				},
			},
		},
		{
			timestamps: true,
			paranoid: true,
		}
	);
	return PostTags;
};
