# Zod Schema Validation Integration Guide

## Overview

The inventory service now includes comprehensive Zod schema validation for data integrity and type safety. This integration provides runtime validation for all data structures used in the inventory management system.

## Architecture

### Schema Package (`@areluna/schemas`)
- **Location**: `/packages/schemas/src/inventory.ts`
- **Purpose**: Centralized schema definitions using Zod
- **Export**: TypeScript types and Zod schemas for runtime validation

### Validation Endpoints
- **Controller**: `SimpleTestController` in `src/modules/stock-movements/simple-test.controller.ts`
- **Base Path**: `/schema-test`
- **Purpose**: Testing and validation of schema compliance

## Available Schemas

### MovementCreate Schema
```typescript
{
  tenantId: string (cuid format)
  type: "IN" | "OUT" | "TRANSFER" | "ADJUST"
  productId: string (min 1 character)
  qty: number (greater than 0)
  uom: string (min 1 character)
  variantId?: string (optional)
  lotId?: string (optional)
  serial?: string (optional)
  fromLocationId?: string (optional)
  toLocationId?: string (optional)
  refDocumentId?: string (optional)
  note?: string (optional)
}
```

### ProductCreate Schema
```typescript
{
  tenantId: string (cuid format)
  sku: string (min 1 character)
  name: string (min 1 character)
  uom: string (min 1 character)
  trackLot: boolean
  trackSerial: boolean
  categoryId?: string (optional)
  description?: string (optional)
  barcode?: string (optional)
  weight?: number (optional)
  dimensions?: string (optional)
  minStock?: number (optional)
  maxStock?: number (optional)
  reorderPoint?: number (optional)
  cost?: number (optional)
  price?: number (optional)
  active?: boolean (optional, defaults to true)
}
```

## API Endpoints

### Test Movement Validation
```bash
POST /schema-test/movement
Content-Type: application/json

{
  "type": "IN",
  "tenantId": "clxyz123456789",
  "productId": "prod-123",
  "qty": 10,
  "uom": "pc"
}
```

**Success Response (200)**:
```json
{
  "message": "MovementCreate schema validation successful",
  "data": {
    "tenantId": "clxyz123456789",
    "type": "IN",
    "productId": "prod-123",
    "qty": 10,
    "uom": "pc"
  },
  "validatedAt": "2025-10-14T18:18:58.720Z"
}
```

### Test Product Validation
```bash
POST /schema-test/product
Content-Type: application/json

{
  "tenantId": "clxyz123456789",
  "sku": "PROD-001",
  "name": "Test Product",
  "uom": "pc",
  "trackLot": false,
  "trackSerial": false
}
```

**Success Response (200)**:
```json
{
  "message": "ProductCreate schema validation successful",
  "data": {
    "tenantId": "clxyz123456789",
    "sku": "PROD-001",
    "name": "Test Product",
    "uom": "pc",
    "trackLot": false,
    "trackSerial": false
  },
  "validatedAt": "2025-10-14T18:19:06.600Z"
}
```

### Test Invalid Movement (Error Demonstration)
```bash
POST /schema-test/movement/invalid
```

**Error Response (400)**:
```json
{
  "message": "Expected validation error occurred",
  "error": "[detailed Zod validation errors]",
  "issues": [
    {
      "validation": "cuid",
      "code": "invalid_string",
      "message": "Invalid cuid",
      "path": ["tenantId"]
    },
    {
      "received": "INVALID_TYPE",
      "code": "invalid_enum_value",
      "options": ["IN", "OUT", "TRANSFER", "ADJUST"],
      "path": ["type"],
      "message": "Invalid enum value. Expected 'IN' | 'OUT' | 'TRANSFER' | 'ADJUST', received 'INVALID_TYPE'"
    },
    {
      "code": "too_small",
      "minimum": 0,
      "type": "number",
      "inclusive": false,
      "exact": false,
      "message": "Number must be greater than 0",
      "path": ["qty"]
    }
  ]
}
```

## Validation Rules

### Common Validations
- **CUID Format**: All `tenantId` fields must be valid CUID strings
- **Non-empty Strings**: Required string fields must have at least 1 character
- **Positive Numbers**: Quantity fields must be greater than 0
- **Enum Values**: Type fields must match predefined enum values

### Movement Type Validation
- `IN`: Incoming inventory
- `OUT`: Outgoing inventory
- `TRANSFER`: Transfer between locations
- `ADJUST`: Inventory adjustments

## Error Handling

### Validation Errors
When validation fails, the API returns:
- **Status Code**: 400 Bad Request
- **Error Message**: Descriptive validation failure message
- **Detailed Issues**: Array of specific validation failures with paths

### Error Response Structure
```typescript
{
  message: string
  error?: string
  statusCode: number
  issues?: Array<{
    code: string
    message: string
    path: string[]
    [key: string]: any
  }>
}
```

## Integration Examples

### Using in Controllers
```typescript
import { MovementCreateSchema, ProductCreateSchema } from '@areluna/schemas';

@Post('validate-movement')
async validateMovement(@Body() data: any) {
  try {
    const validatedData = MovementCreateSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: error.issues
      });
    }
    throw error;
  }
}
```

### Using with DTOs
```typescript
import { createZodDto } from 'nestjs-zod';
import { MovementCreateSchema } from '@areluna/schemas';

export class CreateMovementDto extends createZodDto(MovementCreateSchema) {}
```

## Testing

### Valid Test Cases
1. **Basic Movement**: Minimum required fields
2. **Complete Movement**: All optional fields included
3. **Basic Product**: Minimum required fields
4. **Complete Product**: All optional fields included

### Invalid Test Cases
1. **Invalid CUID**: Non-CUID tenant ID
2. **Invalid Enum**: Wrong movement type
3. **Negative Quantity**: Negative or zero quantities
4. **Empty Strings**: Empty required string fields
5. **Missing Fields**: Missing required fields

## Service Status

The inventory service is running successfully on:
- **URL**: http://localhost:3005
- **Health Check**: http://localhost:3005/healthz
- **API Documentation**: http://localhost:3005/api/docs
- **Schema Testing**: http://localhost:3005/schema-test/*

## Next Steps

1. **Integration**: Implement Zod validation in all existing controllers
2. **Middleware**: Create global validation middleware
3. **Error Handling**: Standardize error response format
4. **Documentation**: Update Swagger documentation with validation rules
5. **Testing**: Expand test coverage for all schema variations