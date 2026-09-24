import { useState } from "react";
import RenderingExplainer from "./RenderingExplainer";
import PropsExplainer from "./PropsExplainer";

export default function App() {
  const [renderingGuideVisible, setRenderingGuideVisible] = useState<boolean>(false)
  const [propsGuideVisible, setPropsGuideVisible] = useState<boolean>(false)
  const [propsGuideValue, setPropsGuideValue] = useState(0)
  
  let renderGuide = null
  if (renderingGuideVisible) {
    renderGuide = <RenderingExplainer/>
  }
  else {
    renderGuide =
      <button
        onClick={() => setRenderingGuideVisible(true)}>
        show rendering guide
      </button>
  }

  let propsGuide = null
  if (propsGuideVisible) {
    propsGuide = <>
      <PropsExplainer value={propsGuideValue} /> 
      <br></br>
      - Hi, it's the App component again <br></br>
      - Here's a button to change my state variable: 
      <button style={{marginLeft: "4px"}} onClick={() => setPropsGuideValue((curr) => curr + 1)}>+1</button>
    </>
  }
  else {
    propsGuide =
      <button
        onClick={() => setPropsGuideVisible(true)}>
        show props guide
      </button>
  }

  return (
    <div className="box">
      - I am the App component. <br></br> <br></br>
      - Components are treated like a new HTML tag <br></br>
      - I am injected into the DOM by main.tsx <br></br>
      - I am rendered dynamically by javascript <br></br> <br></br>
      {renderGuide} <br></br>
      {propsGuide}
    </div>
  )
}