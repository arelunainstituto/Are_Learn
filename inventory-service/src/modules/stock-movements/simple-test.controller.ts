import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { MovementCreate, ProductCreate } from '@areluna/schemas';

@ApiTags('Schema Validation Tests')
@Controller('schema-test')
export class SimpleTestController {
  @Post('movement')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test MovementCreate schema validation' })
  @ApiResponse({
    status: 200,
    description: 'Movement schema validated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @ApiBody({
    description: 'Movement data to validate',
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['IN', 'OUT', 'TRANSFER', 'ADJUST'] },
        tenantId: { type: 'string' },
        productId: { type: 'string' },
        variantId: { type: 'string' },
        lotId: { type: 'string' },
        serial: { type: 'string' },
        fromLocationId: { type: 'string' },
        toLocationId: { type: 'string' },
        qty: { type: 'number', minimum: 0.01 },
        uom: { type: 'string', default: 'pc' },
        refDocumentId: { type: 'string' },
        note: { type: 'string' },
      },
      required: ['type', 'tenantId', 'productId', 'qty'],
    },
  })
  @UsePipes(new ZodValidationPipe(MovementCreate))
  async validateMovement(@Body() movementData: any) {
    return {
      message: 'MovementCreate schema validation successful',
      data: movementData,
      validatedAt: new Date().toISOString(),
    };
  }

  @Post('product')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test ProductCreate schema validation' })
  @ApiResponse({
    status: 200,
    description: 'Product schema validated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @ApiBody({
    description: 'Product data to validate',
    schema: {
      type: 'object',
      properties: {
        tenantId: { type: 'string' },
        sku: { type: 'string', minLength: 1 },
        name: { type: 'string', minLength: 1 },
        uom: { type: 'string', minLength: 1 },
        trackLot: { type: 'boolean', default: false },
        trackSerial: { type: 'boolean', default: false },
      },
      required: ['tenantId', 'sku', 'name', 'uom'],
    },
  })
  @UsePipes(new ZodValidationPipe(ProductCreate))
  async validateProduct(@Body() productData: any) {
    return {
      message: 'ProductCreate schema validation successful',
      data: productData,
      validatedAt: new Date().toISOString(),
    };
  }

  @Post('movement/invalid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test MovementCreate validation with invalid data' })
  @ApiResponse({
    status: 400,
    description: 'Expected validation error',
  })
  async testInvalidMovement() {
    try {
      // This should fail validation
      const invalidData = {
        type: 'INVALID_TYPE',
        tenantId: '',
        productId: '',
        qty: -1,
      };
      
      const result = MovementCreate.parse(invalidData);
      return {
        message: 'Unexpected: validation should have failed',
        data: result,
      };
    } catch (error) {
      return {
        message: 'Expected validation error occurred',
        error: error.message,
        issues: error.issues || [],
      };
    }
  }
}