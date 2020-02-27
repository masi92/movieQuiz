import { Component, OnInit, NgZone } from '@angular/core';
import { MovieQuestion } from '../../moviequestion';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  // Member variables
  questions: MovieQuestion[] = [];
  activeQuestion: MovieQuestion;
  isCorrect: boolean;
  feedback: string;
  questionCounter: number = 0;
  optionCounter: number;
  startTime: Date;
  endTime: Date;
  duration: number;




  setQuestion() {
    console.log(this.questionCounter);
    if (this.questionCounter === this.questions.length) {
      this.endTime = new Date();
      this.duration = this.endTime.getTime() - this.startTime.getTime();
      this.router.navigateByUrl('result/' + this.duration);
      //this.ngOnInit();
      console.log('loppu');
    } else {
      this.optionCounter = 0;
      this.feedback = '';
      this.isCorrect = false;
      this.activeQuestion = this.questions[this.questionCounter];
      this.questionCounter++;
    }
  }

  checkOption(option: number, activeQuestion: MovieQuestion) {
    this.optionCounter++;
    if (this.optionCounter > activeQuestion.options.length) {
      this.setQuestion();
    }
    if (option === activeQuestion.correctOption) {
      this.isCorrect = true;
      this.feedback = activeQuestion.options[option] +
      ' is correct! Tap the projector once!';
    } else {
      this.isCorrect = false;
      this.feedback = 'Incorrect. Number of guesses left: ' +
        (this.activeQuestion.options.length - this.optionCounter);
    }
  } 
  ngOnInit() {
    this.questions = [{
      quote: 'here\'s Johnny',
      options: [
        'The Evil Dead',
        'The Exorcist',
        'The Shining'],
        correctOption: 2
    },
    {
      quote: 'You talkin\' to me?',
      options: [
        'Godfather',
        'Goodfellas',
        'Raging Bull',
        'Taxi Driver'],
      correctOption: 3
      }
    ];
    //this.questionCounter = 0;
    this.setQuestion();
    this.startTime = new Date();

    
  }



  constructor(public router: Router) {}
}
