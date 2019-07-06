class ScoreManager {
  constructor(initScore = 0) {
    this.score = initScore;
    this.setScore(initScore);

    this.getScore = this.getScore.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  getScore() {
    const score = parseInt(localStorage.getItem('mmScore'));
    console.log('score', score);
    this.score = score;
    return this.score;
  }

  setScore(points) {
    this.score += points;
    localStorage.setItem('mmScore', this.score);
    return this.score;
  }
}

export default ScoreManager;
