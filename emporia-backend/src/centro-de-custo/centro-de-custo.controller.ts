import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CentroDeCustoService } from './centro-de-custo.service';
import { CreateCentroDeCustoDto } from './dto/create-centro-de-custo.dto';
import { UpdateCentroDeCustoDto } from './dto/update-centro-de-custo.dto';

@Controller('centro-de-custo')
export class CentroDeCustoController {
  constructor(private readonly centroDeCustoService: CentroDeCustoService) {}

  @Post()
  create(@Body() createCentroDeCustoDto: CreateCentroDeCustoDto) {
    return this.centroDeCustoService.create(createCentroDeCustoDto);
  }

  @Get()
  findAll(@Query('search') search: string, @Query('take') take: string, @Query('skip') skip: string) {
    return this.centroDeCustoService.findAll(search, +take, +skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centroDeCustoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCentroDeCustoDto: UpdateCentroDeCustoDto) {
    return this.centroDeCustoService.update(+id, updateCentroDeCustoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centroDeCustoService.remove(+id);
  }
}
