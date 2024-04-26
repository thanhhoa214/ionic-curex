import { StandardResponse } from './standard-response.model';

export interface SupportedCodesResponse extends StandardResponse {
  documentation: string;
  terms_of_use: string;
  /**
   * An array of supported currency codes.
   * Each item: [code, description]
   **/
  supported_codes: [string, string][];
}
