let comm = [],
    game = 3,
    doWhileY = 0,
    newReset = 0,
    lightTimer = null,
    redTimer = null,
    timer = 1000,
    textShow = false,
    colors = ['primary', 'success', 'danger', 'warning', 'info', 'success', 'primary', 'danger', 'info', 'warning', 'danger', 'info', 'primary', 'success', 'warning', 'danger'];
$("#userBox").hide();

// create a game structure for comm and user individually
const gameStructure = (x) => {
    let y = 0;
    $("#commBox").empty();
    for (let i = 0; i < x; i++) {
        let ra = $("<div>").addClass("row");
        for (let j = 0; j < x; j++) {
            y++;
            let ca = $("<button>").attr("id", `id${y}`).addClass(`col btn btn-light btn-${colors[y]} btn-lg py-5 m-2 gameButton border-${colors[y]}`).text(textShow ? y : ` `).attr("value", y);
            ra.append(ca);
        }
        $("#commBox").append(ra);
    }

    let yd = 0;
    $("#userBox").empty();
    for (let i = 0; i < x; i++) {
        let ra = $("<div>").addClass("row");
        for (let j = 0; j < x; j++) {
            yd++;
            let ca = $("<button>").attr("id", `idu${yd}`).addClass(`col btn btn-light btn-secondary btn-lg py-5 m-2 gameButton border-${colors[yd]}`).text(textShow ? yd : ` `).attr("value", yd).attr("onclick", "userGenerate(this)").attr("onmousedown", "mouseDown(this)").attr("onmouseup", "mouseUp(this)");
            ra.append(ca);
        }
        $("#userBox").append(ra);
    }
};

// comm generate random array
let commGenerate = (x) => {
    // do while added to make sure not repeating same number at the last generated
    do {
        doWhileY = Math.floor(Math.random() * (x * x));
    } while (comm[comm.length - 1] == doWhileY + 1);
    comm.push(doWhileY + 1);
    console.log(comm);
};

// mousedown and mouseup
let mouseDown = (xx) => {
    $(`#idu${xx.value}`).removeClass("btn-light");
}

let mouseUp = (xx) => {
    $(`#idu${xx.value}`).addClass("btn-light");
}

// alterloop for setTimeout to visible numbers
let alertLoopTwo = (i) => {
    
    if (comm[i]) {
        $(`#id${comm[i]}`).addClass("btn-light");
        lightTimer = setTimeout(() => {
            alertLoopTwo(i + 1);
        }, timer);
    }
if (i === comm.length) {
    $("#commBox").hide();
    $("#userBox").show();
    }
};

let alertLoop = (i) => {
    
    if (comm[i]) {
        alertLoopTwo(0);
        $(`#id${comm[i]}`).removeClass("btn-light");
        redTimer = setTimeout(() => {
            alertLoop(i + 1);
        }, timer);
    }
};

// show and hide user 

//  on click of ready button, start the game
let startGame = (x) => {
    comm.push(Math.floor(Math.random() * (x * x)) + 1);
    gameStructure(x);
    commGenerate(x);
    setTimeout(() => alertLoop(0), 1000);
};

$("#readyButton").click(() => {
    startGame(game);
    $("#readyButton").hide();
});

// user click to create an array
let userGenerate = (xx) => {
    comm.length - 1 != newReset ? comm[newReset] == xx.value ? (newReset++) : location.reload() : comm[newReset] == xx.value ? ($("#commBox").show(), $("#userBox").hide(), commGenerate(game), setTimeout(() => alertLoop(0), 500), newReset = 0) : location.reload();
};