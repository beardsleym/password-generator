const GuessTimes = ({feedback}) => {
  return ( 
    <table className="table-fixed m-2">
      {/* <thead>
        <tr>
          <th className="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">Title</th>
          <th className="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">Author</th>
          <th className="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">Views</th>
        </tr>
      </thead> */}
      <tbody className="">
        <tr>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-extralight w-1/4">100 / hour:</td>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-light text-center w-1/3">{feedback.crack_times_display.online_throttling_100_per_hour}</td>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-extralight w-1/2">throttled online attack</td>
        </tr>
        <tr className="">
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-extralight">10 / second:</td>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-light text-center">{feedback.crack_times_display.online_no_throttling_10_per_second}</td>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-extralight">unthrottled online attack</td>
        </tr>
        <tr>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-extralight">10k / second:</td>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-light text-center">{feedback.crack_times_display.offline_slow_hashing_1e4_per_second}</td>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-extralight">offline attack, slow hash</td>
        </tr>
        <tr>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-extralight">10B / hour:</td>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-light text-center">{feedback.crack_times_display.offline_fast_hashing_1e10_per_second}</td>
          <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2 font-extralight">offline attack, fast hash</td>
        </tr>
      </tbody>
    </table>
   );
}
 
export default GuessTimes;