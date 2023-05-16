"use strict";

Vue.createApp({
  data() {
    return {
      title: "Let's Whack A Mole",
      buttonText: "Start New Game",
      seconds: 0,
      score: 0,
      intervalID: null,
      startButtonDisabled: false,
      moleButtonDisabled: true,
      randomLeftNumber: 0.1,
      randomTopNumber: 0.05,
    };
  },
  methods: {
    startGame() {
      this.score = 0;
      this.seconds = 15;
      this.startButtonDisabled = true;
      this.moleButtonDisabled = false;

      this.intervalID = setInterval(() => {
        this.seconds--;
        this.randomLeftNumber = Math.random();
        this.randomTopNumber = Math.random();
      }, 1000);
    },
    whack() {
      if (this.seconds > 0) {
        this.score++;
      }
    },
  },
  computed: {
    moveMoleStyle() {
      return `left: ${100 * this.randomLeftNumber}%; top: ${
        100 * this.randomTopNumber
      }%;`;
    },
    blinkyStyle() {
      if (this.seconds === 0 && this.score >= 5) {
        return "blink";
      }
    },
    dangerStyle() {
      if (this.seconds <= 3 && this.seconds > 0) {
        return "danger";
      }
    },
  },
  watch: {
    seconds(newValue, oldValue) {
      if (oldValue === 1 && newValue === 0) {
        clearInterval(this.intervalID);
        this.moleButtonDisabled = true;
        this.startButtonDisabled = false;
      }
    },
  },
}).mount("#app");
