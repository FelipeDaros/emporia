import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CondicaoDePagamentoService } from './condicao-de-pagamento.service';
import { CreateCondicaoDePagamentoDto } from './dto/create-condicao-de-pagamento.dto';
import { UpdateCondicaoDePagamentoDto } from './dto/update-condicao-de-pagamento.dto';

@Controller('condicao-de-pagamento')
export class CondicaoDePagamentoController {
  constructor(private readonly condicaoDePagamentoService: CondicaoDePagamentoService) {}

  @Post()
  create(@Body() createCondicaoDePagamentoDto: CreateCondicaoDePagamentoDto) {
    return this.condicaoDePagamentoService.create(createCondicaoDePagamentoDto);
  }

  @Get()
  findAll(@Query('search') search: string, @Query('take') take: string, @Query('skip') skip: string) {
    return this.condicaoDePagamentoService.findAll(search, +take, +skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condicaoDePagamentoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCondicaoDePagamentoDto: UpdateCondicaoDePagamentoDto) {
    return this.condicaoDePagamentoService.update(+id, updateCondicaoDePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condicaoDePagamentoService.remove(+id);
  }
}
