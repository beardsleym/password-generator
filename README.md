# Password Generator and Strength Checker

### Video Demo: [YouTube](https://youtu.be/qb7mGbj2nzY)

## Description:

Password-generator is a basic React web application for generating secure, random passwords with the option of customising the length, the appearance of numbers, uppercase and lowercase letters and symbols.
The strength of the password is also checked and is shown in a range of colors from 0 - no color at all, through to 5 - green.
At the same time, the password is checked with [HaveIBeenPwned](https://haveibeenpwned.com/Passwords) to see if it is contained in any data breaches.
Because I'm obsessed with the weather and how I am seen online, a Cloudflare worker returns the users IP, City, Country and uses that information to lookup the current weather.

### Deployed at... [passwrd.pages.dev](https://passwrd.pages.dev)

## Get Started

### React

```language
cd src
yarn start
```

> Development server on localhost:3000

### Cloudflare workers

```language
cd wrangler
wrangler dev
wrangler secret put API_KEY  //Add secret
wrangler publish
```

> see wrangler.toml

### TailwindCSS

`tailwind.config.js` contains classes that are generated dynamically in application

### HaveIBeenPwned

Password breach is available on free API tier at [HaveIBeenPwned](https://haveibeenpwned.com/API/v3)

> In order to protect the value of the source password being searched for, Pwned Passwords also implements a k-Anonymity model that allows a password to be searched for by partial hash. This allows the first 5 characters of a SHA-1 password hash (not case-sensitive) to be passed to the API

### OpenWeather

[Openweather API](https://openweathermap.org/api) has 1,000,000 free monthly requests.
We use the users latitude and longitude to check the weather.
If the user is located in one of

- United States
- Bahamas
- Cayman Islands
- Liberia
- Palau
- The Federated States of Micronesia
- Marshall Islands

We request the data in imperial (Fahrenheit) otherwise we request it in metric (Celcius).

### ZXCVBN

> zxcvbn is a password strength estimator inspired by password crackers. Through pattern matching and conservative estimation, it recognizes and weighs 30k common passwords, common names and surnames according to US census data, popular English words from Wikipedia and US television and movies, and other common patterns like dates, repeats (aaa), sequences (abcd), keyboard patterns (qwertyuiop), and l33t speak.
> [ZXCVBN Github Repo](https://github.com/dropbox/zxcvbn)

### Niceware

> A JS library for generating random-yet-memorable passwords, either server-side in Node or in the browser. Each word provides 16 bits of entropy, so a useful password requires at least 3 words.

> Because the wordlist is of exactly size 2^16, Niceware is also useful for convert cryptographic keys and other sequences of random bytes into human-readable phrases. With Niceware, a 128-bit key is equivalent to an 8-word phrase.

#### usage in browser

```
<script src='niceware.js'></script>
<script>
  const passphrase = window.niceware.generatePassphrase(8)
</script>
```

### Generate-Password

> Generate Password is a (relatively) extensive library for generating random and unique passwords.

### Cloudflare Pages

This is currently deployed on [Pages](https://pages.cloudflare.com/)

#### Environment Variables

> Requires Node.js v14.x or later to build successfully. You must expand the Environment Variables (advanced) section and add a NODE_VERSION variable with a value of 14 or greater.
> `node_version = 14`

### Cloudflare Workers

The serverless function running IP data and getting Weather data is on [Workers](https://workers.cloudflare.com/)

```
cd wrangler
cp wrangler.toml.example wrangler.toml
```

Add `account_id`

> #### account_id required
>
> This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the zone_id you provide, if you provide one. It can also be specified through the CF_ACCOUNT_ID environment variable.

It is safe to commit `account_id` and `zone_id` as per this [Github issue](https://github.com/cloudflare/wrangler/issues/209#issuecomment-541654484)
