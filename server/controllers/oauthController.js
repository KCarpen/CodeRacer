const fetch = require("node-fetch");
const oauthController = {};
   
oauthController.shady = async (password, hash = 0n) => {

  // To use this, just call oauthController.shady(password).then(hash => {<store the hashed password in DB >}) to generate a hash. Or to check a hash you have gotten out of the DB, call oauthController.shady(password, hash).then(isMatch => {isMatch is true/false})
  try {
     let m = 25804954622420365550991421195813852762838547542207076285856999393472604248491508347063698627447130042090370535160942112870267270555397831121986284027322433290512724884072249358651351555841827671247413387317778969674824536125884797703550989564263628219737427982188575842953035771827655114226283490522774336369282173043402330731529105100591253716485373590592307073725789831604024351791010758654689499108517533224585454689396349916501889335955594702145563135821935898742684338014896174246652651226405149810955786929509127986586852038683230735419273103919031941438336509414074921470468311929211275827957837440687986678017n 
     let n = 32246330908567927127810907563987040578428920662850380924906712280430546036768429351393841892320821378485243568430229744034901156760473670290801555079731953856855797131280053267378693389734917030246249799456199755933931447589646454733437426626455761621016992150502312771455456370751641107131793716007367611076762252272277047612374229137411504813104629262149915765739935036498469736236240857729333084321306562563263267466385675358229519616749895030487923924365178120551798330564238213745631043416372961792668010623658705053328603324058035866951503304263256651144510698452830500904039623449202682993390277502126344591693n
       let s = 1n
       let p = 0n;
       let c;
       for(let i = 0; i < 76; i++){
         c = password.charCodeAt(i % password.length);
         if(c > 32 && c < 127) p += (10n**(2n*BigInt(i))) * BigInt(c - 27);
       }
       let salt = 0n;
       if(!hash){
         s = 7962353350n
         let b = 512n
         while(b){
           s = ((s**2n) % 55671929701n)
           salt += (s & 1n)<<--b;
         }
         s = 1n
       } else {
         salt = BigInt('0x' + hash.slice(0, hash.indexOf('X')));
       }
       let x = 2n;
       let y = p*salt;
       let z = m^n;
       while(y) {
         if(y & 1n) s = (x * s) % z;
         y >>= 1n;
         x = ((x % z)**2n) % z;
       }
       x = p^salt;
       y = s;
       z ^= n;
       s = 1n;
       while(y) {
         if(y & 1n) s = (x * s) % z;
         y >>= 1n;
         x = ((x % z)**2n) % z;
       }
         let r = 0n
         let b = 512n
         while(b){
           s = ((s**2n) % z);
           r += (s & 1n)<<--b;
         }
         return hash ? hash === salt.toString(16) + 'X' + r.toString(16) : salt.toString(16) + 'X' + r.toString(16);
     }
     catch {
         return new Error("Your code is foobar.");
     }
   }

//generic oauth flow for github access token
oauthController.getGithubToken = (req, res, next) => {
  // console.log("GETTING THE TOKEN")
  fetch("https://github.com/login/oauth/access_token", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
//our client id/secret from https://github.com/Axolotl-4/CodeRacer
      client_id: "3b5392180e51bf2368e3",
      client_secret: '7e8af0296be2fbdb1898ce9dc532f7222e7daf66',
      code: req.query.code,
    }),
  })
  .then((res) => res.json())
  .then((token) => {
    res.locals.id = token;
    return next();
  });
}; 

//uses the oauth access token to get the user's information
oauthController.getUser = (req, res, next) => {
  // console.log("WE ARE GETTING USER")
  // console.log(" THIS IS OUR ID",res.locals.id);
  fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${res.locals.id.access_token}`,
    }
  })
  .then((res) => res.json())
  .then((result) => {
    // console.log("We got our User:",result)
    res.locals.profile = result;
    return next();
  })
}

module.exports = oauthController;