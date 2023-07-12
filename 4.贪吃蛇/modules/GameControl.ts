import Snake from './Snake'
import Food from './Food';
import ScorePanel from './ScorePanel';

// 游戏控制器，控制其它类
class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction = ''; //运动方向
  isLive = true; //控制游戏结束
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init()
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }

  run() {
    let x = this.snake.x;
    let y = this.snake.y;
    switch (this.direction) {
      case 'ArrowUp':
        y -= 10;
        break;
      case 'ArrowDown':
        y += 10;
        break;
      case 'ArrowRight':
        x += 10;
        break;
      case 'ArrowLeft':
        x -= 10;
        break;
    }
    
    this.snake.x = x;
    this.snake.y = y;

    const ms = 300 / this.scorePanel.level;
    this.isLive && setTimeout(this.run.bind(this), ms);
  }
}

export default GameControl;