function resizeCanvas() {
    let bgnd = document.getElementById("BGND");
    bgnd.width = window.innerWidth;
    bgnd.height = window.innerHeight - 10;
}

let cnvs = document.getElementById("BGND");

let gradientEnd = {
    x: window.innerWidth,
    y: window.innerHeight,
    moveBack: false,
};

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let rows = [];


function generatePoints() {
    let offsetX = cnvs.width / 20;
    let offsetY = cnvs.width / 20;

    let scr = {
        W: cnvs.width,
        H: cnvs.height
    };
    rows = [];
    let h1 = {x: 0, y: 0};
    rows.push([{x: 0, y: 0}]);


    do {
        let h2 = -1;
        try {
            h2 = rows[rows.length - 1][0].y
        } catch (e) {
            h2 = -1;
        }
        if (rows[0].length > 1){
            rows.push([{
                x: rows[rows.length - 1][0].x === -(offsetX / 2) ? 0 : -(offsetX / 2),
                y: rows[rows.length - 1][0].y >= 0 ? h2 + offsetY : 0,
            }]);
        }

        do {
            rows[rows.length - 1].push({
                x: rows[rows.length - 1][rows[rows.length - 1].length - 1].x + offsetX,
                y: rows[rows.length - 1][0].y
            });
        } while (rows[rows.length - 1][rows[rows.length - 1].length - 1].x - offsetX <= scr.W);


        try {
            h1 = rows[rows.length - 1][rows[rows.length - 1].length - 1];
        } catch (e) {
            h1 = {x: 0, y: 0};
        }
    } while ( h1.y <= scr.H);
}

function drawTriangle(triangle, ctx) {
    if (triangle === undefined || triangle === null || ctx === undefined || ctx === null) {
        return "ERROR";
    }

    ctx.beginPath();
    ctx.moveTo(triangle[0].x, triangle[0].y);
    ctx.lineTo(triangle[1].x, triangle[1].y);
    ctx.lineTo(triangle[2].x, triangle[2].y);
    var gradient = ctx.createLinearGradient(
        triangle[0].x,
        triangle[0].y,
        triangle[1].x + (triangle[1].x - triangle[0].x) ,
        triangle[2].y);

    gradient.addColorStop(0, `hsl(277, 100%, 76%)`);
    gradient.addColorStop(1, `rgb(155, 187, 255)`);

    ctx.fillStyle = gradient; //`hsl(289, ${Math.random() * 30 + 70}%, ${Math.random() * 30 + 40}%)`;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
}

let ctx = undefined;

function drawCNVS() {

    for (i = 0; i < rows.length - 1; i++){
        for (j = 0; j < rows[i].length - 1; j++) {
            let z = i % 2 === 0 ? i : i + 1;

            if (i % 2 === 0) {
                let triangle = [
                    {x: rows[i][j].x, y: rows[i][j].y},
                    {x: rows[i][j + 1].x, y: rows[i][j + 1].y},
                    {x: rows[i + 1][j + 1].x, y: rows[i + 1][j + 1].y}
                ];
                drawTriangle(triangle, ctx);

                triangle = [
                    {x: rows[i][j].x, y: rows[i][j].y},
                    {x: rows[i + 1][j + 1].x, y: rows[i + 1][j + 1].y},
                    {x: rows[i + 1][j].x, y: rows[i + 1][j].y}
                ];
                drawTriangle(triangle, ctx);
            } else {
                let triangle = [
                    {x: rows[i][j].x, y: rows[i][j].y},
                    {x: rows[i][j + 1].x, y: rows[i][j + 1].y},
                    {x: rows[i + 1][j].x, y: rows[i + 1][j].y}
                ];
                drawTriangle(triangle, ctx);

                if (j < rows[i].length - 2){
                    triangle = [
                        {x: rows[i][j + 1].x, y: rows[i][j + 1].y},
                        {x: rows[i + 1][j + 1].x, y: rows[i + 1][j + 1].y},
                        {x: rows[i + 1][j].x, y: rows[i + 1][j].y}
                    ];
                    drawTriangle(triangle, ctx);
                }

            }

        }
    }

}



function redrawFull() {
    generatePoints();
    drawCNVS();
}

function movePoints() {
    for (i = 1; i < rows.length - 1; i++) {
        for (j = 1; j < rows[i].length - 1; j++) {
            rows[i][j].x += (Math.random() -  0.5);
            rows[i][j].y += (Math.random() - 0.5);
        }
    }
}

function redrawWithMove() {
    if (!document.hasFocus()) {
        window.requestAnimationFrame(redrawWithMove);
        return;
    }
    movePoints();
    changeGradient();
    drawCNVS();
    window.requestAnimationFrame(redrawWithMove);
}

window.requestAnimationFrame(redrawWithMove);
//setInterval(redrawWithMove, 1000/20);


window.addEventListener("resize", redrawFull);


function changeGradient() {
   if (gradientEnd.moveBack) {
       gradientEnd.x += cnvs.width/1000;
       gradientEnd.y += cnvs.height/1000;
   } else {
       gradientEnd.x -= cnvs.width/1000;
       gradientEnd.y -= cnvs.height/1000;
   }

   if (gradientEnd.x == cnvs.width/1000 && gradientEnd.y == cnvs.height/1000) {
       gradientEnd.moveBack = !gradientEnd.moveBack;
   }
}



ctx = undefined;
if (cnvs.getContext) {
    ctx = cnvs.getContext("2d");
    ctx.translate(-0.5, -0.5);
}
generatePoints();



drawCNVS();