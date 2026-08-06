import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API Status & Health Check' })
  getHealth() {
    return {
      name: 'Hangout API',
      status: 'ONLINE',
      version: '1.0.0',
      description: 'The Digital Home for Friends API',
      swaggerDocs: '/api/docs',
      timestamp: new Date().toISOString(),
    };
  }
}
