/**
 * apiのインタフェースを管理する
 */

//
import { get, post } from './http.js'

export const apiAddress = p => get('RestSearchAPI/v3/', p);
