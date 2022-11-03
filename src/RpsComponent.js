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

     .game-container{
      font-family: monospace;
      text-align: center;
      
      background: linear-gradient(335deg, rgba(59,143,186,0.9504844173997724) 0%, rgba(59,126,186,0.9504844173997724) 26%, rgba(82,24,107,1) 61%, rgba(152,30,130,0.9252743333661589) 100%);
	    background-size: 400% 400%;
	    animation: gradient 22s ease infinite;
      color: white;
      padding: 10px;
      height: 500px;
      width: 1200px;
      margin: 0 auto;
     }


      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
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
      background: #00A6ED;
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
      background: #b4c1ff;
    }

     .choice > p{
      margin-block-start: 0;
      margin-block-end: 0;
      padding: 10px;
     }

     #action-message{
      font-size: 20px;
     }

     .popup .overlay{
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100vh;
      height: 100vh;
      z-index: 1;
      display: none;
     }

     .popup .content{
      position: absolute;
      top: 325px;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: #fff;
      width: 450px;
      height: 320px;
      z-index: 2;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
      color: black;
      border-radius: 30px;
     }

     .popup .close-btn{
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      background: #222;
      color: #fff;
      font-size: 25px;
      font-weight: 600;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
     }

     .popup.active .overlay{
      display: block;
     }

     .popup.active .content{
      transition: all 300ms ease-in-out;
      transform: translate(-50%, -50%) scale(1);
     }

     .popup2 .content{
      position: absolute;
      top: 325px;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: #fff;
      width: 450px;
      height: 320px;
      z-index: 2;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
      color: black;
      border-radius: 30px;
     }

     .popup2 .close-btn{
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      background: #222;
      color: #fff;
      font-size: 25px;
      font-weight: 600;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
     }

     .popup2.active .overlay{
      display: block;
     }

     .popup2.active .content{
      transition: all 300ms ease-in-out;
      transform: translate(-50%, -50%) scale(1);
     }

     .green-glow{
      color: #48b59c;
      border: 4px solid #48b59c;
      box-shadow: 0 0 10px #48b59c;
      width: 500px;
      margin: 0 auto;
      height: 60px;
     }

     .red-glow{
      color: rgb(171 76 89);
      border: 4px solid rgb(171 76 89);
      box-shadow: 0 0 10px rgb(171 76 89);
      width: 400px;
      margin: 0 auto;
      height: 60px;
     }

     .gray-glow{
      color: gray;
      border: 4px solid gray;
      box-shadow: 0 0 10px gray;
      width: 600px;
      margin: 0 auto;
      height: 60px;
     }

     .green-shine{
      color: #48b59c;
     }

     .red-shine{
      color: rgb(171 76 89);
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

/*   updated(){
    this.stopGame()
  } */

  async win(userChoice, pcChoice){
    this.userScore++;
    const userScoreNumber = this.shadowRoot.querySelector(".user-score");
    userScoreNumber.innerHTML = this.userScore;
    //this.userScore.innerHTML()
    let result = this.shadowRoot.querySelector(".result");
    result.innerHTML = userChoice + " beats " + pcChoice + ". Nice!"
    result.classList.remove("red-glow", "gray-glow")
    result.classList.add("green-glow")
    userScoreNumber.classList.add("green-shine")
    setTimeout(function(){
      userScoreNumber.classList.remove("green-shine")
    }, 400)
    this.requestUpdate();
  }

  async lose(userChoice, pcChoice){
    this.pcScore++;
    const pcScoreNumber = this.shadowRoot.querySelector(".pc-score");
    pcScoreNumber.innerHTML = this.pcScore;
    let result = this.shadowRoot.querySelector(".result");
    result.innerHTML = pcChoice + " beats " + userChoice
    result.classList.remove("green-glow", "gray-glow")
    result.classList.add("red-glow")
    pcScoreNumber.classList.add("red-shine")
    setTimeout(function(){
      pcScoreNumber.classList.remove("red-shine")
    }, 400)
    this.requestUpdate();
  }

  async draw(userChoice, pcChoice){
    let result = this.shadowRoot.querySelector(".result");
    result.innerHTML = `${userChoice}  =  ${pcChoice} . It's a tie! 👔`
    result.classList.remove("green-glow", "red-glow")
    result.classList.add("gray-glow")
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
    this.finishGame();
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

  async finishGame(){
    let popup = this.shadowRoot.querySelector("#popup-1");
    let popup2 = this.shadowRoot.querySelector("#popup-2");
    if(this.userScore === 10){
      //console.log("has ganado")
      this.userScore = 0;
      this.pcScore = 0;
      popup.classList.toggle("active");
      //this.stopGame()
    } else if(this.pcScore === 10){
      //console.log("ha ganado el pc")
      this.userScore = 0;
      this.pcScore = 0;
      popup2.classList.toggle("active");
      //this.stopGame();
    }
    this.requestUpdate();
  }

  async closePopup(){
    console.log("click")
    window.location.reload()
  }

  render() {
    return html`
      <header>
        <h1>Rock, Paper, Scissors</h1>
      </header>
      <div class="game-container">
        <p class="title">SCORE BOARD</p>
        <div class="score-board">
        <div class="badge" id="user-label">User ➡️</div>
        <div class="badge" id="pc-label">⬅️ P.C.</div>
        <span class="user-score">${this.userScore}</span>:<span class="pc-score">${this.pcScore}</span>
      </div>

      <div class="popup" id="popup-1">
        <div class="overlay"></div>
        <div class="content">
          <div class="close-btn" @click="${this.closePopup}">&times;</div>
          <h1>Congrats! You won 👏</h1>
          <img src="https://ficoforums.myfico.com/t5/image/serverpage/image-id/46208iECF36E5EAAA7E405/image-size/large/is-moderation-mode/true?v=v2&px=999" alt="winner" width="300px" height="200px"/>
        </div>
      </div>

      <div class="popup2" id="popup-2">
        <div class="overlay"></div>
        <div class="content">
          <div class="close-btn" @click="${this.closePopup}">&times;</div>
          <h1>You lost 😭</h1>
          <img src="https://i.pinimg.com/originals/67/a5/71/67a5719299e6456cf2be10223475d24c.gif" alt="winner" width="300px" height="200px"/>
        </div>
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
