if (window.module) module = window.module;


var useragent = "Mozilla/5.0 (Linux; NetCast; U) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.31 SmartTV/7.5"
var myBody = $("body")
myBody.append('<div id="cursor"></div>')

var myDoc = $(document);
var myStyler = $("#styler")
var myContent = $("#content")
myContent.append('<div id="appanim"></div>')
var isAOD = false
var myWindow = $(window)
var myApps = $("#apps")
var myCursor = $("#cursor")
var canrender = true
var pagecount = 1
var currentpage = 1
var appcount = 1
var mousekeyboard = false
var asyncqueue = 0
const singlequote = "'"
const doublequote = '"'
$.ajaxSetup({
    async: false
});
var clockinterval
myDoc.mousemove(function(e) {
    var mx, my
    my = e.pageY
    mx = e.pageX
    myCursor.css({ "top": my + "px", "left": mx + "px" });
});

function r1app() {
    var page = currentpage
    $("div.app").each(function() {
        var elem = $(this).first()
        var name = $(this).first().attr("name")
        elem.replaceWith('<app name="' + name + '"></app>')
    });
    var appinde = 0
    $("#apps app").slice(9 * (page - 1), (9 * (page - 1) + 9)).each(function() {
        var elem = $(this).first()
        var name = $(this).first().attr("name")
        var title
        appinde -= -1

        $.getJSON("apps/" + name + ".app/config.json", (data) => {
            title = data["displayname"];
        })
        if (String(title) == "undefined") {
            title = "Unknown"
        }
        //console.log(("<div " + 'id="' + appinde + '"' + 'name="' + name + '"title="' + title + '"class="app app' + appinde + '" style="' + 'background: url(' + singlequote + 'apps/' + name + '.app/icon.webp' + singlequote + ')' + '">' + "</div>"))
        $(this).replaceWith("<div " + 'id="' + appinde + '"' + 'name="' + name + '"title="' + title + '"class="app app' + appinde + '" style="' + 'background: url(' + singlequote + 'apps/' + name + '.app/icon.webp' + singlequote + ')' + '">' + "</div>");
        //$(this).replaceWith("<div " + 'name="' + name + '" class="app">' + "</div>");
    });
    $(".app").first().addClass("selected")
    myApps.removeClass("hidden");

    var sira = 0


    $(".app").each(function() {
        var elem = $(this).first()
        var posx = (sira % 3)
        var posy = Math.round((sira - 1) / 3)
            /*elem.css({
            "background-position-x": (0 - 70 - (posx * 220) + "px"),
            "background-position-y": (0 - 50 - (posy * 132) + "px")
 
        })*/
            //elem.html("pos: " + lefte);
        sira += 1
    });

}

function SetPageSelector(max, select) {
    var middle = 400
    var margin = 20
    var width = margin * (max - 1)
    var left = (middle) - (width / 2)
    var circle = "<circle class='identdots'/>"
    $("#pageident").html(circle.repeat(max))
    console.log("NOKTALAR HESAPLANDI " + max + "/" + select)
    $(".identdots").each(function(indexe) {
        var elem = $(this)
        if (indexe + 1 == select) {
            elem.css("fill", "white")
        }
        //console.log("base left is " + left + " and " + indexe + " goes to " + ((middle) - (width / 2) - (-margin * (indexe))))
        elem.css("cx", ((middle) - (width / 2) - (-margin * (indexe))))

    });
    return (left)
}

function RenderApps(page) {
    if (canrender) {
        canrender = false
        myApps.removeClass("wl wr")
        if (page < 1) {
            setTimeout(() => {
                myApps.addClass("wl")
                setTimeout(() => {
                    canrender = true
                }, 500);
            }, 0);
        } else if (page > pagecount) {
            setTimeout(() => {
                myApps.addClass("wr")
                setTimeout(() => {
                    canrender = true
                }, 500);
            }, 0);
        } else {
            currentpage = page
            myApps.addClass("hidden");
            setTimeout(() => {
                r1app()
                setTimeout(() => {
                    canrender = true
                }, 100);
            }, 100);
        }
    }
    appcount = $("#apps div").length
    pagecount = Math.ceil(appcount / 9)
        //console.log("app count is " + appcount)
    console.log($("#apps div").length)
    console.log(Math.ceil(appcount / 9))
    console.log("GÖNDERİLEN " + pagecount + "/" + currentpage)
    SetPageSelector(pagecount, currentpage)
}

