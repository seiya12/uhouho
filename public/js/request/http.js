
// axiosの基本請求するURL
axios.defaults.baseURL = 'https://api.gnavi.co.jp';

//axios請求する時間
axios.defaults.timeout = 10000;

//post 用のHeader
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


/**
 * Getメゾット
 * @param {String} url [請求するURL]
 * @param {Object} params [請求する際に引数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    });}



/**
 * postメゾット，APIに対するpost請求
 * @param {String} url [請求するURL]
 * @param {Object} params [請求する際に引数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}
