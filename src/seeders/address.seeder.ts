import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Address } from '../database/entities/address.entity';
import { faker } from '@faker-js/faker';

export class AddressSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repo = dataSource.getRepository(Address);

    const estados = ['SP', 'RJ', 'MG', 'BA', 'RS', 'PR', 'SC', 'PE', 'DF', 'CE', 'GO', 'AM', 'PA'];

    const cidadesPorEstado = {
      SP: ['São Paulo', 'Campinas', 'Santos', 'São Bernardo do Campo', 'Guarulhos'],
      RJ: ['Rio de Janeiro', 'Niterói', 'Petrópolis', 'Duque de Caxias', 'Nova Iguaçu'],
      MG: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
      BA: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna'],
      RS: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Canoas'],
      PR: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
      SC: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó'],
      PE: ['Recife', 'Olinda', 'Jaboatão dos Guararapes', 'Caruaru', 'Petrolina'],
      DF: ['Brasília', 'Taguatinga', 'Ceilândia', 'Águas Claras', 'Gama'],
      CE: ['Fortaleza', 'Caucaia', 'Maracanaú', 'Sobral', 'Juazeiro do Norte'],
      GO: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia'],
      AM: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
      PA: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas'],
    };

    const bairros = [
      'Centro', 'Jardim Paulista', 'Moema', 'Pinheiros', 'Vila Mariana',
      'Lapa', 'Bela Vista', 'Santana', 'Tatuapé', 'Itaim Bibi',
      'Copacabana', 'Ipanema', 'Botafogo', 'Tijuca', 'Barra da Tijuca',
      'Savassi', 'Pampulha', 'Pituba', 'Ondina', 'Graças',
      'Boa Viagem', 'Asa Sul', 'Asa Norte', 'Aldeota', 'Meireles',
      'Moinhos de Vento', 'Cidade Baixa', 'Batel', 'Água Verde', 'Cristo Rei'
    ];

    const addresses: Address[] = [];

    for (let i = 0; i < 100; i++) {
      const estado = faker.helpers.arrayElement(estados);
      const cidade = faker.helpers.arrayElement(cidadesPorEstado[estado] as string[]);
      const bairro = faker.helpers.arrayElement(bairros);

      const address = new Address();
      address.postalCode = `${faker.string.numeric(5)}-${faker.string.numeric(3)}`;
      address.country = 'Brasil';
      address.state = estado;
      address.city = cidade;
      address.neighborhood = bairro;
      address.addressLine = faker.location.streetAddress();

      addresses.push(address);
    }

    await repo.save(addresses);
    console.log('500 endereços gerados com sucesso!');
  }
}
