
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
            //現在地の取得結構安定していないので、最初の場所全部大阪駅を設定します。
            this.geoAddress(this.geocoder,this.map,"大阪駅","大阪駅");
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
        geoAddress:async function(geoCoder,resultsMap,address,info){
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
                    });
                    that.markers.push(marker);
                }else {
                    alert(address+'Geocode was not successful for the following reason: ' + status);
                }
            });
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
    mounted() {
        
    }
});
