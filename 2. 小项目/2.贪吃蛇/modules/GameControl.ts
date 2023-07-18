import Snake from './Snake'
import Food from './Food';
import ScorePanel from './ScorePanel';

enum Directions {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
}

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
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  keydownHandler(event: KeyboardEvent) {
    const newDirection = event.key;
    // 禁止蛇掉头
    if (
      (newDirection === Directions.ArrowUp && this.direction !== Directions.ArrowDown) ||
      (newDirection === Directions.ArrowDown && this.direction !== Directions.ArrowUp) ||
      (newDirection === Directions.ArrowRight && this.direction !== Directions.ArrowLeft) ||
      (newDirection === Directions.ArrowLeft && this.direction !== Directions.ArrowRight)
    ) {
      this.direction = newDirection;
    }
  }

  run() {
    let x = this.snake.x;
    let y = this.snake.y;
    // 计算蛇下一帧的位置
    switch (this.direction) {
      case Directions.ArrowUp:
        y -= 10;
        break;
      case Directions.ArrowDown:
        y += 10;
        break;
      case Directions.ArrowRight:
        x += 10;
        break;
      case Directions.ArrowLeft:
        x -= 10;
        break;
    }

    // 检查蛇头是否碰撞墙壁
    this.isLive = !this.snake.CheckSnakeheadHittingWall(x, y);
    // 控制游戏结束
    if (!this.isLive) {
      alert('撞墙，游戏结束！');
      location.reload();
      return;
    }
    // 检查蛇头是否碰撞身体
    this.isLive = !this.snake.CheckSnakeheadHittingBody(x, y);
    // 控制游戏结束
    if (!this.isLive) {
      alert('咬到身体了，游戏结束！');
      location.reload();
      return;
    }
    // 检查是否吃到食物
    const isEatFood = this.checkEatFood(x, y)
    if (isEatFood) {
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