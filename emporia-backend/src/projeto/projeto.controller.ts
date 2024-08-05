import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.create(createProjetoDto);
  }

  @Get()
  findAll(@Query('search') search: string, @Query('take') take: string, @Query('skip') skip: string) {
    return this.projetoService.findAll(search, +take, +skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetoService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetoService.remove(id);
  }
}
