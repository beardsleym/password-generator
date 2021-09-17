const IpData = ({ipData}) => {
  const weather = ipData.openweather
  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
  const weatherAlt = weather.weather[0].main
  const temp = `${weather.main.temp.toFixed(0)}°C`


  return (  
    <div className="flex">
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.ip}<span className="hidden sm:inline">, {ipData.asOrganization}</span></div>
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.city ? `${ipData.city} ` : ''}<span>{ipData.emoji}</span></div>
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs relative">{temp}<img className="hidden sm:inline img-fluid h-7 absolute -bottom-1 right-5" src={weatherIcon} alt={weatherAlt} /></div>
      {/* <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.platform}</div> */}
    </div>
  );
}
 
export default IpData;