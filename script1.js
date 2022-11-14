const gameStructure = (x) => {
    let y = 0,
        yd = 0;
    $("#box").empty();
    for (let i = 0; i < x; i++) {
        let ra = $("<div>").addClass("row");
        for (let j = 0; j < x; j++) {
            y++;
            let ca = $("<button>").attr("id", `id${y}`).addClass("col btn btn-light btn-danger btn-lg m-2 gameButton").text(y).attr("value", y).attr("onclick", "userGenerate(this)");
            ra.append(ca);
        }
        $("#box").append(ra);
    }
    for (let i = 0; i < x; i++) {
        let ra = $("<div>").addClass("row");
        for (let j = 0; j < x; j++) {
            yd++;
            let ca = $("<button>").attr("id", `id${yd}`).addClass("col btn btn-light btn-danger btn-lg m-2 gameButton").text(yd).attr("value", yd).attr("onclick", "userGenerate(this)");
            ra.append(ca);
        }
        $("#box").append(ra);
    }
};

// create a comp array which generate random number and store into this array
// create an user array which let user to save array

let comm = [],
    user = [],
    index = 0,
    y = 0,
    game = 3;

let commGenerate = (x) => {
    // do while added to make sure not repeating same number at the last generated
    do {
        y = Math.floor(Math.random() * (x * x));
    } while (comm[comm.length - 1] == y + 1);
    comm.push(y + 1);
    console.log(comm);
};

let startGame = (x) => {
    comm.push(Math.floor(Math.random() * (x * x)) + 1);
    console.log(comm);
    gameStructure(x);
    commGenerate(x);
    alertLoop(0);
};

let userGenerate = (xx) => {
    user.push(xx.value);
    console.log(user);
};

/* 
var arr = ['html5', 'EDM', 'Coca Cola', 'creativity'];
var index = 0;
setInterval(function() {
    console.log(arr[index++ % arr.length]);
}, 4000);​
*/

// setInterval(() => {
//     console.log(comm[index++ % comm.length]);
// }, 1000);

var alertLoopTwo = function (i) {
    if (comm[i]) {
        $(`#id${comm[i]}`).addClass("btn-light");
        setTimeout(function () {
            alertLoopTwo(i + 1);
        }, 2000);
    }
};
var alertLoop = function (i) {
    if (comm[i]) {
        // setTimeout(alertLoopTwo(0),1000);
        alertLoopTwo(0);
        $(`#id${comm[i]}`).removeClass("btn-light");
        setTimeout(function () {
            alertLoop(i + 1);
        }, 2000);
    }
};

$("#readyButton").click(() => {
    startGame(game);
});