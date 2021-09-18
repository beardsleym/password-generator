const IpData = ({ipData}) => {
  let weatherIcon;
  let weatherAlt;
  let temp_string;

  if(ipData.openweather) {
    weatherIcon = `https://openweathermap.org/img/wn/${ipData.openweather.weather[0].icon}.png`|| null
    weatherAlt = ipData.openweather.weather[0].description || null
    temp_string = ipData.openweather.main.temp_string || ''
  }
  
  return (  
    <div className="flex">
      {ipData.ip && <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs pt-1.5"><span>{ipData.emoji}</span> {ipData.ip}<span className="hidden sm:inline">, {ipData.asOrganization}</span></div>}
      {/* <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.platform}</div> */}
      {ipData.openweather && <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.city ? `${ipData.city} ` : ''} {temp_string}<img className="h-7 inline-block" src={weatherIcon} alt={weatherAlt} /></div>}
    </div>
  );
}
 
export default IpData;