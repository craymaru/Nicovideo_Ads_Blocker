/* -------------------------\
|   Nicovideo Ads Blocker   |
|   Version: 3.1.2          |
\--------------------------*/

// VARIABLES
var extName = "[Nicovideo Ads Blocker]";

console.log(extName, "[START] MutationObserver is Running.");

// DOM " MutationObserver " CONFIGRATION
const configuration = {
  attributes: true,
  attributeFilter: ["src"],
  attributeOldValue: true,
  characterData: false,
  characterDataOldValue: false,
  childList: false,
  subtree: true
};

// DETECT DOM <* src=""> CHANGES
var observer = new MutationObserver(function(mutations) {
  mutations.some(function(mutation) {
    console.log(extName, "[DETECTED]", mutation);
    console.log(extName, "[DETECTED] (TYPE) TAG:", mutation.target.localName);
    // DIVIDE <video src="">
    if (mutation.type === "attributes" && mutation.attributeName === "src" && mutation.target.localName == "video") {
      // COMPARE NEW and OLD
      console.log(extName, "[DETECTED] (OLD) SRC:", mutation.oldValue);
      console.log(extName, "[DETECTED] (NEW) SRC:", mutation.target.src);
      // DIVIDE by URL-LENGTH -- <video src="any-url-length">
      if (mutation.target.src.length > 66) {
        // GET EXIST DOM ELEMENTS
        const videoSrcs = document.getElementsByTagName("video");
        console.log(extName, "[DETECTED] There is", videoSrcs.length, "video element(s).");
        // BLOCKS forEach.call
        Array.prototype.forEach.call(videoSrcs, function(value, index) {
          if (index != 0) {
            // BLOCK!
            console.log(extName, "[BLOCK!]", index, "of", videoSrcs.length, ": Maybe this is the Ads.", value);
            videoSrcs[index].src = "";
          } else {
            // SKIP First-time
            console.log(extName, "[SKIP..]", index, "of", videoSrcs.length, ": This is the main video.", value);
          }
        });
        // ALL BLOCKED!
        console.log(extName, "[ALL BLOCKED!] Clear the all video sources!");
      } else {
        // NO ADS
        console.log(extName, "[CLEAR] Not Ads.");
      }
      return true;
    }
    return false;
  });
}).observe(document.body, configuration);
