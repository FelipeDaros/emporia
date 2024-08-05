import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateGrupoItemsDto } from './dto/create-grupo-items';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItenDto: CreateItemDto) {
    return this.itemsService.create(createItenDto);
  }

  @Get()
  findAll(@Query('search') search: string, @Query('take') take: string, @Query('skip') skip: string) {
    return this.itemsService.findAll(search, +take, +skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItenDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }

  @Post('/adicionando-items-no-grupo')
  adicionarItemsAoGrupo(@Body() createGrupoItemsDto: CreateGrupoItemsDto){
    return this.itemsService.adicionarItemsAoGrupo(createGrupoItemsDto);
  }
}
