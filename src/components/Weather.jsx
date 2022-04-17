import { useEffect, useState } from "react";
import classes from '../style/Style.module.css'

export const Weather = (props) => {
  const { latitude, longitude, getWeatherFlag } = props;
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nowDate, setNowDate] = useState("");

  /**
   * 画面描画時
   */
  useEffect(()=>{
    //経度緯度取得後
    if(getWeatherFlag){
      //天気情報取得
      fetch(`${process.env.REACT_APP_OW_API_URL}/weather/?lat=${latitude}&lon=${longitude}&lang=ja&appid=${process.env.REACT_APP_OW_API_KEY}&units=metric`)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result);
        setLoading(true);
        console.log(result);
      });

      //現在時刻取得
      const date = new Date();
      setNowDate(date.toLocaleString())
    }
  },[getWeatherFlag]);

  return (
    <div className={classes.weatherArea}>
      <div>
        {loading
          ?
          <>
            <div className={classes.days}>取得日時: {nowDate}</div>
            <div className={classes.nowPlace}>現在地: {weatherData.name}</div>
            <div className={classes.nowPlace}>体感温度: {weatherData.main.feels_like}</div>
            <div className={classes.nowPlace}>気温: {weatherData.main.temp}</div>
            <div className={classes.nowPlace}>最高気温: {weatherData.main.temp_max}</div>
            <div className={classes.nowPlace}>最高気温: {weatherData.main.temp_min}</div>
            <div className={classes.nowPlace}>湿度: {weatherData.main.humidity}%</div>
            <div className={classes.nowPlace}>気圧: {weatherData.main.pressure}hPa</div>
          </>
          :
          <div>取得中......</div>
        }
      </div>
    </div>
  );
}