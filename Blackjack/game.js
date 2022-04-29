// Variables
let DealerPoints = 0;
let PlayerPoints = 0;
let DealerAces = 0;
let PlayerAces= 0;
let Hidden;
let Deck;
let CanHit = true;
// Start
window.onload = function() {
    BuildDeck();
    Shuffle();
    Start();
}
// Main
function BuildDeck() {
    let Values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let Types = ["H", "C", "D", "S"];
    Deck = [];
    for (let i = 0; i < Types.length; i++) {
        for (let j = 0; j < Values.length; j++) {
            Deck.push(Values[j] + "-" + Types[i]);
        }
    }
}
function Shuffle() {
    for (let i = 0; i < Deck.length; i++) {
        let j = Math.floor(Math.random() * Deck.length);
        let Temporary = Deck[i];
        Deck[i] = Deck[j];
        Deck[j] = Temporary;
    }
    console.log(Deck);
}

function Start() {
    Hidden = Deck.pop();
    DealerPoints = DealerPoints + GetValue(Hidden);
    DealerAces = DealerAces + CheckAce(Hidden);
    while (DealerPoints < 17) {
        let CardImg = document.createElement("img");
        let Card = Deck.pop();
        CardImg.src = "/cards/" + Card + ".png";
        DealerPoints = DealerPoints + GetValue(Card);
        DealerAces = DealerAces + CheckAce(Card);
        document.getElementById("dealer-cards").append(CardImg);
    }
    console.log(DealerPoints);
    document.getElementById("dealer-points").innerText = DealerPoints - GetValue(Hidden);

    for (let i = 0; i < 2; i++) {
        let CardImg = document.createElement("img");
        let Card = Deck.pop();
        CardImg.src = "/cards/" + Card + ".png";
        PlayerPoints = PlayerPoints + GetValue(Card);
        PlayerAces = PlayerAces + CheckAce(Card);
        document.getElementById("player-cards").append(CardImg);
    }
    console.log(PlayerPoints);
    document.getElementById("player-points").innerText = PlayerPoints;
    document.getElementById("hit").addEventListener("click", Hit);
    document.getElementById("stand").addEventListener("click", Stand);
    document.getElementById("deal").addEventListener("click", Deal);
}
//Minor
function GetValue(Card) {
    let Data = Card.split("-");
    let Value = Data[0];
    if (isNaN(Value)) {
        if (Value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(Value);
}

function CheckAce(Card) {
    if (Card[0] == "A") {
        return 1;
    }
    return 0;
}
// Buttons
function Hit() {
    if (!CanHit) {
        return;
    }
    let CardImg = document.createElement("img");
    let Card = Deck.pop();
    CardImg.src = "/cards/" + Card + ".png";
    PlayerPoints = PlayerPoints + GetValue(Card);
    PlayerAces = PlayerAces + CheckAce(Card);
    document.getElementById("player-cards").append(CardImg);
    document.getElementById("player-points").innerText = PlayerPoints;
    if (ReduceAce(PlayerPoints, PlayerAces) > 21) {
        CanHit = false;
    }
}

function Stand() {
    DealerPoints = ReduceAce(DealerPoints, DealerAces);
    YourPoints = ReduceAce(PlayerPoints, PlayerAces);
    CanHit = false;
    document.getElementById("hidden").src = "/cards/" + Hidden + ".png";
    let Message = "";
    if (PlayerPoints > 21) {
        Message = "You Lose!";
    }
    else if (DealerPoints > 21) {
        Message = "You Win!";
    }
    else if (PlayerPoints == DealerPoints){
        Message = "Tie!";
    }
    else if (PlayerPoints > DealerPoints) {
        Message = "You Win!";
    }
    else if(DealerPoints > PlayerPoints) {
        Message = "You Lose!";
    }
    document.getElementById("dealer-points").innerText = DealerPoints;
    document.getElementById("player-points").innerText = PlayerPoints;
    document.getElementById("results").innerText = Message;
}
function ReduceAce(PlayerPoints, PlayerAces) {
    while (PlayerPoints > 21 && PlayerAces > 0 ) {
        PlayerPoints = PlayerPoints - 10
        PlayerAces = PlayerAces - 1;
    } 
    return PlayerPoints;
}

function Deal() {
    window.location.reload()
}






