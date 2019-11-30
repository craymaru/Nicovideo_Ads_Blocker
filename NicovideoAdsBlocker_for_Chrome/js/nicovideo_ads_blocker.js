// Variables
var extentionsName = "[Nicovideo Ads Blocker]";

// DOM Detect Configuration
const configuration = {
  attributes: true,
  attributeFilter: ["src"],
  attributeOldValue: true,
  characterData: false,
  characterDataOldValue: false,
  childList: false,
  subtree: true
};

// DON Detects
console.log(extentionsName, "[START] MutationObserver is Running.");
var observer = new MutationObserver(function(mutations) {
  mutations.some(function(mutation) {
    console.log(extentionsName, "[DETECTED]", mutation);
    console.log(extentionsName, "[DETECTED] Type:", mutation.target.localName);
    if (
      mutation.type === "attributes" &&
      mutation.attributeName === "src" &&
      mutation.target.localName == "video"
    ) {
      console.log(extentionsName, "[DETECTED] Old:", mutation.oldValue);
      console.log(extentionsName, "[DETECTED] New:", mutation.target.src);
      if (mutation.target.src.length > 66) {
        const video = document.getElementsByTagName("video");
        video[1].src = "";
        video[2].src = "";
        console.log(extentionsName, "[BLOCK!] Clear the Video source!");
      } else {
        console.log(extentionsName, "[CLEAR] Not Ads.");
      }
      return true;
    }
    return false;
  });
}).observe(document.body, configuration);
