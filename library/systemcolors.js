$("body").append("<style id=systemstyler></style>");
//kırk doksanaltı
var colors = "@media (prefers-color-scheme: light) {} @media (prefers-color-scheme: dark) {}    "
var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

function RecalculateBlur() {
    var thinblur, thickblur;
    var scalem = 1;
    if (window.innerHeight * 16 > window.innerWidth * 9) {
        scalem = window.innerWidth / 1600
    } else {
        scalem = window.innerHeight / 900
    }
    console.log(scalem + " ve " + window.innerHeight)

    var applystyle = ""
    applystyle += ".lightblur{background: rgba(255, 255, 255, 0.6);} .warmblur{background: rgba(255, 255, 255, 0.1);} .darkblur{background: rgba(0, 0, 0, 0.25);}"

    $("#systemstyler").html(applystyle);
}

RecalculateBlur();
$(window).on("resize", (function() { RecalculateBlur() }));