export class FileManagerError extends Error {
  constructor(message, name = 'FileManagerError') {
    super(message, name);
  }

  static get EMPTY_ARGS() {
    return new FileManagerError(
      'Please run CLI with command "npm run start -- --username=your_username".\nWhere "your_username" is the username you want to use.'
    );
  }

  static get INVALID_INPUT() {
    return new FileManagerError('Invalid input');
  }

  static get FILE_NOT_FOUND() {
    return new FileManagerError('File not found');
  }

  static get OPERATION_FAILED() {
    return new FileManagerError('Operation failed');
  }
}
