const IpData = ({ipData}) => {
  const weather = ipData.openweather
  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
  const weatherAlt = weather.weather[0].description
  const temp_string = weather.main.temp_string


  return (  
    <div className="flex">
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs pt-1.5"><span>{ipData.emoji}</span> {ipData.ip}<span className="hidden sm:inline">, {ipData.asOrganization}</span></div>
      {/* <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.platform}</div> */}
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.city ? `${ipData.city} ` : ''} {temp_string}<img className="h-7 inline-block" src={weatherIcon} alt={weatherAlt} /></div>
    </div>
  );
}
 
export default IpData;