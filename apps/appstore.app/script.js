//ImportGlobalPackage("jquery");
$('body').on('keydown', function(e) {
    var selected = $(".focuspane .selected")
    var selectedindex = selected.index()
    var beforeindex = selectedindex

    var selectedpane = selected.parent()
    var paneitemcount = selectedpane.children("li").length
    if (e.key == "ArrowDown") {
        selectedindex += 1
    } else if (e.key == "ArrowUp") {
        selectedindex -= 1
    } else if (e.key == "ArrowRight") {

    } else if (e.key == "ArrowLeft") {

    } else if (e.key == "Enter") {
        selected.addClass("pressed")
    } else if (e.key == "Escape") {
        console.log("AppClose")
    }
    if (selectedindex < 1) {
        selectedindex = 1
    }
    if (selectedindex > paneitemcount) {
        selectedindex = paneitemcount
    }
    $("#settingslist2 ul").removeClass("focus")

    $("#settingslist2 ul").eq(selectedindex - 1).addClass("focus")
    selected.removeClass("selected");
    selectedpane.children().eq(selectedindex).addClass("selected")
    console.log(paneitemcount + "/" + selected.index())
    if (beforeindex != selectedindex) {
        selectedpane.stop()
        selectedpane.animate({ scrollTop: $(".focuspane .selected").position().top + $("#settingslist1").scrollTop() - 229 }, 500, $.bez([0.075, 0.82, 0.165, 1]));
    }

});
$('body').on('keyup', function(e) {
    if (e.key == "Enter") {
        $(".selected").removeClass("pressed")
    }
});
var pane1 = $("#settingslist1")
var pane2 = $("#settingslist2")
var scrollfocus = 0
pane2.scroll(function(event) {
    var count = 0
    var top = 0
    $("#settingslist2 .title").each(function() {
        var elem = $(this)
        if (elem.offset().top <= 0) {
            count += 1
            elem.css("opacity", "0")
        } else {
            elem.css("opacity", "1")
        }
        if (elem.offset().top < 60 && elem.offset().top > 0) {
            top = elem.offset().top - 60
        }
    });
    if (count > 0) {
        $("#scrolltitle2").css({
            "visibility": "visible",
            "top": top + "px"
        })
    } else {
        $("#scrolltitle2").css({
            "visibility": "hidden",
            "top": "0px"
        })
    }
})
pane1.scroll(function(event) {
    var count = 0
    var top = 0
    $("#settingslist1 li").each(function() {
        var elem = $(this).first()
            //elem.html(elem.offset().top + $("#settingslist1").scrollTop())
    });
    $("#settingslist1 .title").each(function() {
        var elem = $(this)
        if (elem.offset().top <= 100) {
            count += 1
            elem.css("opacity", "0")
        } else {
            elem.css("opacity", "1")
        }
        /*
                        if (elem.offset().top < 60 && elem.offset().top > 0) {
                            top = elem.offset().top - 60
                        }*/
    });
    if (count > 0) {
        $("#scrolltitle1").css({
            "visibility": "visible",
            "top": top + 110 + "px"
        })
    } else {
        $("#scrolltitle1").css({
            "visibility": "hidden",
            "top": "110px"
        })
    }
})