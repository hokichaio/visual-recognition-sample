'use strict';

var _watsonDeveloperCloud = require('watson-developer-cloud');

var _watsonDeveloperCloud2 = _interopRequireDefault(_watsonDeveloperCloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// filesystem を取り扱うライブラリ
var fs = require('fs');
// .envファイルを読むライブラリ
// watson のライブラリをimport
require('dotenv').config({ silent: true });

// watsonのapi cliecntをnew
var visualRecognition = new _watsonDeveloperCloud2.default.VisualRecognitionV3({
  api_key: process.env.VISUAL_RECOGNITION_API_KEY,
  version_date: '2015-05-19'
});

// apiに渡すイメージを用意
var params = {
  images_file: fs.createReadStream('sample.jpg')
};

// watsonのapiを叩く
visualRecognition.classify(params, function (err, res) {
  if (err) console.log(err); // エラーの場合はエラー内容をプリントする
  else console.log(JSON.stringify(res, null, 2)); // 結果を出力
});
