import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/vnm'), EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
