export class FileManagerError extends Error {
  constructor(message) {
    super(message);
  }

  static get EMPTY_ARGS() {
    return new FileManagerError(
      'Please run CLI with command "npm run start -- --username=your_username".\nWhere "your_username" is the username you want to use.'
    );
  }
}
