import {Repository } from 'typeorm';
import { usuarios } from '../entities/users.entity';


export class UsuariosRepository extends Repository<usuarios> {}