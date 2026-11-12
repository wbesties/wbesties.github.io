import { useEffect, useRef, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([])
  const [message, setMessage] = useState()
  const [fragment, setFragment] = useState<Fragment>({text: "", rate: 1, endDelay: 0})

  return (
    <div style={{ display: "flex", flexDirection: 'column', height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <Message fragments={[
          { text: "hello, its me, its verity. "},
          { text: "I know, about, a million things. " },
          { text: "ask ", rate: Infinity, endDelay: 500 },
          { text: "me ", rate: Infinity, endDelay: 500 },
          { text: "anything! ", rate: Infinity, endDelay: 1500 },
          { text: "AAAAAAAAAAAAA", rate: Infinity }
        ]}/>
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
            options={[0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0]}
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
            style={{
              flexGrow: 1,
              maxHeight: "3rem",
              fontFamily: "Roboto Mono",
              color: "var(--white)",
              background: "transparent",
              border: "0",
              resize: "none",
              outline: "0px solid black",
              caretColor: "var(--white)"
            }}
          />
          <div style={{
            display: "flex",
            alignItems: "center",
            fontSize: "2rem",
            cursor: "pointer"
          }}>
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
}
function Message({ fragments }: MessageProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let fragIndex = 0
    let textIndex = 0
    let timeoutId: number = 0
    const el = ref.current
    if (el === null) { return }
    
    function nextChar() {
      if (fragIndex > fragments.length) {
        return
      }
      const fragment = fragments[fragIndex]
      const char = fragment.text.charAt(textIndex)
      if (fragment.rate === Infinity) {
        el!.innerHTML += fragment.text
        fragIndex += 1
        textIndex = 0
        timeoutId = setTimeout(nextChar, fragment.endDelay ?? 0)
      }
      else {
        el!.innerHTML += char
        textIndex += 1 
        if (textIndex > fragment.text.length) {
          fragIndex += 1 
          textIndex = 0
        }
        const delay = [",", ".", ":", ";"].includes(char) ? 500 : 1000 / 16 / (fragment.rate ?? 1)
        timeoutId = setTimeout(nextChar, delay + (fragment.endDelay ?? 0))
      }
    }
    nextChar()
    return () => {
      clearTimeout(timeoutId)
      el.innerHTML = ""
    }
  }, [ref, fragments])
  
  return (
    <div ref={ref}></div>
  )
}

interface SelectProps<T> {
  options: T[],
  name: string,
  width?: string,
  value?: T,
  onChange?: (val: T | undefined) => void
}
function Select<T>({ options, name, width = "2rem", value, onChange }: SelectProps<T>) {
  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState(value)

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
        {String(selected)}
        <div style={{
          position: "absolute",
          bottom: "100%",
          width: "100%",
          display: isOpen ? "block" : "none"
        }}>
          {
            options.map((option) =>
            <div
              style={{ textAlign: "end" }}
              onClick={() => {
                setSelected(option)
                onChange?.(selected)
                setOpen(false)
              }}
            >
              {String(option)}
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
