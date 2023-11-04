import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResult } from '../custom/apiResult';
import { CreateReviewDto } from '../restaurant/dto/CreateReviewDto';
import { SuccessType } from 'src/enum/successType.enum';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/guard/jwtAuth.guard';
@UseGuards(JwtAuthGuard)
@Controller('restaurants')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:restaurantId/review')
  async postReviewOfRestaurantById(
    //NOTE: userId 값은 추후에 Param -> Req로 변경.
    @Req() req,
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Body(ValidationPipe) createReviewDto: CreateReviewDto,
  ): Promise<ApiResult<void>> {
    console.log(req);
    await this.reviewService.postReviewOfRestaurantById(
      req.user.id,
      restaurantId,
      createReviewDto,
    );
    return {
      message: SuccessType.REVIEW_SAVE,
    };
  }
}
