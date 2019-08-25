import { Game } from "./game";
import { AnimationsManager } from "./animations";
import { PhysicsSystem } from "./systems/physics/physics";
import { FoliageSystem } from "./systems/foliage";
import { Player } from "./systems/player";
import { Vector2 } from "./vector";
import { Control } from "./control";
import { Renderer } from "./renderer/renderer";
import { Camera } from "./camera";

// #if process.env.NODE_ENV === 'development'
import { Editor } from "./editor/editor";
// #endif

export class Engine {
  time = 0;

  // just let the logic flow
  worldWidth = 1;
  worldHeight = 1;

  // sound = new Sound();

  animations = new AnimationsManager();

  physics = new PhysicsSystem();

  player = new Player(this, new Vector2(1200, 950));

  foliage = new FoliageSystem();

  control = new Control(this.game);

  renderer = new Renderer(this);

  camera = new Camera(this);

  // #if process.env.NODE_ENV === 'development'
  editor = new Editor(this);
  // #endif

  constructor(public game: Game, public canvas: HTMLCanvasElement) {
    this.renderer.updateSize();
    this.control.init();
  }

  init() {
    this.renderer.init();
    this.camera.bindToTarget(this.player.body.pos);
    this.renderer.systemsRenderer.prerender();
  }

  update(timeStep: number) {
    this.time += timeStep;
    this.animations.update(this.time);
    this.player.update();
    this.physics.update();
  }

  clear() {
    this.time = 0;
  }
}
