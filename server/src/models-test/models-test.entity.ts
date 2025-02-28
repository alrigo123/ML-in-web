/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("model") // Table Name
export class ModelTest {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column()
type: string;

@Column()
description: string;
}