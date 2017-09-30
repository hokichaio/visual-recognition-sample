// watson のライブラリをimport
import watson from 'watson-developer-cloud'
// filesystem を取り扱うライブラリ
const fs = require('fs')
// .envファイルを読むライブラリ
require('dotenv').config({silent: true})

// watsonのapi cliecntをnew
const visualRecognition = new watson.VisualRecognitionV3({
  api_key: process.env.VISUAL_RECOGNITION_API_KEY,
  version_date: '2015-05-19',
});

// apiに渡すイメージを用意
let params = {
  images_file: fs.createReadStream('sample.jpg'),
};

// watsonのapiを叩く
visualRecognition.classify(params, (err, res) => {
  if (err)
    console.log(err) // エラーの場合はエラー内容をプリントする
  else
    console.log("=========== classify API ===========\n", JSON.stringify(res, null, 2)) // 結果を出力
});

// 結果のサンプル
// {
//   "custom_classes": 0,
//   "images": [
//     {
//       "classifiers": [
//         {
//           "classes": [
//             {
//               "class": "Chihuahua dog", // カテゴリ名
//               "score": 0.944, // 確度
//               "type_hierarchy": "/animal/domestic animal/dog/small dog/Chihuahua dog"
//             },
//             {
//               "class": "small dog",
//               "score": 0.961
//             },
//             {
//               "class": "dog",
//               "score": 0.962
//             },
//             {
//               "class": "domestic animal",
//               "score": 0.962
//             },
//             {
//               "class": "animal",
//               "score": 0.962
//             },
//             {
//               "class": "ivory color",
//               "score": 0.714
//             },
//             {
//               "class": "light brown color",
//               "score": 0.6
//             }
//           ],
//           "classifier_id": "default",
//           "name": "default"
//         }
//       ],
//       "image": "sample.jpg"
//     }
//   ],
//   "images_processed": 1
// }


// 顔認識API
// apiに渡すイメージを用意
params = {
  images_file: fs.createReadStream('obama.jpg'),
};

// watsonのapiを叩く
visualRecognition.detectFaces(params, (err, res) => {
  if (err)
    console.log(err) // エラーの場合はエラー内容をプリントする
  else
    console.log("=========== 顔認識 API ===========\n", JSON.stringify(res, null, 2))
});

// 結果のサンプル
// {
//   "images": [
//     {
//       "faces": [
//         {
//           "age": {
//             "max": 54, // 推測年齢最大値
//             "min": 45, // 推測年齢最小値
//             "score": 0.406227
//           },
//           "face_location": { //顔の位置
//             "height": 324,
//             "left": 105,
//             "top": 87,
//             "width": 264
//           },
//           "gender": {
//             "gender": "MALE", // 性別
//             "score": 0.993307
//           },
//           "identity": {
//             "name": "Barack Obama", // 人まで特定できそうだ, 有名人じゃないとここは出てこない
//             "score": 0.880797,
//             "type_hierarchy": "/people/politicians/democrats/barack obama"
//           }
//         }
//       ],
//       "image": "obama.jpg"
//     }
//   ],
//   "images_processed": 1
// }

