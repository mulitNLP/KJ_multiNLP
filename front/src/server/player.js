const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.fireCooldown = 0;
    this.score = 0;
    this.keycodes = {};
  }

  
  // Returns a newly created bullet, or null.
  update(dt) {
    // 앞으로 나가는거
    // super.update(dt);

    // // Update score
    // this.score += dt * Constants.SCORE_PER_SECOND;

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // Fire a bullet, if needed
    // this.fireCooldown -= dt;
    // if (this.fireCooldown <= 0) {
    //   this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
    //   return new Bullet(this.id, this.x, this.y, this.direction);
    // }

    if (this.keycodes['87']) {
      super.setDirection(Math.atan2(0, this.y - Constants.PLAYER_SPEED));
      this.y -= Constants.PLAYER_SPEED / 40;
    }// S
    if (this.keycodes['83']) {
      super.setDirection(Math.atan2(0, this.y + Constants.PLAYER_SPEED - Constants.MAP_SIZE));
      this.y += Constants.PLAYER_SPEED / 40;
    }// A
    if (this.keycodes['68']) {
      super.setDirection(Math.atan2(this.x + Constants.PLAYER_SPEED, 0));
      this.x += Constants.PLAYER_SPEED / 40;
    }// D
    if (this.keycodes['65']) {
      super.setDirection(Math.atan2(this.x - Constants.PLAYER_SPEED - Constants.MAP_SIZE, 0));
      this.x -= Constants.PLAYER_SPEED / 40;
    }// W

    return null;
  }

  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
  }

  onDealtDamage() {
    this.score += Constants.SCORE_BULLET_HIT;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
    };
  }

  setKeys(key, updown) {
    this.keycodes[key] = updown;
  }

}


module.exports = Player;
