var config = {
	// environment: 'development',
	controllerDir: './controllers',
	modelDir: './models',
	serviceDir: './services',
	routeDir: './routes'
};

config.mongoUri = 'mongodb://127.0.0.1:27017/custodes';

module.exports = config;