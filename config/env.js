function Config(){
	switch (process.env.NODE_ENV) {
	case 'development':
		return {
			APP_PORT: 5000,
			MASTER:
			{
				HOST:
				"localhost",
				PORT: 27017,
				DB: "myapp"
			}
			,
			USERDB: {
				DB: "users"
			}
			,
			MYSQL: {
				HOST: "localhost",
				DB: "myapp",
				USERNAME: "root",
				PASSWORD: "",
				PORT: 3306
			}

			,
			SESSIONDB: {
				HOST: "localhost",
				PORT: 27017,
				DB: "session"
			}

			,
			GOOGLE_ANALYTICS_SITE_ID: ""

			//LOGGER PROPERTES
			,
			LOG_LEVEL: 'DEBUG'
		};

	case 'production':
		return {
			APP_PORT: 3000,
			MASTER:
			{
				HOST:
				"localhost",
				PORT: 27017,
				DB: "myapp"
			}
			,
			USERDB: {
				DB: "users"
			}
			,
			MYSQL: {
				HOST: "localhost",
				DB: "myapp",
				USERNAME: "root",
				PASSWORD: "",
				PORT: 3306
			}

			,
			SESSIONDB: {
				HOST: "localhost",
				PORT: 27017,
				DB: "session"
			}

			,
			GOOGLE_ANALYTICS_SITE_ID: ""

			//LOGGER PROPERTES
			,
			LOG_LEVEL: 'DEBUG'
		};
	case 'test':
		return {
			APP_PORT: 3000,
			MASTER:
			{
				HOST:
				"localhost",
				PORT: 27017,
				DB: "myapp"
			}
			,
			USERDB: {
				DB: "users"
			}
			,
			MYSQL: {
				HOST: "localhost",
				DB: "myapp",
				USERNAME: "root",
				PASSWORD: "",
				PORT: 3306
			}

			,
			SESSIONDB: {
				HOST: "localhost",
				PORT: 27017,
				DB: "session"
			}

			,
			GOOGLE_ANALYTICS_SITE_ID: ""

			//LOGGER PROPERTES
			,
			LOG_LEVEL: 'DEBUG'
		};
	default:	
		return {
			APP_PORT: 5000,
			MASTER:
			{
				HOST:
				"localhost",
				PORT: 27017,
				DB: "myapp"
			}
			,
			USERDB: {
				DB: "users"
			}
			,
			MYSQL: {
				HOST: "localhost",
				DB: "myapp",
				USERNAME: "root",
				PASSWORD: "",
				PORT: 3306
			}

			,
			SESSIONDB: {
				HOST: "localhost",
				PORT: 27017,
				DB: "session"
			}

			,
			GOOGLE_ANALYTICS_SITE_ID: ""

			//LOGGER PROPERTES
			,
			LOG_LEVEL: 'DEBUG'
		};
	}
}

module.exports = new Config(); 
