export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController'),
} as const;
