<?php
/**
 * 回答結果に応じたキーワードを返す
 */
$happy = $_POST['happy'];
$people = $_POST['people'];

switch ($happy){
    case '楽しい':
        $point = 0;
        break;
    case '悲しい':
        $point = 1;
        break;
    case 'イライラ':
        $point = 2;
        break;
    case '疲れた':
        $point = 3;
        break;
}

switch ($people){
    case '1人':
        $point+=0;
        break;
    default:
        $point+=4;
}

$pattern = [
    ["居酒屋", "ラーメン・麺料理", "中華"],
    ["和食", "イタリアン・フレンチ", "居酒屋"],
    ["カフェ・スイーツ", "カレー", "ファミレス・ファーストフード"],
    ["オーガニック・創作料理", "カフェ・スイーツ", "洋食", "中華"],
    ["焼肉・ホルモン", "お好み焼き・粉物", "居酒屋", "鍋"],
    ["居酒屋", "ラーメン・麺料理", "すし・魚料理・シーフード"],
    ["焼き鳥・肉料理・串料理", "居酒屋", "中華"],
    ["中華", "居酒屋", "焼肉・ホルモン"]
];

$answerNum = $point;

require_once dirname(__FILE__) . '/../templates/result.html';
