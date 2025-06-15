import * as bcrypt from 'bcrypt';

export function isHashed(password: string): boolean {
  return password.startsWith('$2a$') || password.startsWith('$2b$') || password.startsWith('$2y$');
}

export async function hashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error('Password is required');
  }

  if (isHashed(password)) {
    return password;
  }

  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}
