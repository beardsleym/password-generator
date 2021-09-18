const Sequences = ({feedback}) => {
  return ( 
    <div className="flex flex-wrap">
      {feedback.sequence.map((item, index) => (
        <div className="bg-gray-100 p-1.5 border-gray-200 border m-2 flex-grow max-w-xs" key={index}>
          <h5 className="bg-gray-500 text-white font-light text-center">{item.token}</h5>
          <p className="text-sm font-extralight">pattern: <span className="font-light">{item.pattern}</span></p>
          {item.reversed && <p className="text-sm font-extralight">reversed: <span className="font-light">{item.reversed ? 'true' : 'false'}</span></p>}
          {item.dictionary_name && <p className="text-sm font-extralight">dictionary_name: <span className="font-light">{item.dictionary_name}</span></p>}
          {item.matched_word && <p className="text-sm font-extralight">matched_word: <span className="font-light">{item.matched_word}</span></p>}
          {item.l33t && <p className="text-sm font-extralight">l33t: <span className="font-light">{item.l33t ? 'true' : 'false'}</span></p>}
          {item.l33t_variations && <p className="text-sm font-extralight">l33t_variations: <span className="font-light">{item.l33t_variations}</span></p>}
          {item.l33t_variations && <p className="text-sm font-extralight">l33t_variations: <span className="font-light">{item.l33t_variations}</span></p>}
          {item.uppercase_variations && <p className="text-sm font-extralight">uppercase_variations: <span className="font-light">{item.uppercase_variations}</span></p>}
          {item.sub_display && <p className="text-sm font-extralight">sub_display: <span className="font-light">{item.sub_display}</span></p>}
          {item.day && <p className="text-sm font-extralight">day: <span className="font-light">{item.day}</span></p>}
          {item.month && <p className="text-sm font-extralight">month: <span className="font-light">{item.month}</span></p>}
          {item.year && <p className="text-sm font-extralight">year: <span className="font-light">{item.year}</span></p>}
          {item.seperator && <p className="text-sm font-extralight">seperator: <span className="font-light">{item.seperator}</span></p>}
        </div>
      )
      )}
      </div>
   );
}
 
export default Sequences;