function getJSONconfig(params, key) {
    var url = "apps/" + params + "/config.json"
    var rety = ""
    $.getJSON(url, (data) => {
        alert(String(JSON.stringify(data[(key)])))
        rety = (String(JSON.stringify(data[(key)])))
    }).done(url, (data) => {

        rety = (String(JSON.stringify(data[(key)])))
    })
    return (rety);
}

function ReadDir(url) {

}

function ResizeWindow() {
    var styles = ""
    var scalem = 1;
    if (window.innerHeight * 16 > window.innerWidth * 9) {
        scalem = window.innerWidth / 800
    } else {
        scalem = window.innerHeight / 450
    }
    $("#aodclock").css("transform", "scale(" + scalem + ")")
    $("#cursor").css("transform", "scale(" + scalem + ")")
        //console.log("scale " + scalem)
    myContent.css("transform", "scale(" + scalem + ")")
    styles += ".app{width:265px; height: 152px; margin-left:" + ((1550 - (5 * 265)) / 6) + "PX}"

    myStyler.html(styles)


}
myWindow.on("resize", function() {
    ResizeWindow();
});
$(window).on("load", function() {
    ResizeWindow();
    RenderApps(1);

    myBody.addClass("load")
});


function NumberToCode(params) {
    var str = "" + params
    var pad = "000"
    var ans = pad.substring(0, pad.length - str.length) + str
    return (ans)
}

function CodeToNumber(params) {
    return (parseInt(params, 10));
}
window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
});
$("#convert").click(function() {
    RenderApps(2);
    console.log("naber")
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

});

function IndexToPos(sira) {

    var posx = (sira % 3)
    var posy = Math.round((sira - 1) / 3)
    return [posx, posy]
}
$('body').on('keydown', function(e) {
    if (isAOD) {
        AOD(false);
    } else {
        if (e.key == "ArrowUp") {
            SendToXMB("Up", e);
        } else if (e.key == "ArrowDown") {
            SendToXMB("Down", e);
        } else if (e.key == "ArrowLeft") {
            SendToXMB("Left", e);
        } else if (e.key == "ArrowRight") {
            SendToXMB("Right", e);
        } else if (e.key == "Enter" || e.code == "Space") {
            SendToXMB("Enter", e);
        } else if (e.key == "Escape" || e.key == "Backspace" || e.key == "BrowserBack") {
            SendToXMB("Escape", e);
        } else if (e.key == "Home" || e.key == "BrowserHome") {
            SendToXMB("Home", e);
        } else {
            console.log("TUŞ DUYURUSU " + e.key)
            SendToXMB(e.key)
        }
    }
});
var menter, mescape
menter = true
mescape = true
$('body').on('keydown', function(e) {
    if (e.repeat) {
        e.preventDefault()
    }
    if (e.key == "Enter" || e.code == "Space") {
        if (menter) {
            SendToXMB("Enter0", e);
            menter = false
        }
    } else if (e.key == "Escape" || e.key == "Backspace" || e.key == "BrowserBack") {
        if (mescape) {
            SendToXMB("Escape0", e);
            mescape = false
        }
    }
});

$('body').on('keyup', function(e) {

    if (e.key == "Enter" || e.code == "Space") {
        SendToXMB("Enter1", e);
        menter = true
    } else if (e.key == "Escape" || e.key == "Backspace" || e.key == "BrowserBack") {
        SendToXMB("Escape1", e);
        mescape = true
    }
});
var navplace = "home"

