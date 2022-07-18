module.exports = (sequelize, DataTypes) => {
	const bcrypt = require(`bcrypt`);
	const Users = sequelize.define(
		`users`,
		{
			id: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: {
						args: true,
						msg: `User name is required.`,
					},
					len: {
						args: [2, 50],
						msg: `User name must be between 1 and 50 characters.`,
					},
				},
			},
			password: {
				type: DataTypes.STRING(64),
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `User password is required.`,
					},
					len: {
						args: [6, 64],
						msg: `User password be between 6 and 64 characters.`,
					},
					is: {
						args: ["^[0-9a-zA-Z!@#$%^&*_.,/|]+$", "i"],
						msg: `User password must match mixed/None mixed string, number and Symbols. `,
					},
				},
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: {
						args: true,
						msg: `User email is required.`,
					},
					len: {
						args: [10, 50],
						msg: `User email be between 10 and 50 characters.`,
					},
					isEmail: {
						args: true,
						msg: `User email must be a valid email.`,
					},
				},
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				validate: {
					notEmpty: {
						args: true,
						msg: `User isActive is required.`,
					},
					isIn: {
						args: [[`false`, `true`]],
						msg: `User isActive must be false/true`,
					},
				},
			},
		},
		{
			Timestamps: true,
			paranoid: true,
		}
	);

	Users.beforeValidate(async (user, options) => {
		const hashedPassword = await bcrypt.hash(user.password, 8);
		user.password = hashedPassword;
	});
	return Users;
};

/*
validate: {
	namePasswordMatch() {
		if(this.name === this.password) {
			throw new Error(`Sorry password can't be your name!.);
		}
	}
}

hooks: {
	afterValidate: (user, options) => {
		user.password = bcrypt.hashSync(user.password, 8);
	},
	beforeValidate: (user, options) => {
		console.log(`beforeValidate`);
		user.name = `Asha`;
		console.log(user.name);
		user.password = `1234a`;
		console.log(user.password);
		console.log(`afterValidate`);
	},
	beforeCreate: (user, options) => {
		console.log(`beforeCreate`);
	},
	afterCreate: (user, options) => {
		console.log(`afterCreate`);
	},
	timestamps: false,
	underscored: true,
	createdAt: false,
	createdAt: `created_at`,
	updatedAt: false,
	updatedAt: `updated_at`,
	ENGINE: `InnoDB`,
	},

======================================
name: {
	get() {
		const rawValue = this.getDataValue(`name`);
		return rawValue.toUpperCase();
	}
},

======================================
npm i bcrypt
const bcrypt = require(`bcrypt`);
password: {
	set(value) {
		const salt = bcrypt.getSaltSync(8);
		const hash = bcrypt.hashSync(value, salt);
		this.setDataValue(`password`, hash);
	}
}

======================================
npm i zlib
const zlib = require(`zlib`);

email: {
	set(value) {
		const compressed = zlib.deflateSync(value).toString(`base64`);
		this.setDataValue(`email`, compressed);
	},
	get() {
		const value = this.getDataValue(`email`);
		const uncompressed = zlib.deflateSync(Buffer.from(value, `base64`))
		return uncompressed.toString();
	}
}

======================================
age: {
	validate: {
		isOldEnough(value) {
			if (value < 15) {
				throw new Error(`Sorry this age is too young`);
			} else if (value > 100) {
				throw new Error(`Sorry this age is too old`);
			}
		}
	}
}


	
	==============================
	User.addHook(`beforeValidate`, `customName`, (user, options) => {
		user.name = `Aisha`;
		user.password = `abcde`;
		user.password = bcrypt.hashSync(user.password, 2);
	});

	Users.afterValidate(`myHookLast`, (user, options) => {
		user.name = `Alia`;
		user.password = `fghei`;
		user.password = bcrypt.hashSync(user.password, 8);
		Users.removeHook(`beforeValidate`, `customName`);
	});
	*/
