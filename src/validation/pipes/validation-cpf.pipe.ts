import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateCpfPipe implements PipeTransform {
  transform(value: any) {
    let cpf = typeof value === 'string' ? value : value?.cpf;
    if(typeof cpf === 'number')
    {
      cpf = String(value.cpf)
    }
    console.log(typeof cpf);
    console.log(cpf);
    
    if (!cpf) {
        console.log('O CPF nao foi fornecido.');
      throw new BadRequestException('O CPF não foi fornecido.');
    }

    const sanitizedCpf = cpf.replace(/\D/g, '');
    console.log(sanitizedCpf); // Remove caracteres não numéricos

    if (!this.isValidCpf(sanitizedCpf)) {
        console.log('O CPF fornecido é inválido.');
      throw new BadRequestException('O CPF fornecido é inválido.');
    }
    console.log('value' +value);
    // Substitui o CPF original pelo CPF sanitizado
    if (typeof value === 'object' && value !== null) {
      value.cpf = sanitizedCpf;
    }
    console.log('value' + value);
    return value;
  }

  private isValidCpf(cpf: string): boolean {
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcDigit = (base: number) =>
      Array.from({ length: base }, (_, i) => +cpf[i] * (base + 1 - i))
        .reduce((sum, v) => sum + v) % 11 < 2
        ? 0
        : 11 - (Array.from({ length: base }, (_, i) => +cpf[i] * (base + 1 - i))
            .reduce((sum, v) => sum + v) % 11);

    return calcDigit(9) === +cpf[9] && calcDigit(10) === +cpf[10];
  }
}
