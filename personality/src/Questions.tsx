import { QuestionData } from "./Question";

export const questions: QuestionData[] = [
  {
    question : "favorite nintendo franchise?",
    question_no : 1,
    options: [
      {
        choice : "a",
        text : "Mario",
        points : {
          "michael": 1,
          "kevin": 2,
          "ryan": 2
        }
      },
      {
        choice : "b",
        text : "Pokemon",
        points : {
          "michael": 1,
          "kevin": 2,
          "ryan": 2
        }
      },
      {
        choice : "c",
        text : "Zelda",
        points : {
          "michael": 1,
          "kevin": 2,
          "ryan": 2
        }
      },
      {
        choice : "d",
        text : "Kirby",
        points : {
          "michael": 1,
          "kevin": 2,
          "ryan": 2
        }
      }
    ]
  },

  {
    question: "miku or teto?",
    question_no : 2,
    options : [
      {
        choice : "a",
        text: "miku",
        points: {
          "michael": 0,
          "kevin": 0,
          "ryan" : 0
        }
      },
      {
        choice : "b",
        text: "teto",
        points: {
          "michael": 0,
          "kevin": 0,
          "ryan": 0
        }
      },
    ]
  },

  {
    question: "which bending would you want",
    question_no : 3,
    options : [
      {
        choice : "a",
        text: "water",
        points: {
          "michael": 0,
          "kevin": 0,
          "ryan": 0
        }
      },
      {
        choice : "b",
        text: "earth",
        points: {
          "michael": 0,
          "kevin": 0,
          "ryan": 0
        }
      },
      {
        choice : "c",
        text: "fire",
        points: {
          "michael": 0,
          "kevin": 0,
          "ryan": 0
        }
      },
      {
        choice : "d",
        text: "air",
        points: {
          "michael": 0,
          "kevin": 0,
          "ryan": 0
        }
      },
      
    ]
  }
]