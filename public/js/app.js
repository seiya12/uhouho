import {apiAddress} from "./request/api.js";

//テスト用API通信
apiAddress({
    //API通信用のアプリキーを設定する
    //TODO::  これをAPI.jsと一緒にカプセル化したほうがいいですか？
    keyid:'9b5495f984dbf1bfaca72ae3c6036536',
    //料理屋の名前を検索する
    name:'ぐる'
}).then((res)=>{
    let itemArray = res.rest;
    let testArae = document.getElementById('test');
    itemArray.map((item)=>{
        console.log(item);
        let content = document.createElement('p');

        content.innerHTML = item.name;

        testArae.appendChild(content);
    });
});