# SPA podcatcher

## App features:
- subscribe to podcasts and have them listed in a feed
- clicking on the podcast will reveal the podcast info, along with a list of episodes
- will indicate if the podcast has been played
- save playback position
- make playlists

## Backend stuff: 

#### Handling the sourcing of podcasts:
1. To start with, UI will have a podcast search box. Rails API will take a query string, and send it to iTunes API, which takes a query like so: `"https://itunes.apple.com/search?entity=podcast&term=#{params[:term]}"`
2.  I'll build the JSON response into a hash with the info I want (podcast description, title, publisher), with the URL for the XML podcast feed being a key component.
3.  [Crack](https://github.com/jnunemaker/crack) gem will be used to convert XML into JSON, and I'll recursively pull out `items` keys, whose nested values represent episode info: title, description, length, and, crucially, the link to the mp3 file.

## Front end stuff:

Front end will be **React** views managed with a **Flux** architecture/flow/philosophy. A lot of ways to skin that cat. I'll most likely use Facebook's Dispatcher and Node's EventEmitter. Researching if I want to incorporate that with a gem, or use npm to pack it myself.

**That's it so far! I've started construction of that Rails API I mentioned. Stay tuned—I'll update my gameplan as I go along.**