import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class IntegrationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(IntegrationExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: any = null;

    // Handle HTTP exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message;
        error = (exceptionResponse as any).error || 'HTTP Exception';
        details = (exceptionResponse as any).details;
      } else {
        message = exceptionResponse as string;
      }
    }
    // Handle Prisma errors
    else if (exception instanceof PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Database Error';
      
      switch (exception.code) {
        case 'P2002':
          message = 'A record with this data already exists';
          details = { constraint: exception.meta?.target };
          break;
        case 'P2025':
          message = 'Record not found';
          status = HttpStatus.NOT_FOUND;
          error = 'Not Found';
          break;
        case 'P2003':
          message = 'Foreign key constraint failed';
          details = { field: exception.meta?.field_name };
          break;
        case 'P2014':
          message = 'Invalid ID provided';
          break;
        default:
          message = 'Database operation failed';
          details = { code: exception.code };
      }
    }
    // Handle validation errors
    else if (exception instanceof Error) {
      if (exception.name === 'ValidationError') {
        status = HttpStatus.BAD_REQUEST;
        error = 'Validation Error';
        message = exception.message;
      } else {
        message = exception.message;
      }
    }

    // Log the error
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : exception,
    );

    // Send error response
    const errorResponse = {
      success: false,
      error,
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      ...(details && { details }),
    };

    response.status(status).json(errorResponse);
  }
}