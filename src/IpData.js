const IpData = ({ipData}) => {
  const weatherIcon = `https://openweathermap.org/img/wn/${ipData.openweather.weather[0].icon}.png`
  const weatherAlt = ipData.openweather.weather[0].main

  return (  
    <div className="flex">
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.ip}<span className="hidden sm:inline">, {ipData.asOrganization}</span></div>
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.city ? `${ipData.city}, ` : ''} {ipData.emoji}, <img className="inline img-fluid" src={weatherIcon} alt={weatherAlt} /></div>
      {/* <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.platform}</div> */}
    </div>
  );
}
 
export default IpData;