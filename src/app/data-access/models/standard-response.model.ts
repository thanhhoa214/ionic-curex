export type StandardResponse = { result: 'success' };

export interface StandardErrorResponse {
  result: 'error';
  'error-type': string;
}
