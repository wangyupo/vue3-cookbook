const inBrowser = typeof window !== "undefined";
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);

if (isIE) {
  document.getElementById("top-loader").style.display = "none";
  document.getElementById("IEBrowser-tips").style.display = "block";
}
