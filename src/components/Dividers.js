const Dividers = ({color}) => {
  return ( 
    <div>
      <hr className={`mx-56 border-${color}-400`} />
      <hr className={`my-1 mx-36 border-${color}-400`} />
      <hr className={`my-1 mx-16 border-${color}-400`} />
      <hr className={`my-1 mx-36 border-${color}-400`} />
      <hr className={`mx-56 mb-4 border-${color}-400`} />
    </div>
  );
}
 
export default Dividers;