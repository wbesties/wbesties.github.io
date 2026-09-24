export default function Rendering() {
  const stringExample = "i am a variable"
  const numberExample = 1234
  const HTMLElementExample = <span>I am a span stored as a variable</span>
  const HTMLElementArrayExample = [
    <div>Each of us</div>,
    <div>are a div</div>,
    <div>stored inside an array</div>
  ]
  
  return (
    <div className="box">
      - I am the RenderingExplainer component <br></br> <br></br>
      Some variables can be rendered using braces (see RenderingExplainer.tsx for syntax) <br></br>
      - strings can be rendered: {stringExample} <br></br>
      - numbers can be rendered: {numberExample} <br></br>
      - HTMLElements can be rendered: {HTMLElementExample} <br></br>
      - Arrays of HTMLElements can be rendered: {HTMLElementArrayExample}
    </div>
  )
}