let comm = [],
    game,
    doWhileY = 0,
    newReset = 0,
    lightTimer = null,
    redTimer = null,
    timer = 1e3,
    textShow = !1,
    highScore = 0,
    score = 0,
    colors = ["primary", "success", "danger", "warning", "info", "primary", "info", "success", "danger", "secondary", "warning", "primary", "info", "danger", "success", "secondary", "warning"];
$("#highScoreValue").hide();
$("#readyButton").hide();

let boxValueFunction = (x) => {
    game = x.value;
    $("#readyButton").show();
    $("#boxPattern").hide();
};
$(document).ready(() => {
    let e = $("<div>").attr("id", "commBox").hide(),
        t = $("<div>").attr("id", "userBox").hide();
    $("#mainSection").append(e).append(t),
        null != localStorage.getItem("highScore_Memory-Game") ? (highScore = localStorage.getItem("highScore_Memory-Game")) : localStorage.setItem("highScore_Memory-Game", highScore),
        $("#highScore").text(highScore);
});
const gameStructure = (e) => {
    let t = 0;
    $("#commBox").empty();
    for (let o = 0; o < e; o++) {
        let o = $("<div>").addClass("row");
        for (let r = 0; r < e; r++) {
            t++;
            let e = $("<button>")
                .attr("id", `id${t}`)
                .addClass(`col btn btn-light btn-${colors[t]} btn-lg py-3 m-1 gameButton border-${colors[t]} border-3`)
                .text(textShow ? t : " ")
                .attr("value", t);
            o.append(e);
        }
        $("#commBox").append(o);
    }
    let o = 0;
    $("#userBox").empty();
    for (let t = 0; t < e; t++) {
        let t = $("<div>").addClass("row");
        for (let r = 0; r < e; r++) {
            o++;
            let e = $("<button>")
                .attr("id", `idu${o}`)
                .addClass(`col btn btn-light btn-secondary btn-lg py-3 m-1 gameButton border-${colors[o]} border-3`)
                .text(textShow ? o : " ")
                .attr("value", o)
                .attr("onclick", "userGenerate(this)")
                .attr("onmousedown", "mouseDown(this)")
                .attr("onmouseup", "mouseUp(this)");
            t.append(e);
        }
        $("#userBox").append(t);
    }
};
let rct,
    act,
    ft,
    commGenerate = (e) => {
        do {
            doWhileY = Math.floor(Math.random() * (e * e));
        } while (comm[comm.length - 1] == doWhileY + 1);
        comm.push(doWhileY + 1);
    },
    mouseDown = (e) => {
        $(`#idu${e.value}`).removeClass("btn-light");
    },
    mouseUp = (e) => {
        $(`#idu${e.value}`).addClass("btn-light");
    },
    timeFunction = () => {
        for (let e = 0; e < comm.length; e++)
            (rct = setTimeout(() => {
                $(`#id${comm[e]}`).removeClass("btn-light");
            }, timer * (e + 1))),
                (act = setTimeout(() => {
                    $(`#id${comm[e]}`).addClass("btn-light");
                }, timer * (e + 2)));
        ft = setTimeout(() => {
            $("#commBox").hide(), $("#userBox").show(), clearTimeout(rct), clearTimeout(act);
        }, timer * (comm.length + 1));
    },
    startGame = (e) => {
        comm.push(Math.floor(Math.random() * (e * e)) + 1), gameStructure(e), commGenerate(e), timeFunction();
        $("#highScoreValue").show();
    };
$("#readyButton").click(() => {
    $("#commBox").show(), startGame(game), $("#readyButton").hide();
});
let userGenerate = (e) => {
    clearTimeout(ft);
    let t = localStorage.getItem("highScore_Memory-Game");
    comm.length - 1 != newReset
        ? comm[newReset] == e.value
            ? newReset++
            : location.reload()
        : comm[newReset] == e.value
        ? ($("#commBox").show(),
          $("#userBox").hide(),
          commGenerate(game),
          setTimeout(() => timeFunction(), 500),
          (newReset = 0),
          score++,
          t < score && (localStorage.setItem("highScore_Memory-Game", score), (highScore = score)),
          $("#highScore").text(highScore),
          (timer = timer - 20))
        : location.reload();
};
