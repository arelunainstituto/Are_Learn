import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { MovementCreate } from '@areluna/schemas';
import { CreateMovementDto } from './dto/create-stock-movement.dto';

@ApiTags('Test Movement Validation')
@Controller('test-movements')
export class TestMovementController {
  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test Zod validation for movement creation' })
  @ApiResponse({
    status: 200,
    description: 'Movement data validated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @UsePipes(new ZodValidationPipe(MovementCreate))
  async testValidation(@Body() createMovementDto: CreateMovementDto) {
    return {
      message: 'Validation successful',
      data: createMovementDto,
      timestamp: new Date().toISOString(),
    };
  }
}