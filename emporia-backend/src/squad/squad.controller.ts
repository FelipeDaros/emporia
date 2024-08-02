import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { SquadService } from './squad.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('squad')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueSuffix);
      },
    }),
  }))
  async create(@Body() createSquadDto: CreateSquadDto, @UploadedFile() foto: Express.Multer.File) {
    const logoPath = foto ? process.env.API_URL+`/uploads/${foto.filename}` : null;
    return this.squadService.create(createSquadDto, logoPath);
  }

  @Get()
  findAll(@Query('search') search: string, @Query('take') take: string, @Query('skip') skip: string) {
    return this.squadService.findAll(search, +take, +skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.squadService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('foto', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueSuffix);
      },
    }),
  }))
  update(@Param('id') id: string, @Body() updateSquadDto: UpdateSquadDto, @UploadedFile() foto: Express.Multer.File) {
    const logoPath = foto ? process.env.API_URL+`/uploads/${foto.filename}` : null;
    return this.squadService.update(+id, updateSquadDto, logoPath);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.squadService.remove(+id);
  }
}
