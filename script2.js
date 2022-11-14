let comm = [],
    game = 2,
    doWhileY = 0,
    newReset = 0;

// create a game structure for comm and user individually
const gameStructure = (x) => {
    let y = 0;
    $("#commBox").empty();
    for (let i = 0; i < x; i++) {
        let ra = $("<div>").addClass("row");
        for (let j = 0; j < x; j++) {
            y++;
            let ca = $("<button>").attr("id", `id${y}`).addClass("col btn btn-light btn-danger btn-lg m-2 gameButton").text(y).attr("value", y);
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
            let ca = $("<button>").attr("id", `idu${yd}`).addClass("col btn btn-light btn-danger btn-lg m-2 gameButton").text(yd).attr("value", yd).attr("onclick", "userGenerate(this)").attr("onmousedown", "mouseDown(this)").attr("onmouseup", "mouseUp(this)");
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

// user click to create an array
let userGenerate = (xx) => {
    comm.length - 1 != newReset ? comm[newReset] == xx.value ? newReset++ : newReset = 0 : comm[newReset] == xx.value ? (commGenerate(game), setTimeout(() => alertLoop(0), 1000), newReset = 0) : newReset = 0;
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
        setTimeout(() => {
            alertLoopTwo(i + 1);
        }, 2000);
    }
};

let alertLoop = (i) => {
    if (comm[i]) {
        alertLoopTwo(0);
        $(`#id${comm[i]}`).removeClass("btn-light");
        setTimeout(() => {
            alertLoop(i + 1);
        }, 2000);
    }
};

//  on click of ready button, start the game
let startGame = (x) => {
    comm.push(Math.floor(Math.random() * (x * x)) + 1);
    console.log(comm);
    gameStructure(x);
    commGenerate(x);
    setTimeout(() => alertLoop(0), 1000);
};

$("#readyButton").click(() => {
    startGame(game);
});