function OpenApp(object) {
    var selectedapprn = object

    var name = selectedapprn.attr("name");

    $("#appanim").css('background', 'url("apps/' + name + '.app/splash.webp"), url("apps/' + name + '.app/icon.webp")')
    $("#appanim").addClass("shown")
    $("#apps").addClass("blur");
    var gourl = ""
    var customnav = false
        /*
                "fullscreen": true,             DEFAULT
                "screenratio": "16:9",          DEFAULT
                "pointer": false,               DEFAULT     
                "url": "index"                  DEFAULT
        */


    $.getJSON("apps/" + name + ".app/config.json", (data) => {
        gourl = data["window"]["url"];
        customnav = data["window"]["customnavigation"];

    }).done(function(data) {



        setTimeout(() => {
            if ($(".enter").length) {
                $("#loo").remove()
                if (gourl == "index.html") {
                    gourl = "apps/" + name + ".app/index.html"
                }
                myContent.append('<webview customNavigation="' + customnav + '" webpreferences="contextIsolation=false" id="loo" src="' + gourl + '" class="appview" id="' + selectedapprn.attr("name") + '" useragent="' + useragent + `" nodeintegration preload='${path.resolve("library/bundle/apppreload.js")}'></webview>`)
                var webview = document.getElementById('loo');


                //    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                var webview = document.getElementById('loo');
                webview.addEventListener('console-message', (e) => {
                    if (e.level == 0) {
                        console.log('FROM APP ', e.message)
                    } else if (e.level == 1) {
                        console.info('FROM APP ', e.message)
                    } else if (e.level == 2) {
                        console.warn('FROM APP ', e.message)

                    } else if (e.level == 3) {
                        console.error('FROM APP ', e.message)

                    }
                    if (e.message == "AppClose") {
                        TerminateApps();
                    }
                })

                var request = new XMLHttpRequest();
                request.open('GET', "library/bundle/apppreload.css", false); // `false` makes the request synchronous

                webview.addEventListener('dom-ready', function() {
                    //webview.executeJavaScript("window.addEventListener('beforeunload', function(e) {console.log('AppClose')});")


                    webview.insertCSS(request.responseText);
                    //webview.openDevTools()
                    setTimeout(() => {
                        webview.classList.add("loaded")
                        $("#appanim").addClass("loaded")
                        selectedapprn.addClass("loaded");
                    }, 500);
                });

            }
        }, 1000);



    })


}
var flyoutopen = false

function getsystemcontrol(name) {

    var request = new XMLHttpRequest();
    request.open('GET', "library/system/" + name + ".html", false); // `false` makes the request synchronous

    return request.responseText;

}



function shvalert(title, desc, button) {
    ResetFlyouts()
    flyoutopen = true
    var text = getsystemcontrol("apperror")
    var obj = text.replace("ALERT_TITLE", title).replace("ALERT_DESCRIPTION", desc).replace("ALERT_BUTTON", button);
    myContent.append("<div class='systemview' id='alert'>" + obj + "</div>");

    setTimeout(() => { $(".systemview").addClass("blurback") }, 1);
}

function TerminateApps(waitforclose) {
    $("#apps").removeClass("blur");

    $("#appanim").removeClass("loaded")
    $("#appanim").removeClass("shown")
    $("#loo").addClass("close")
    setTimeout(() => {
        $("#loo").remove()


    }, 500);
    $(".enter").removeClass("loaded enter")
    myApps.removeClass("backanim")
    navplace = "home"


}

function UrlExists(t) { var e = new XMLHttpRequest; return e.open("HEAD", t, !1), e.send(), 404 != e.status }
var switched = 0

