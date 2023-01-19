import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop()
  code: string;

  @Prop()
  avatar: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
