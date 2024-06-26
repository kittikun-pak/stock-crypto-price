export enum ProviderName {
    ENV_CONFIG = 'EnvironmentConfig',
    REDIS = 'Redis',
    MONGO_CLIENT = 'MongoClient',
    MONGO_DB = 'MongoDb',
  

    // Adaptor
    YAHOO_FINANCE_ADAPTOR = 'YahooFinanceAdaptor',
    COIN_CAP_ADAPTOR = 'CoinCapAdaptor',

    // Service
    JWT_SERVICE = "JwtService",
    AUTH_SERVICE = 'AuthService',
    STOCK_SERVICE = 'StockService',
    CRYPTO_SERVICE = 'CryptoService',
    USER_SERVICE = 'UserService',

    // Domain-Service
    USER_DOMAIN_SERVICE = 'UserDomainService',

    // Repository
    USER_REPOSITORY = 'UserRepository',
}