export default function PropsExplainer({ value }) {
  return (
    <div className="box">
      - I am the PropsExplainer component <br></br> <br></br>
      - I have a parameter (aka prop) called "value" <br></br>
      - I render my contents based on that parameter <br></br>
      value: {value} <br></br>
      - I receive my prop from App <br></br>
      - My prop is a special type of variable called a "state variable"<br></br>
      - When the state variable changes, I will automatically update my contents <br></br>
      - The state variable, and the function to update it, are stored in App
    </div>
  )
}