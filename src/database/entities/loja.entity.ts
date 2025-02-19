/**
 * SQL para criar a tabela:
 *
  CREATE TABLE loja (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    endereco VARCHAR(150) NOT NULL,
    telefone VARCHAR(15) NULL,
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT FALSE
 );
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Loja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 14, nullable: false, unique: true })
  cnpj: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  endereco: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  telefone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criadoEm: Date;

  @Column({ type: 'boolean', default: false })
  ativo: boolean;
}

