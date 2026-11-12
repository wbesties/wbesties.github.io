import { useEffect, useRef, useState } from 'react'

function App() {
  const [message, setMessage] = useState<Fragment[]>([])
  const [fragment, setFragment] = useState<Fragment>({ text: "", rate: 1, endDelay: 0 })
  const [selectedIndex, setSelectedIndex] = useState(-1)

  return (
    <div style={{ display: "flex", flexDirection: 'column', height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <Message fragments={message} selectedIndex={selectedIndex} onFragClick={(i) => {
          console.log(i)
          if (selectedIndex === i) {
            setSelectedIndex(-1)
            setFragment({ text: "", rate: 1, endDelay: 0 })
          }
          else {
            setSelectedIndex(i)
            setFragment({ ...message[i] })
          }
        }} />
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}>
        <div style={{display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center"}}>
          <Select
            value={fragment.rate}
            onChange={(val) => setFragment({ ...fragment, rate: val })}
            name='rate'
            width={"2.5rem"}
            options={[0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, Infinity]}
          />
          <Select
            value={fragment.endDelay}
            onChange={(val) => setFragment({ ...fragment, endDelay: val })}
            name='endDelay'
            width={"2.5rem"}
            options={[0, 250, 500, 750, 1000, 1250, 1500]}
          />
        </div>
        <div style={{
          display: "flex",
          borderBottom: "1px solid var(--white)",
          borderTop: "1px dotted var(--white)",
        }}>
          <textarea
            onChange={(e) => { setFragment({ ...fragment, text: e.target.value }) }}
            value={fragment.text}
          />
          <div
            onClick={() => {
              if (selectedIndex !== -1) {
                setMessage(message.with(selectedIndex, { ...fragment }))
              }
              else {
                setMessage(message.concat({ ...fragment }))
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "2rem",
              cursor: "pointer"
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  )
}

type Fragment = {
  text: string,
  rate?: number,
  endDelay?: number
}
interface MessageProps {
  fragments: Fragment[],
  onFragClick?: (i: number) => void
  selectedIndex: number
}
function Message({ fragments, onFragClick, selectedIndex }: MessageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [foo, setFoo] = useState(false)

  function clearMessage() {
    if (ref.current) {
      for (const span of ref.current.children) {
        span.innerHTML = ""
      }
    }
  }

  useEffect(() => {
    let fragIndex = 0
    let textIndex = 0
    let timeoutId: number = 0
    const el = ref.current
    if (el === null) { return }
    
    function nextChar() {
      // base case: we have displayed all fragments
      if (fragIndex >= fragments.length) {
        return
      }
      // get the next character to display
      const fragment = fragments[fragIndex]
      const char = fragment.text.charAt(textIndex)
      // edge case: when rate is Infinity, the whole fragment should display at once
      if (fragment.rate === Infinity) {
        el!.children[fragIndex].innerHTML += fragment.text
        fragIndex += 1
        textIndex = 0
        timeoutId = setTimeout(nextChar, fragment.endDelay ?? 0)
        return
      }
      // add the character
      el!.children[fragIndex]!.innerHTML += char
      textIndex += 1 
      // If there are no more chars in this fragment, go to the next fragment
      if (textIndex > fragment.text.length) {
        fragIndex += 1 
        textIndex = 0
      }
      // Recurse
      const delay = [",", ".", ":", ";", "!", "?"].includes(char) ? 500 : 1000 / 16 / (fragment.rate ?? 1)
      timeoutId = setTimeout(nextChar, delay)
    }
    nextChar()
    return () => {
      clearTimeout(timeoutId)
      clearMessage()
    }
  }, [ref, fragments, foo])
  
  return (
    <>
      <div style={{
        display: "flex"
      }}>
        <div style={{ flexGrow: 1 }}></div>
        <div
          style={{
            cursor: "pointer",
            borderBottom: "1px dotted var(--white)" 
          }}
          onClick={() => {
            clearMessage()
            setFoo(!foo)
          }}
        >
        Reload
        </div>
      </div>
      <div ref={ref}>
        {fragments.map((frag, i) =>
          <span
            key={i}
            style={{
              backgroundColor: selectedIndex === i ? "#333333" : ""
            }}
            onClick={() => {
              onFragClick?.(i)
            }}
          >
      
          </span>
        )}
      </div>
    </>
  )
}

interface SelectProps<T> {
  options: T[],
  name: string,
  width?: string,
  value?: T,
  onChange?: (val: T) => void
}
function Select<T>({ options, name, width = "2rem", value, onChange }: SelectProps<T>) {
  const [isOpen, setOpen] = useState(false)

  return (
    <div style={{
      display: "flex",
      textAlign: "end"
    }}>
      {name}:
      <div style={{
        position: "relative",
        width: width,
        cursor: 'pointer',
        borderBottom: "1px dotted var(--white)",
        textAlign: "end"
      }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {value === Infinity ? "Inf" : String(value)}
        <div style={{
          position: "absolute",
          bottom: "100%",
          width: "100%",
          display: isOpen ? "block" : "none"
        }}>
          {
            options.map((option) =>
            <div key={String(option)}
              style={{ textAlign: "end" }}
              onClick={() => {
                onChange?.(option)
                setOpen(false)
              }}
            >
              {option === Infinity ? "Inf" : String(option)}
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
