let comm = [],
    game = 4,
    doWhileY = 0,
    newReset = 0,
    lightTimer = null,
    redTimer = null,
    timer = 1000,
    textShow = false,
    colors = ['primary', 'success', 'danger', 'warning', 'info','primary', 'info', 'success', 'danger', 'secondary', 'warning', 'primary', 'info', 'danger', 'success', 'secondary', 'warning'];

$(document).ready(() => {
    let a = $("<div>").attr("id", "commBox").hide();
    let b = $("<div>").attr("id", "userBox").hide();
    
    $("#mainSection").append(a).append(b);
});

// create a game structure for comm and user individually
const gameStructure = (x) => {
    let y = 0;
    $("#commBox").empty();
    for (let i = 0; i < x; i++) {
        let ra = $("<div>").addClass("row");
        for (let j = 0; j < x; j++) {
            y++;
            let ca = $("<button>").attr("id", `id${y}`).addClass(`col btn btn-light btn-${colors[y]} btn-lg py-3 m-1 gameButton border-${colors[y]} border-3`).text(textShow ? y : ` `).attr("value", y);
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
            let ca = $("<button>").attr("id", `idu${yd}`).addClass(`col btn btn-light btn-secondary btn-lg py-3 m-1 gameButton border-${colors[yd]} border-3`).text(textShow ? yd : ` `).attr("value", yd).attr("onclick", "userGenerate(this)").attr("onmousedown", "mouseDown(this)").attr("onmouseup", "mouseUp(this)");
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

let rct, act, ft;
let timeFunction = () => {
for(let i = 0; i < comm.length; i++) {
  rct = setTimeout(() => {
    $(`#id${comm[i]}`).removeClass("btn-light");
  }, timer*(i+1));
  act = setTimeout(() => {
    $(`#id${comm[i]}`).addClass("btn-light");
  }, timer*(i+2));
}
  ft = setTimeout(() => {
      console.log(comm.length + 1);

          $("#commBox").hide();
          $("#userBox").show();
          clearTimeout(rct);
          clearTimeout(act);

  }, timer*(comm.length+1));
}


// show and hide user 

//  on click of ready button, start the game
let startGame = (x) => {
    comm.push(Math.floor(Math.random() * (x * x)) + 1);
    gameStructure(x);
    commGenerate(x);
    // setTimeout(() => alertLoop(0), 1000);
    timeFunction();
};

$("#readyButton").click(() => {
    $("#commBox").show();
    startGame(game);
    $("#readyButton").hide();
});

// user click to create an array
let userGenerate = (xx) => {
    clearTimeout(ft);
    comm.length - 1 != newReset ? comm[newReset] == xx.value ? (newReset++) : location.reload() : comm[newReset] == xx.value ? ($("#commBox").show(), $("#userBox").hide(), commGenerate(game), setTimeout(() => timeFunction(), 500), newReset = 0) : location.reload();
};