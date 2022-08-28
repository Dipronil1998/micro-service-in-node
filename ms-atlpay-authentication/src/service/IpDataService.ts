// import IPData from 'ipdata';
import axios from 'axios';
import {ipDataApiKey, ipDataApiUrl}
  from '../../config/bootstrap';

/**
 * @class
 * ipDataService
 */
export class IpDataService {
  /**
     * clientIpData Method
     * @param{string} ip
     */
  public async clientIpData(ip : string) {
    try {
      const ipDataResponce = await axios
          .get(ipDataApiUrl+ip+'?api-key='+ipDataApiKey);

      const ipdata = ipDataResponce.data;

      return ipdata;
    } catch (err: any) {
      return false;
    }
  }
}