function SendToXMB(msg, e) {

    if (flyoutopen) {
        if (msg == "Escape" && msg == "Enter") {
            TerminateApps()
        }
    } else if (mousekeyboard) {
        var mosx = SendMessage("GetMousePos")[0]
        var mosy = SendMessage("GetMousePos")[1]
    } else {
        if (switched > 0) {
            switched += 1
        }

        if (navplace == "home") {
            var selectedappindex = $(".selected")[0].id
            var yedekselect = selectedappindex

            $(".selected").removeClass("selected");
            var posit = IndexToPos(selectedappindex - 1)
            var posx = posit[0]
            var posy = posit[1]
                //console.log("neredeydiniz: x" + posx + " y" + posy)
            if (msg == "Up" && posy > 0) {
                selectedappindex -= 3
            } else if (msg == "Down" && posy < 2) {
                selectedappindex -= -3

            } else if (msg == "Right") {
                if (posx == 2) {
                    RenderApps(currentpage - -1)
                } else {
                    selectedappindex -= -1

                }
            } else if (msg == "Left") {
                if (posx == 0) {
                    RenderApps(currentpage - 1)
                } else {
                    selectedappindex -= 1

                }

            } else if (msg == "Enter0") {
                var selectedapprn = $("#" + selectedappindex).first()
                selectedapprn.addClass("pressing");
                switched = true
            } else if (msg == "Enter1") {
                if (switched) {
                    var selectedapprn = $("#" + selectedappindex).first()
                    selectedapprn.removeClass("pressing");

                    //console.log("OPENING APP")
                    navplace = "app"
                    selectedapprn.addClass("enter")
                    myApps.addClass("backanim")

                    OpenApp(selectedapprn)
                }

            }
            var sonuc = $("#" + selectedappindex)
            if (sonuc.length) {
                sonuc.addClass("selected")

            } else {
                $("#" + yedekselect).addClass("selected")
            }

        } else if (navplace == "app") {
            const mywebview = document.getElementById('loo');
            const appshown = $(mywebview).hasClass("loaded");
            if (msg == "Escape0") {
                if (appshown) {
                    if ($(mywebview).attr("customNavigation") == "true") {
                        mywebview.sendInputEvent({
                            type: 'keyDown',
                            keyCode: 'Escape'
                        });

                    } else {
                        TerminateApps()

                    }

                } else {
                    TerminateApps()
                }
                // 

            } else if (msg == "Escape1") {
                if ($(mywebview).attr("customNavigation") == "true") {
                    mywebview.sendInputEvent({
                        type: 'keyUp',
                        keyCode: 'Escape'
                    });
                }


            } else if (msg == "Up") {
                mywebview.sendInputEvent({
                    type: 'keyDown',
                    keyCode: 'Up'
                });
                mywebview.sendInputEvent({
                    type: 'keyUp',
                    keyCode: 'Up'
                });
            } else if (msg == "Down") {
                mywebview.sendInputEvent({
                    type: 'keyDown',
                    keyCode: 'Down'
                });
                mywebview.sendInputEvent({
                    type: 'keyUp',
                    keyCode: 'Down'
                });
            } else if (msg == "Right") {
                mywebview.sendInputEvent({
                    type: 'keyDown',
                    keyCode: 'Right'
                });
                mywebview.sendInputEvent({
                    type: 'keyUp',
                    keyCode: 'Right'
                });
            } else if (msg == "Left") {
                mywebview.sendInputEvent({
                    type: 'keyDown',
                    keyCode: 'Left'
                });
                mywebview.sendInputEvent({
                    type: 'keyUp',
                    keyCode: 'Left'
                });
            } else if (msg == "Enter0") {
                switched = false
                mywebview.sendInputEvent({
                    type: 'keyDown',
                    keyCode: 'Return'
                });
            } else if (msg == "Enter1") {
                mywebview.sendInputEvent({
                    type: 'keyUp',
                    keyCode: 'Return'
                });
            } else if (msg != "Enter") {
                mywebview.sendInputEvent({
                    type: 'keyUp',
                    keyCode: msg
                });
            }
        }



    }
}


/*function SendKey(key) {
    const webview = document.getElementById('loo');

    try {
        webview.sendInputEvent({
            type: 'keyDown',
            keyCode: key
        });
        webview.sendInputEvent({
            type: 'keyUp',
            keyCode: key
        });
    } catch (error) {
        console.log("Başarısız")
    }

}
*/

function ResetFlyouts() {
    flyoutopen = false
    $(".systemview").removeClass("blurback")
    $(".systemview").remove()
    clearTimeout(closetimeout);
}
var closetimeout

function CloseFlyouts() {
    flyoutopen = false
    $(".systemview").removeClass("blurback")
    closetimeout = setTimeout(() => {
        $(".systemview").remove()
    }, 1500);
}



/*
setInterval(() => {
    var canvas = document.getElementById('backo');
    var context = canvas.getContext('2d');
    var img = new Image;
    img.src = "wallpaper.jpg"

    context.drawImage(img, 0, 0, 300, 150)
    context.filter = "blur(" + 10 + "px)"
    var img = canvas.toDataURL("image/png");
    document.documentElement.style.setProperty('--backblur', "url(" + img + ")");

}, 1000);
*/
function SendMessage(msg) {
    return (ipcRenderer.sendSync('synchronous-message', msg))
}
/*
$("#blur").click(function() {
    console.log("naber")
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"



});
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
})
*/

function AOD(boole) {
    var answer
    if (boole) {
        myContent.addClass("aod")
        $("#aodclock").addClass("shown")
        answer = "aod on"
        isAOD = true
        clockinterval = setInterval(() => {
            time = new Date();
            $("#aodclock").html(time.toLocaleString())
        }, 100);
    } else {
        myContent.removeClass("aod")
        $("#aodclock").removeClass("shown")
        answer = "aod off"
        isAOD = false
        clearInterval(clockinterval)
    }
    return answer
}
var time