import db from '../config/firebase';

class ScoreManager {
  constructor(playerName, initScore = 0) {
    if (!playerName) {
      console.error('ScoreManager needs a playerName');
      return;
    }

    this.player = playerName;
    this.score = initScore;
    this.time = 0;

    this.score = {
      player: this.player,
      score: this.score,
      time: this.time,
    };

    this.playerRef = db.ref(`score/${playerName}`);
    // this.playerRef.once('value', (snapshot) => {
    //   console.log('snapshot', snapshot.val());
    //   this.score = {
    //     player: snapshot.val().player,
    //     score: snapshot.val().score,
    //     time: snapshot.val().time,
    //   };
    // });

    this.getScore = this.getScore.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  getScore() {
    return this.score;
  }

  setScore(score, time = 0) {
    this.playerRef.set({ player: this.player, score, time });
  }
}

export default ScoreManager;
