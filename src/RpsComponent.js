import { html, css, LitElement } from 'lit';

export class RpsComponent extends LitElement {
  static get styles() {
    return css`
     header {
      background: white;
      padding: 20px;
     }

     header > h1 {
      text-align: center;
      font-family: monospace;
     }

     .green-glow{
      border: 4px solid green;
      box-shadow: 0 0 10px #31b43a;
     }

     .red-glow{
      border: 4px solid red;
      box-shadow: 0 0 10px darkred;
     }

     .game-container{
      font-family: monospace;
      text-align: center;
      background-color: #24272E;
      color: white;
      padding: 10px;
      height: 430px;
     }

     .title{
      font-size: 20px;
     }

     .score-board{
      position: relative;
      border: 3px solid white;
      width: 200px;
      margin: 20px auto;
      font-size: 40px;
      border-radius: 4px;
      text-align: center;
      padding: 15px 20px;
     }

     .badge{
      background: #A29F15;
      color: white;
      font-size: 15px;
      padding: 2px 10px;
     }

     #user-label{
      position: absolute;
      top: 30px;
      left: -20px;
     }

     #pc-label{
      position: absolute;
      top: 30px;
      right: -30px;
     }

     .result{
      font-size: 40px;
     }

     .choices{
      font-size: 40px;
      margin: 50px 0px;
     }

     .choice{
      display: inline-block;
      border: 4px solid white;
      border-radius: 50%;
      cursor: pointer;
     }

    .choice:hover{
      background: antiquewhite;
    }

     .choice > p{
      margin-block-start: 0;
      margin-block-end: 0;
      padding: 10px;
     }

     #action-message{
      font-size: 20px;
     }
    `;
  }

  static get properties() {
    return {
      userScore: {
        type: Number,
      },
      pcScore: {
        type: Number,
      },
      choice: {
        type: String,
      },
      userChoice: {
        type: String,
      },
      pcChoice: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.userScore = 0;
    this.pcScore = 0;
    this.choice = "",
    this.userChoice = "";
    this.pcChoice = "";
  }

  async win(userChoice, pcChoice){
    this.userScore++;
    const userScoreNumber = this.shadowRoot.querySelector(".user-score");
    userScoreNumber.innerHTML = this.userScore;
    //this.userScore.innerHTML()
    let result = this.shadowRoot.querySelector(".result");
    result.innerHTML = userChoice + " beats " + pcChoice + ". You won! 👏"
    this.requestUpdate();
  }
  async lose(userChoice, pcChoice){
    this.pcScore++;
    const pcScoreNumber = this.shadowRoot.querySelector(".pc-score");
    pcScoreNumber.innerHTML = this.pcScore;
    let result = this.shadowRoot.querySelector(".result");
    result.innerHTML = pcChoice + " beats " + userChoice + ". You lost 😭"
    this.requestUpdate();
  }
  async draw(userChoice, pcChoice){
    let result = this.shadowRoot.querySelector(".result");
    result.innerHTML = `${userChoice}  =  ${pcChoice} . It's a tie! 👔`
    this.requestUpdate();
  }

  async game(userChoice, pcChoice){
    const choices = ["👊", "✋", "✌️"];
    const randomNumber = Math.floor(Math.random() * choices.length);
    pcChoice = choices[randomNumber];
    //console.log("your choice is " + userChoice)
    //console.log("PC CHOICE IS " + pcChoice)
    switch (userChoice + pcChoice){
      case "👊✌️":
      case "✋👊":
      case "✌️✋":
        this.win(userChoice, pcChoice)
        break;
      case "👊✋":
      case "✋✌️":
      case "✌️👊":
        this.lose(userChoice, pcChoice)
        break;
        case "👊👊":
        case "✋✋":
        case "✌️✌️":
          this.draw(userChoice, pcChoice)
          break;
    }
    this.requestUpdate()
  }

  onRockClick(){
    this.game("👊")
  }

  onPaperClick(){
    this.game("✋")
  }

  onScissorsClick(){
    this.game("✌️")
  }

  render() {
    return html`
      <header>
        <h1>Rock, Paper, Scissors</h1>
      </header>
      <div class="game-container">
        <p class="title">SCORE BOARD</p>
        <div class="score-board">
        <div class="badge" id="user-label">User</div>
        <div class="badge" id="pc-label">P.C.</div>
        <span class="user-score">${this.userScore}</span>:<span class="pc-score">${this.pcScore}</span>
      </div>

      <div class="result">
        <p>Make your move ⬇️</p>
      </div>

      <div class="choices">
        <div class="choice" id="rock" @click=${() => {this.onRockClick()}}>
          <p>👊</p>
        </div>
        <div class="choice" id="paper" @click=${() => {this.onPaperClick()}}>
          <p>✋</p>
        </div>
        <div class="choice" id="scissors" @click=${() => {this.onScissorsClick()}}>
          <p>✌️</p>
        </div>
      </div>

      <!-- <p class="action-message">You used ${this.userChoice}</p>
      <p class="action-message">P.C. used ${this.pcChoice}</p> -->
      </div>
      
    `;
  }
}
