const IpData = ({ipData}) => {
  return (  
    <div className="flex">
      <div className="text-gray-600 font-extralight flex-1 text-center font-mono text-sm">ip: {ipData.ip}</div>
      <div className="text-gray-600 font-extralight flex-1 text-center font-mono text-sm">country: {ipData.country}</div>
      <div className="text-gray-600 font-extralight flex-1 text-center font-mono text-sm">platform: {ipData.platform}</div>
    </div>
  );
}
 
export default IpData;