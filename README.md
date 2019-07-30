# ハッカソンのプロジェクト

お腹が空くWebサイト

## 料理提案サイト

### 概要

今日のメニューに困ったときに。その時の気分、人数、服の色等少し変わったアプローチで料理をご提案。

### 技術仕様

#### フロントエンド

* HTML
* CSS
  - Bootstrap
* JS
  - Vue.js
  
#### サーバサイド

* PHP


### 外部API仕様

* https://api.gnavi.co.jp/api/
* Google地図API（ Google　Map Javascript ）

### axiosの関数化

関数化ファイル（Get、Postのメソット）

```$xslt
js/request/http.js
```

外部のAPIのインタフェースの管理

```$xslt
js/request/api.js
```

書き方について

APIのURlを設定して

```$xslt
export const apiAddress = p => get('RestSearchAPI/v3/', p);
```

使う

```$xslt

import {apiAddress} from "./request/api.js";

//テスト用API通信
apiAddress({
    //API通信用のアプリキーを設定する
    //TODO::  これをAPI.jsと一緒にカプセル化したほうがいいですか？
    keyid:'＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊：',
    //お店の名前を検索する
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

```






