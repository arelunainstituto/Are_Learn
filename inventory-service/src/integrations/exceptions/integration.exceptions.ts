import { HttpException, HttpStatus } from '@nestjs/common';

export class IntegrationNotFoundException extends HttpException {
  constructor(integrationId: string) {
    super(
      {
        error: 'Integration Not Found',
        message: `Integration with ID ${integrationId} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class IntegrationConnectionException extends HttpException {
  constructor(provider: string, reason?: string) {
    super(
      {
        error: 'Integration Connection Failed',
        message: `Failed to connect to ${provider}${reason ? `: ${reason}` : ''}`,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class SyncTaskNotFoundException extends HttpException {
  constructor(taskId: string) {
    super(
      {
        error: 'Sync Task Not Found',
        message: `Sync task with ID ${taskId} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class SyncInProgressException extends HttpException {
  constructor(integrationId: string) {
    super(
      {
        error: 'Sync In Progress',
        message: `A sync operation is already in progress for integration ${integrationId}`,
        statusCode: HttpStatus.CONFLICT,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidSyncOptionsException extends HttpException {
  constructor(message: string) {
    super(
      {
        error: 'Invalid Sync Options',
        message,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class AdapterNotFoundException extends HttpException {
  constructor(provider: string) {
    super(
      {
        error: 'Adapter Not Found',
        message: `No adapter found for provider: ${provider}`,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ExternalSystemException extends HttpException {
  constructor(provider: string, operation: string, reason?: string) {
    super(
      {
        error: 'External System Error',
        message: `${provider} ${operation} failed${reason ? `: ${reason}` : ''}`,
        statusCode: HttpStatus.BAD_GATEWAY,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }
}

export class DataMappingException extends HttpException {
  constructor(entity: string, reason?: string) {
    super(
      {
        error: 'Data Mapping Error',
        message: `Failed to map ${entity} data${reason ? `: ${reason}` : ''}`,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class ValidationException extends HttpException {
  constructor(field: string, value: any, reason?: string) {
    super(
      {
        error: 'Validation Error',
        message: `Invalid value for ${field}: ${value}${reason ? ` (${reason})` : ''}`,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}