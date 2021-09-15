import { countryCodeEmoji } from "country-code-emoji";

const IpData = ({ipData}) => {
  return (  
    <div className="flex">
      <div className="text-gray-600 font-extralight flex-1 text-center font-mono text-xs">{ipData.ip}</div>
      <div className="text-gray-600 font-extralight flex-1 text-center font-mono text-xs">{ipData.city}, {countryCodeEmoji(ipData.country)}</div>
      <div className="text-gray-600 font-extralight flex-1 text-center font-mono text-xs">{ipData.platform}</div>
    </div>
  );
}
 
export default IpData;