/**
 * apiのインタフェースを管理する
 */

//
import { get, post } from './http.js'

export const apiSearch = p =>get('RestSearchAPI/v3/', p);

export const apiCategory = p =>get('master/CategoryLargeSearchAPI/v3/',p);

