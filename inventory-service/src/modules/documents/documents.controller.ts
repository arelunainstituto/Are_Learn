import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, DocumentType, DocumentStatus } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document' })
  @ApiResponse({ status: 201, description: 'Document created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Document number already exists' })
  create(
    @Query('tenantId') tenantId: string,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    return this.documentsService.create(tenantId, createDocumentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  @ApiResponse({ status: 200, description: 'Documents retrieved successfully' })
  @ApiQuery({ name: 'type', enum: DocumentType, required: false })
  @ApiQuery({ name: 'status', enum: DocumentStatus, required: false })
  @ApiQuery({ name: 'warehouseId', required: false })
  @ApiQuery({ name: 'partnerId', required: false })
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  @ApiQuery({ name: 'search', required: false })
  findAll(
    @Query('tenantId') tenantId: string,
    @Query('type') type?: DocumentType,
    @Query('status') status?: DocumentStatus,
    @Query('warehouseId') warehouseId?: string,
    @Query('partnerId') partnerId?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('search') search?: string,
  ) {
    return this.documentsService.findAll(
      tenantId,
      type,
      status,
      warehouseId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by ID' })
  @ApiResponse({ status: 200, description: 'Document retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  findOne(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.documentsService.findOne(tenantId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document' })
  @ApiResponse({ status: 200, description: 'Document updated successfully' })
  @ApiResponse({ status: 400, description: 'Cannot update completed or cancelled document' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  update(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(tenantId, id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @ApiResponse({ status: 200, description: 'Document deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete completed document' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  remove(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.documentsService.remove(tenantId, id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update document status' })
  @ApiResponse({ status: 200, description: 'Document status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  updateStatus(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body('status') status: DocumentStatus,
  ) {
    return this.documentsService.updateStatus(tenantId, id, status);
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Confirm a document and process it' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Document confirmed and processed successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 400, description: 'Document cannot be confirmed' })
  async confirmDocument(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.documentsService.confirmDocument(tenantId, id);
  }

  @Post(':id/process')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Process a document (execute stock movements)' })
  @ApiResponse({ status: 200, description: 'Document processed successfully' })
  @ApiResponse({ status: 400, description: 'Document must be approved before processing' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  processDocument(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    // This endpoint is deprecated - use confirmDocument instead
    return this.documentsService.confirmDocument(tenantId, id);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve a document' })
  @ApiResponse({ status: 200, description: 'Document approved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  approveDocument(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.documentsService.updateStatus(tenantId, id, DocumentStatus.APPROVED);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject a document' })
  @ApiResponse({ status: 200, description: 'Document rejected successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  rejectDocument(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.documentsService.updateStatus(tenantId, id, DocumentStatus.REJECTED);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a document' })
  @ApiResponse({ status: 200, description: 'Document cancelled successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  cancelDocument(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.documentsService.updateStatus(tenantId, id, DocumentStatus.CANCELLED);
  }
}