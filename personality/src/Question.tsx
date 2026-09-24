export type ResponseOption = {
  choice: string,
  text: string,
  points: Record<string, number>
}

export type QuestionData = {
  question: string,
  question_no: number,
  options: ResponseOption[]
}

interface QuestionProps {
  question: QuestionData,
}

export default function Question({question}: QuestionProps) {
  const az: string[] = ["A: ", "B: ", "C: ", "D: ", "E: "]
  const ansPoints: number[] = [];

  for(let i = 0; i < question.options.length; i++){
    az[i] = az[i] + question.options[i].text
    
  }

  
  return (
    <div>
        <h1>Question #</h1> 
      {
        // nAns.map((az) => <div>{ az }</div>)
        az.map((letter, index) => <div>{letter} </div>)
      }
    </div>
  )
}