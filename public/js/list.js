
import {apiCategory,apiSearch} from "./request/api.js";

new Vue({
    el:'#list',
    data:{
        //Info窓を表示しているかどうか
        currentInfoWindow:null,
        //Geocoderの変数
        geocoder:null,
        //地図
        map:null,
        //マークの配列
        //毎回検索したあと、この配列をクリアする
        markers:[],
        coordinates:[],
        categoryCode:null,
        restList:[],
        listScrollHeight:null
    },
    methods:{
        /**
         * 最初の地図を生成する
         *
         * @return {void}
         */
        initMap: function () {
            this.currentInfoWindow = null;
            //GeoCoderの初期化
            this.geocoder = new google.maps.Geocoder();
            //Mapの初期化
            this.map =  new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            });
        },
        /**
         *Geocode函数
         *
         * @param  {object} geoCoder        geoCoder
         * @param  {object}   resultsMap        目標の函数
         * @param  {string}  address   アドレス
         * @param  {string}  info   ホテル名前
         * @return {Void}             Geoしたマークを地図に表示
         */
        geoAddress:async function(geoCoder,resultsMap,address,info,id){
            //thisの変数を保存する、函数の中に、Thisが変わるから、いったんThatに保存します
            let that = this;
            //あげるアドレスにより、Geocoderして、結果を地図に保存する。
            geoCoder.geocode({'address':address},await function (result,status) {
                //新規Info窓
                let infowindow = new google.maps.InfoWindow;
                //Requestが成功した場合、
                if(status === google.maps.GeocoderStatus.OK){
                    resultsMap.setCenter(result[0].geometry.location);
                    that.coordinates.push(result[0].geometry.location);
                    let marker = new google.maps.Marker({
                        position:result[0].geometry.location,
                        icon:"http://maps.google.com/mapfiles/ms/micons/pink.png",
                        map:resultsMap
                    });
                    infowindow.setContent(info);

                    marker.addListener('click', function () {
                        if(that.currentInfoWindow){
                            that.currentInfoWindow.close()
                        }
                        that.currentInfoWindow = infowindow;
                        infowindow.open(map, marker);
                        that.map.setZoom(17);
                        that.map.setCenter(marker.getPosition());
                        that.btnClick(id);
                    });
                    that.markers.push(marker);
                }else {
                    alert(address+'Geocode was not successful for the following reason: ' + status);
                }
            });
        },
        btnClick(id){
            let scrollHeight = document.getElementById("list-box");
            let item  = document.getElementById(id);
            scrollHeight.scrollTo(0,item.offsetTop-250);
        },
        //XmlのStringからXmlのDOMを変更する
        getXmlDocumentByXmlString(xmlString) {
            let xmlDoc = null;
            if (window.DOMParser) {
                let parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlString, "text/xml");
            } else {
                //IE
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(xmlString);
            }
            return xmlDoc;
        },
    },
    async mounted() {
        let categoryName = document.getElementById("keyword").value;
        let that = this;

        await apiCategory({
            //API通信用のアプリキーを設定する
            //TODO::  これをAPI.jsと一緒にカプセル化したほうがいいですか？
            keyid:'7f73ef1ac20dd79a719725f2ab93a1a4',
            //料理屋の名前を検索する
            lang:'ja'
        }).then((res) =>{
            let categoryItem = res.category_l;
            categoryItem.map((item)=>{
                if(item.category_l_name == categoryName){
                    that.categoryCode = item.category_l_code;
                }
            })
        });

        await apiSearch({
            keyid:'7f73ef1ac20dd79a719725f2ab93a1a4',
            category_l:this.categoryCode,
            areacode_s:'AREAS3102'
        }).then((res)=>{
            let restArrayData = res.rest;
            restArrayData.map((item)=>{
                that.restList.push(item);
            })
        });
        this.initMap();
        this.restList.map((item)=>{
            this.geoAddress(this.geocoder,this.map,item.address,item.name,item.id);
        });
        this.listScrollHeight = document.getElementById("list").scrollHeight;
    }
});
