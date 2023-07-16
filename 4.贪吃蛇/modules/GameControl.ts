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
    this.init();
  }

  init() {
    this.snake.x = 0;
    this.snake.y = 0;
    this.direction = '';
    this.isLive = true;
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }

  run() {
    let x = this.snake.x;
    let y = this.snake.y;
    // 计算蛇下一帧的位置
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
    
    // 检查蛇头是否碰撞墙壁
    this.isLive = !this.snake.CheckSnakeheadHittingWall(x, y);
    if (!this.isLive) {
      alert('游戏结束，点击重新开始!');
      this.init();
      return;
    }
    // 检查是否吃到食物
    const isEatFood = this.checkEatFood(x, y)
    if(isEatFood) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
    // 更新蛇位置
    this.snake.x = x;
    this.snake.y = y;
    // 继续执行run
    const ms = 200 / this.scorePanel.level;
    setTimeout(this.run.bind(this), ms);
  }
  
  checkEatFood(x: number, y: number) {
    return x === this.food.x && y === this.food.y;
  }
}

export default GameControl;