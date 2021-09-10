const StrengthMeter = ({score, color}) => {
  return ( 
    <div className="grid grid-cols-4 gap-1 px-2 py-1">
      {score === 0 && <div className={`rounded border-b-8 border-white`}></div>}
      {score > 0 && <div className={`rounded border-b-8 border-${color}-400`}></div>}
      {score > 1 && <div className={`rounded border-b-8 border-${color}-400`}></div>}
      {score > 2 && <div className={`rounded border-b-8 border-${color}-400`}></div>}
      {score > 3 && <div className={`rounded border-b-8 border-${color}-400`}></div>}
    </div>
   );
}
 
export default StrengthMeter;