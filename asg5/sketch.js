
let isClicked = false;
let markov;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);

    button = createButton('Play');
    button.position(width - 80, 20);
    button.mousePressed(onButtonClicked);

    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);

    markov = new MarkovChain();
}

function draw() {
    midiPlayer.draw();
}

function onButtonClicked() {
    isClicked = !isClicked;

    if(isClicked) {
        // console.log("start");
        button.elt.innerHTML = "Pause";
        midiPlayer.start();
    }
    else {
        button.elt.innerHTML = "Play";
        midiPlayer.pause();
    }
}

function onMIDIsLoaded(pianoRolls) {
    // Pick random file to play
    //let pianoRoll = random(pianoRolls);
    //console.log(pianoRolls);
    let allPianoRolls = [];
    for(let pianoRoll of pianoRolls){
        let midiText = midiPlayer.pianoRoll2Text(pianoRoll);
        allPianoRolls.push(midiText);
    }
    //midiPlayer.setPianoRoll(pianoRoll, tsCallback);
    //console.log(allPianoRolls);
    // Encode the piano roll (2D array) as string
    //let midiText = midiPlayer.pianoRoll2Text(pianoRoll);

    // train the midi
    let pd = markov.train(allPianoRolls);
    console.log(pd);
    let track = markov.generateTrack(pd);
    let text = midiPlayer.text2Midi(track);
    console.log(track);
    let mi = midiPlayer.parseMidi(text);
    let pr = midiPlayer.notes2PianoRoll(mi.duration, mi.notes);

    midiPlayer.pianoRolls.push(pr);
     //console.log(midiPlayer.pianoRolls);
    let pianoRolll = midiPlayer.pianoRolls[3];

    midiPlayer.setPianoRoll(pianoRolll, tsCallback);

    // let midiTextx = midiPlayer.pianoRoll2Text(pianoRoll);

}

function tsCallback(currentTs, notesOn) {
    // console.log(currentTs, notesOn);
}
