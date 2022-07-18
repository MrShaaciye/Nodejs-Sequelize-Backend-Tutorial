const express = require(`express`);
const cors = require(`cors`);
const compression = require(`compression`);
const logger = require(`./app/middleware/logger.middleware.jsx`);
const app = express();

const corsOption = { origin: `http://localhost:5001`, optionsSuccessStatus: 200 };

app.use(
	compression({
		level: 6,
		threshold: 10 * 1000,
		filter: (req, res) => {
			if (req.headers[`x-no-compression`]) {
				return false;
			}
			return compression.filter(req, res);
		},
	})
);
app.use(cors(corsOption));
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get(`/`, (req, res) => res.json({ message: `Welcome to Sequelize API.`.repeat(10000) }));

require(`./app/routes/routers.jsx`)(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
