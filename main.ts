enum lor {
    left,
    right
}

let lastClock = pins.digitalReadPin(DigitalPin.P1);
let clk = pins.digitalReadPin(DigitalPin.P1);
let data = pins.digitalReadPin(DigitalPin.P2);
let lorc:lor;
let read;
let steps:number = 0;
let maxinum:number = 100;
let mdoh:number;
basic.forever(function () {
    if (!(steps >= maxinum)) {
            led.plotBarGraph(steps, maxinum);
    } else {

        basic.showLeds(`
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        `)
    }
    if (input.buttonIsPressed(Button.A)) {
        if (steps >= maxinum) {
            music.ringTone(Note.E);
            music.ringTone(Note.D);
            music.ringTone(Note.C);
        }
        basic.showString(steps.toString());
    }
    if (input.buttonIsPressed(Button.B)) {
        mdoh = maxinum / 100;
        while(!input.pinIsPressed(TouchPin.P1)) {
            basic.showNumber(mdoh);
            if (input.buttonIsPressed(Button.A)) {
                if(mdoh > 1) {
                    mdoh--;
                }
            }
            if (input.buttonIsPressed(Button.B)) {
                mdoh++;
            }
        }
        maxinum = mdoh * 100;
    }
});

input.onGesture(Gesture.Shake, function () {
    
    steps += 1;
})