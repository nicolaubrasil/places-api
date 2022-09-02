import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('places')
@UseGuards(ThrottlerGuard)
@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}

    @Post()
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        description: 'The place has been successfully created.',
    })
    @ApiNotFoundResponse({ description: 'The country does not exist.' })
    @ApiConflictResponse({
        description: 'The place already exists in the country.',
    })
    create(@Body() createPlaceDto: CreatePlaceDto) {
        return this.placesService.create(createPlaceDto);
    }

    @Get()
    findAll() {
        return this.placesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.placesService.findOne(id);
    }

    @Patch(':id')
    @ApiBadRequestResponse({ description: 'Invalid update.' })
    @ApiResponse({
        status: 200,
        description: 'The place has been successfully updated.',
    })
    update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
        return this.placesService.update(id, updatePlaceDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiNotFoundResponse({ description: 'The place does not exist.' })
    @ApiNoContentResponse({
        description: 'The place has been successfully deleted.',
    })
    remove(@Param('id') id: string) {
        return this.placesService.remove(id);
    }
}
