import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('usuarios')
export class usuarios {

/**
 * SQL command to create this table:
 *
 * CREATE TABLE usuarios (
 *   id SERIAL PRIMARY KEY,
 *   nome VARCHAR(100) NOT NULL,
 *   cpf VARCHAR(11) NOT NULL UNIQUE,
 *   email VARCHAR(150) NOT NULL UNIQUE,
 *   telefone VARCHAR(15),
 *   criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   usuario VARCHAR(50) NOT NULL UNIQUE,
 *   senha VARCHAR(100) NOT NULL,
 *   acesso BOOLEAN DEFAULT FALSE,
 *   codigoAtivo VARCHAR(20),
 *   validadeCodigoAtivo TIMESTAMP,
 *   codigo2f VARCHAR(6),
 *   tempoCodigoDoisFatores INT,
 *   permissao VARCHAR(50) NOT NULL
 * )
 */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 11, nullable: false, unique: true })
  cpf: string;

  @Column({ length: 150, nullable: false, unique: true })
  email: string;

  @Column({ length: 15, nullable: true })
  telefone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criadoEm: Date;

  @Column({ length: 50, nullable: false, unique: true })
  usuario: string;

  @Column({ length: 100, nullable: false })
  senha: string;

  @Column({ length: 20, nullable: true })
  codigoAtivo: string;

  @Column({ type: 'timestamp', nullable: true })
  validadeCodigoAtivo: Date;

  @Column({ length: 6, nullable: true })
  codigo2f: string;

  @Column({ type: 'int', nullable: true })
  tempoCodigoDoisFatores: number;

  @Column({ length: 50, nullable: false })
  permissao: string;

  async comparePassword(senha: string) {
    const hash = await bcrypt.compare(senha, this.senha);
    return hash;
  }
}

/*INSERT INTO usuarios (
  nome,
  cpf,
  email,
  telefone,
  criadoEm,
  usuario,
  senha,
  codigoAtivo,
  validadeCodigoAtivo,
  codigo2f,
  tempoCodigoDoisFatores,
  permissao
)
VALUES (
  'Enigma',
  '12345678901',
  'enigma@example.com',
  '(11) 12345-6789',
  CURRENT_TIMESTAMP,
  'enigma',
  'senha123',
  NULL,
  NULL,
  NULL,
  NULL,
  'master'
);*/