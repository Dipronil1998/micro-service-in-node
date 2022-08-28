import randomstring from 'randomstring';

/**
 * GenerateTocken
 * @class
 */
export class GenerateToken {
  /**
     * Generate Token method
     * @return{string} token
     * @param{number} length
     */
  public generateRandomToken(length: number): string {
    const token: string = randomstring.generate({
      length: length,
      charset: 'alphanumeric',
    });
    return token;
  }
}
