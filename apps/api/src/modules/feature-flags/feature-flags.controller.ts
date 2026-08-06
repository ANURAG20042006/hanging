import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { FeatureFlagsService } from './feature-flags.service';

@ApiTags('feature-flags')
@Controller('feature-flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Get()
  @ApiOperation({ summary: 'List all feature flags with rollout status' })
  getAllFlags() {
    return this.featureFlagsService.getAllFlags();
  }

  @Get(':key')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check if a specific feature flag is enabled for the calling user' })
  isEnabled(@Param('key') key: string) {
    const enabled = this.featureFlagsService.isEnabled(key);
    return { key, enabled };
  }
}
