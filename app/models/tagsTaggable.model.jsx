module.exports = (sequelize, DataTypes) => {
	const TagsTaggable = sequelize.define(
		`tagstaggables`,
		{
			id: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				unique: true,
			},
			tagId: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				unique: "tt_unique_constraint",
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
			taggableId: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				unique: "tt_unique_constraint",
				references: null,
				validate: {
					notEmpty: {
						args: true,
						msg: `TaggableId is required.`,
					},
					isInt: {
						args: true,
						msg: `TaggableId must be an integer.`,
					},
				},
			},
			taggableType: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: "tt_unique_constraint",
				validate: {
					notEmpty: {
						args: true,
						msg: `TaggableType is required.`,
					},
					len: {
						args: [1, 100],
						msg: `TaggableType must be between 1 and 100 characters.`,
					},
				},
			},
		},
		{
			timestamps: true,
			paranoid: true,
		}
	);
	return TagsTaggable;
};
