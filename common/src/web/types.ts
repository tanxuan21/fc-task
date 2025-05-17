export enum HTTPErrorCode {

}
export type HTTPSuccess = {
    success: true,
} | {
    success: false,
    error_code: HTTPErrorCode,
}