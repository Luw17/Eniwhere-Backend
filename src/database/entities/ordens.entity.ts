import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

// SQL Code to create the table:
//
// CREATE TABLE ordens (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     cpf VARCHAR(14) NOT NULL,
//     aparelho VARCHAR(150) NOT NULL,
//     modelo VARCHAR(150) NOT NULL,
//     marca VARCHAR(150) NOT NULL,
//     problema TEXT NOT NULL,
//     foto VARCHAR(150) NOT NULL,
//     criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     lojaId INT NULL,
//     concluida BOOLEAN DEFAULT FALSE,
//     status VARCHAR(150) NULL,
//     deleted BOOLEAN DEFAULT FALSE,
//     deletedAt TIMESTAMP NULL,
//     usuarioId INT NULL,
//     usuarioConcluiuId INT NULL,
//     usuarioDeletouId INT NULL,
//     usuarioAtualizouId INT NULL
// );

@Entity()
export class Ordens {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 14, nullable: false})
    cpf: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    aparelho: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    modelo: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    marca: string;

    @Column({type: 'text', nullable: false})
    problema: string;

    @Column({type: 'varchar', length: 150, nullable: true})
    foto: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    criadoEm: Date;

    @Column({type: 'integer', nullable: true})
    lojaId: number;

    @Column({type: 'boolean', default: false})
    concluida: boolean;

    @Column({type: 'varchar', length: 150, nullable: true})
    status: string;

    @Column({type: 'boolean', default: false})
    deleted: boolean;

    @Column({type: 'timestamp', nullable: true})
    deletedAt: Date;

    @Column({type: 'integer', nullable: true})
    usuarioId: number;

    @Column({type: 'integer', nullable: true})
    usuarioConcluiuId: number;

    @Column({type: 'integer', nullable: true})
    usuarioDeletouId: number;

    @Column({type: 'integer', nullable: true})
    usuarioAtualizouId: number;
}
