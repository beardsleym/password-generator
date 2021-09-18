addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Max-Age": "86400",
}
// COUNTRY CODE EMOJI
// Credit to: https://github.com/thekelvinliu/country-code-emoji
  // country code regex
  const CC_REGEX = /^[a-z]{2}$/i;

  // flag emoji use 2 regional indicator symbols, and each symbol is 2 chars
  const FLAG_LENGTH = 4;

  // offset between uppercase ascii and regional indicator symbols
  const OFFSET = 127397;

  /**
   * convert country code to corresponding flag emoji
   * @param {string} cc - country code string
   * @returns {string} flag emoji
   */
  const countryCodeEmoji = (cc) => {
    if (!CC_REGEX.test(cc)) {
      const type = typeof cc;
      throw new TypeError(
        `cc argument must be an ISO 3166-1 alpha-2 string, but got '${
          type === 'string' ? cc : type
        }' instead.`,
      );
    }
    const codePoints = [...cc.toUpperCase()].map(c => c.codePointAt() + OFFSET);
    return String.fromCodePoint(...codePoints);
  }

// WEATHER API CALL
async function fetchWeather (city = 'Singapore', country = 'SG', lat, lon) {
  try {
    //Check country for fahrenheit preference
    const imperialCountries = ['US','BS', 'KY', 'LR', 'PW','FM', 'MI']
    const units = imperialCountries.includes(country) ? 'imperial' : 'metric'
    let query = lat && lon ? `lat=${lat}&lon=${lon}` : `q=${city}`
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?${query}&units=${units}&appid=${OPENWEATHER_KEY}`
    const response = await fetch(endpoint)
    const content = await response.json()
    console.log(response.json())
    console.log(content.weather[0].main)
    console.log({endpoint})
    content.main.temp_string = `${content.main.temp.toFixed()}${imperialCountries.includes(country) ? '°F' : '°C'}`
    // Add some debugging headers to response
    const debug = { query, units, lat, lon, city, country }
    content.debug = debug
    return content
  } catch (error) {
    console.error(error)
    return error.message
  }
}

// MAIN FUCTION
async function handleRequest(request) {
  const openweather = await fetchWeather(request.cf?.city, request.cf?.country, request.cf?.latitude, request.cf?.longitude)
  const data =
    request.cf !== undefined ? {
        ...request.cf, //CF Headers
        ip: request.headers.get('cf-connecting-ip'),
        emoji: countryCodeEmoji(request.cf.country),
        platform: request.headers.get('sec-ch-ua-platform'),
        openweather //Weather API data
        } :
    { error: "The `cf` object is not available inside the preview.",
    openweather }

  delete(data.tlsClientAuth)
  delete(data.tlsExportedAuthenticator)

  const json = JSON.stringify(data, null, 2)

  return new Response(json, {
    headers: {
      ...corsHeaders,
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
    }
  })
}