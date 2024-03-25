import { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const points = good - bad
  const average = points / total
  const positives = (good / total) * 100

  if (total === 0) return "No feedback given"

  return { total, average, positives }
}

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}:</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Button = ({ onClick, feedback, value }) => (
  <div>
    <button onClick={onClick}>{feedback}</button> {value}
  </div>
)

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = Statistics({ good, neutral, bad })

  const handleClick = (value) => {
    const handler = () => {
      if (value === "good") {
        setGood(good + 1)
      }
      if (value === "neutral") setNeutral(neutral + 1)
      if (value === "bad") {
        setBad(bad + 1)
      }
    }
    return handler
  }

  return (
    <>
      <div>
        <h1> Give feedback</h1>
        <Button onClick={handleClick("good")} value={good} feedback="Good"></Button>
        <Button onClick={handleClick("neutral")} value={neutral} feedback="Neutral"></Button>
        <Button onClick={handleClick("bad")} value={bad} feedback="Bad"></Button>
      </div>
      <h1> Statistics</h1>
      <table>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={statistics.total} />
        <StatisticLine text="Average" value={statistics.average} />
        <StatisticLine text="Positives" value={statistics.positives} />
      </table>
    </>
  )
}

export default App
