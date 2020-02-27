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
      this.ngOnInit();
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
    this.getQuestions();
    this.questionCounter = 0;
    this.setQuestion();
    this.startTime = new Date();
  }

  getQuestions() {
    this.questions = [{
      quote: 'According to Master Yoda, how many Sith are always out there?',
      options: [
        '1',
        '3',
        '2',
        '4'],
        correctOption: 2
    },
    {
      quote: 'Who killed Jabba?',
      options: [
        'Han Solo',
        'C-3PO',
        'Luke Skywalker',
        'Princes Leia'],
      correctOption: 3
    },
    {
      quote: 'Which furry species lives on the forest moon of Endor?',
      options: [
        'Wookiees',
        'Hutts',
        'Ewoks',
        'Jawas'],
      correctOption: 2
    },
    {
      quote: 'Who is Boba Fett’s father?',
      options: [
        'Bango Fett',
        'Jango Fett',
        'Dango Fett',
        'Rango fett'],
      correctOption: 1
    },
    {
      quote: 'Who built C-3PO?',
      options: [
        'Luke',
        'Obiwan',
        'Yoda',
        'Anakin'],
      correctOption: 3
      }
    ];

  }



  constructor(public router: Router) {}

}
