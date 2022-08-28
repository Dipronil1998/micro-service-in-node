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
     */
  public async clientIpData() {
    try {
      const ipDataResponce = await axios
          .get(ipDataApiUrl + ipDataApiKey);

      const ipdata = ipDataResponce.data;
      return ipdata;
    } catch (err: any) {
      return false;
    }
  }
}
