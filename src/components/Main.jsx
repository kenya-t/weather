import { useEffect, useState } from "react";
import styled from "styled-components";
import { Weather } from './Weather'
import { Map } from './Map'

export const Main = () => {
  const [latitude, setLatitude] = useState(0); //緯度
  const [longitude, setLongitude] = useState(0); //経度
  const [getWeatherFlag, setGetWeatherFlag] = useState(false);

  /**
   * 緯度緯度を更新
   */
  const getLatitude = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setGetWeatherFlag(true);
  }

  /**
   * 画面描画時
   */
  useEffect(() => {
  // 現在地を取得
  if( navigator.geolocation ){
    navigator.geolocation.getCurrentPosition(
      // [第1引数] 取得に成功した場合の関数
      function( position ){
          // 取得したデータの整理
          var data = position.coords;
          // データの整理
          var lat = data.latitude;
          var lng = data.longitude;
          getLatitude(lat, lng);
      },

      // [第2引数] 取得に失敗した場合の関数
      function( error ){
        // エラーコード(error.code)の番号
        // 0:UNKNOWN_ERROR				原因不明のエラー
        // 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
        // 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
        // 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

        // エラー番号に対応したメッセージ
        var errorInfo = [
            "原因不明のエラーが発生しました…。" ,
            "位置情報の取得が許可されませんでした…。" ,
            "電波状況などで位置情報が取得できませんでした…。" ,
            "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
        ];
        // エラー番号
        var errorNo = error.code;
        // エラーメッセージ
        var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ];
        // アラート表示
        alert( errorMessage );
      } ,
      // [第3引数] オプション
      {
        "enableHighAccuracy": false,
        "timeout": 8000,
        "maximumAge": 2000,
      }
    );
  }
  }, [])

  return (
    <>
      <Title>お天気アプリ</Title>
      <Content>
        <Weather
          latitude={latitude}
          longitude={longitude}
          getWeatherFlag={getWeatherFlag}
        />
        <Map />
      </Content>
    </>
  );
}
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 18px;
  width: 600px;
  margin: 40px auto 30px auto;
`;