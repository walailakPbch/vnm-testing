import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly model: Model<EmployeeDocument>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Employee> {
    return await this.model.findById(id).exec();
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return await new this.model({
      ...createEmployeeDto,
    }).save();
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return await this.model.findByIdAndUpdate(id, updateEmployeeDto).exec();
  }

  async delete(id: string): Promise<Employee> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
