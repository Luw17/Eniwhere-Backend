import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosRepository } from './repositories/usuarios.repository';
import { OrdensRepository } from './repositories/ordens.repository';
import { usuarios } from './entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { Ordens } from './entities/ordens.entity';

@Injectable()
export class DatabaseService {

  constructor(
    @InjectRepository(usuarios)
    private readonly usuariosRepository: Repository<usuarios>,
    @InjectRepository(Ordens)
    private readonly ordensRepository: Repository<Ordens>,
  ) {}

  async selectUsers() {
    try {
      return this.usuariosRepository.find();
    } catch (error) {
      console.error('Erro ao selecionar usuarios:', error);
      return [];
    }
}
async validateUser(usuario: string, senha: string) {
  const user = await this.usuariosRepository.findOne({
      where: { usuario, senha },
      select: ['id']
  });
  if (user) {
      return user.id;
  } else {
      throw new UnauthorizedException('Credenciais invalidas');
  }

}
  async insertUser(user: { nome: string; cpf: string; email: string; telefone: string }) {
    try {
      await this.usuariosRepository.insert(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new UnauthorizedException('CPF ja  cadastrado');
      } else {
        throw error;
      }
    }
  }

  async verifyUser(cpf: string) {
    try {
      const user = await this.usuariosRepository.findOne({ where: { cpf } });
      return !!user;
    } catch (error) {
      return false;
    }
  }

  /*async compareUser(user: { cpf: string; senha: string }) {
    try {
      const usuario = await this.usuariosRepository.findOne({ where: { cpf: user.cpf }, select: ['id', 'senha', 'codigo2f', 'tempoCodigoDoisFatores'] });
      if (usuario && await usuario.comparePassword(user.senha)) {
        const code = Math.floor(100000 + Math.random() * 900000);
        usuario.codigo2f = code.toString();
        usuario.tempoCodigoDoisFatores = new Date().getTime() + 300000;
        await this.usuariosRepository.save(usuario);
        return { success: true, codigo2f: code };
      } else {
        throw new UnauthorizedException('Credenciais invalidas');
      }
    } catch (error) {
      if (error.status === 401) {
        throw error;
      } else {
        throw new UnauthorizedException('Erro ao logar');
      }
    }
  }
*/
  async verifyCode2f(user: { usuario: string; codigo2f: string }) {
    try {
      const usuario = await this.usuariosRepository.findOne({ where: { cpf: user.usuario, codigo2f: user.codigo2f, tempoCodigoDoisFatores: MoreThan(new Date().getTime()) } });
      if (usuario) {
        usuario.codigo2f = null;
        usuario.tempoCodigoDoisFatores = null;
        await this.usuariosRepository.save(usuario);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async selectF(id: number) {
    try {
      const usuario = await this.usuariosRepository.findOneOrFail({ where: { id } });
      return usuario;
    } catch (error) {
      return null;
    }
  }

  async update(id: number, body: { nome?: string; cpf?: string; email?: string; telefone?: string }) {
    try {
      await this.usuariosRepository.update(id, body);
    } catch (error) {
      console.error('Erro ao atualizar usuario:', error);
      throw error;
    }
  }

  async delete(id: number) {
    const usuario: usuarios = await this.usuariosRepository.createQueryBuilder("usuarios")
      .where("id = :id", { id: id })
      .getOne();

    if (usuario) {
      await this.usuariosRepository.createQueryBuilder()
        .delete()
        .from(usuarios)
        .where("id = :id", { id: id })
        .execute();

    } else {
      console.log('User not found');
    }
  }

  async selectOrdens() {
    try {
      const resposta = await this.ordensRepository.find({ where: { deleted: false, concluida: false } });
      const respostaComUsuario = await Promise.all(resposta.map(async (ordem) => {
        const usuario = await this.usuariosRepository.findOneOrFail({ where: { cpf: ordem.cpf } });
        return {
          ...ordem,
          usuario: {
            nome: usuario.nome
          },
          cpf: ordem.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        };
      }));
      return respostaComUsuario;
    } catch (error) {
      console.error('Erro ao selecionar ordens:', error);
      return [];
    }
  }

  async selectFOrdens(id: number) {
    try {
      const ordem = await this.ordensRepository.createQueryBuilder("ordens")
        .where("id = :id AND deleted = false", { id: id })
        .getOne();

      if (ordem) {
        const usuario = await this.usuariosRepository.findOneOrFail({ where: { cpf: ordem.cpf } });
        return {
          ...ordem,
          usuario: {
            nome: usuario.nome
          },
        };
      }

      return null;
    } catch (error) {
      console.error('Erro ao selecionar ordem:', error);
      return null;
    }
  }

  async updateOrdem(id: number, body: {}) {
    try {
      await this.usuariosRepository.createQueryBuilder()
        .update(Ordens)
        .set(body)
        .where("id = :id AND deleted = false", { id: id })
        .execute();
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error);
    }
  }

  async deleteOrdem(id: number) {
    try {
      await this.usuariosRepository.createQueryBuilder()
        .update(Ordens)
        .set({ deleted: true, deletedAt: new Date() })
        .where("id = :id", { id: id })
        .execute();
    } catch (error) {
      console.error('Erro ao deletar ordem:', error);
    }
  }
  async getIdByCpf(cpf: string) {
    try {
      const user = await this.usuariosRepository.findOne({ where: { cpf }, select: ['id'] });
      return user ? user.id : null;
    } catch (error) {
      console.error('Error selecting user by cpf:', error);
      return null;
    }
  }
  async createOrdem(body: { cpf: string; aparelho: string; marca: string; modelo: string; problema: string }) {
    try {
      const user = await this.usuariosRepository.findOne({ where: { cpf: body.cpf } });
      if (!user) {
        throw new UnauthorizedException('CPF invalido');
      }
      await this.usuariosRepository.createQueryBuilder()
        .insert()
        .into(Ordens)
        .values({
          cpf: body.cpf,
          aparelho: body.aparelho,
          marca: body.marca,
          modelo: body.modelo,
          problema: body.problema,
          usuarioId: user.id,
        })
        .execute();
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      throw error;
    }
  }
  async updateAuthCode(userId: number, { codigoAtivo, authCodeExpiresAt }: { codigoAtivo: string; authCodeExpiresAt: number; }) {
    try {
      await this.usuariosRepository.update(userId, { codigoAtivo, validadeCodigoAtivo: new Date(authCodeExpiresAt) });
    } catch (error) {
      console.error('Error updating auth code:', error);
    }
  }
  async selectCode( authCode: string) {
    try {
      return await this.usuariosRepository.findOne({ where: { codigoAtivo: authCode } });
    } catch (error) {
      console.error('Error selecting code:', error);
      return null;
    }
  }
}



