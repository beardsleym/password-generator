const IpData = ({ipData}) => {
  const weather = ipData.openweather
  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
  const weatherAlt = weather.weather[0].description
  const temp_string = weather.main.temp_string


  return (  
    <div className="flex">
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs"><span>{ipData.emoji}</span> {ipData.ip}<span className="hidden sm:inline">, {ipData.asOrganization}</span></div>
      <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs relative">{ipData.city ? `${ipData.city} ` : ''} {temp_string}<img className="img-fluid h-7 absolute -bottom-1.5 right-0" src={weatherIcon} alt={weatherAlt} /></div>
      {/* <div className="text-gray-600 font-extralight flex-grow text-center font-mono text-xs">{ipData.platform}</div> */}
    </div>
  );
}
 
export default IpData;