/**
 * OTP Generator class
 * @class
 * OtpGenerator
 */
export class OtpGenerator {
  /**
     * Random six digit OTP Generator
     * @param{number} length
     * @return{number} otp
     */
  public randomOtp = (length: number): number => {
    let index: number = 0;
    let otp: number = 0;
    for (index; index < length; index++) {
      otp = Math.floor(Math.random() * 900000) + 100000;
    }
    return otp;
  };
}
