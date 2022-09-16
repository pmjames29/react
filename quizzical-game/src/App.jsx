import React from 'react'
import Answer from './Answer'
import {nanoid} from 'nanoid'

export default function App() {

  // Checks if the site is on the intro page
  const [isOnIntro, setIsOnIntro] = React.useState(true)

  // State for initial loading of the questions
  const [questionsData, setQuestionsData] = React.useState([])

  // State for containing the refactored
  const [allQuestions, setAllQuestions] = React.useState([])

  // State for checking if the user has selected to check their answers
  const [checkedAnswers, setCheckedAnswers] = React.useState(false)

  // State used for triggering a reload of questions to play the quiz again
  const [togglePlayAgain, setTogglePlayAgain] = React.useState(false)

  // State that keeps track of the user's quiz score
  const [score, setScore] = React.useState('0')



  // An effect that is used to make an API call to select five multiple choice
  // questions from a database, which is triggered when togglePlayAgain is 
  // flipped
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => setQuestionsData(data.results))
  }, [togglePlayAgain])

  // Effect used to modify the data from the API into an easily usable form
  // whenever a call to the database is made
  React.useEffect(() => {
    setAllQuestions(() => {
      return questionsData.map(question => {
        const answers = []
        for (let i = 0; i < question.incorrect_answers.length; i++) {
          answers.push({id: nanoid(), answer: question.incorrect_answers[i], isSelected: false, isCorrect: false})
        }
        answers.push({id: nanoid(), answer: question.correct_answer, isSelected: false, isCorrect: true})

        // Use the Knuth Shuffle Algorithm to randomize answer order
        let currentIndex = answers.length, randomIndex
        while(currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [answers[currentIndex], answers[randomIndex]] = [
                answers[randomIndex], answers[currentIndex]
            ]
        }

        return {
          id: nanoid(),
          question: question.question,
          answers: answers,
          correctAnswer: question.correct_answer
        }
      })
    })
  }, [questionsData])
  


  // Function to toggle if the intro page is showing
  function toggleIntro() {
    setIsOnIntro(prevIsOnIntro => !prevIsOnIntro)
  }

  // Used to check the answers of the quiz, and calculate the score
  function checkAnswers() {
    setCheckedAnswers(prevCheckedAnswers => !prevCheckedAnswers)
    let scoreCount = 0;
    for (let i = 0; i < allQuestions.length; i++) {
      const currentQuestion = allQuestions[i]
      for (let j = 0; j < currentQuestion.answers.length; j++) {
        const currentAnswer = currentQuestion.answers[j]
        if (currentAnswer.isCorrect && currentAnswer.isSelected) {
          scoreCount++
        }
      }
    }
    setScore(scoreCount)
  }

  // This function is essentially used when clicking the play again button.
  // It changes the togglePlayAgain state, which will trigger another
  // API call in order to load different questions
  function toggleReplay() {
    setTogglePlayAgain(prevPlayAgain => !prevPlayAgain)
    setCheckedAnswers(prevCheckedAnswers => !prevCheckedAnswers)
    setAllQuestions([])
  }

  // Function used to select an answer among the choices. The reason this is so
  // long is because we need to change the state associated with it, which
  // unfortunately contains all the questions and their respective answers. We
  // also need to make sure to only select one answer at a time.
  function selectAnswer(questionId, answerId) {
    setAllQuestions(prevAllQuestions => {
      return prevAllQuestions.map(question => {
        if (question.id === questionId) {
          const newAnswers = []
          for (let i = 0; i < question.answers.length; i++) {
            if (question.answers[i].id === answerId) {
              newAnswers.push({...question.answers[i], isSelected: !question.answers[i].isSelected})
            } else {
              newAnswers.push({...question.answers[i], isSelected: false})
            }
          }
          return {
            ...question,
            answers: newAnswers
          }
        } else {
          return question
        }
        
      })
    })
  }

  // Returns the content of the intro page, which will be conditionally rendered
  function loadIntroContent() {
    return ( 
      <section className='intro-page'>
            <h1>Quizzical</h1>
            <h3>Test your knowledge with these trivia questions!</h3>
            <button className='intro-page--button' onClick={toggleIntro}>Start Quiz</button>
      </section>
    )
  }

  // Loads the questions and answers as elements, passes function for toggling if it is selected
  // as well as if it is the correct answer and selected
  function loadQuestionsContent() {
    return allQuestions.map(question => {

      // Need to do some cleanup with the API database fetch, quotation marks
      // and apostrophes do not get decoded, therefore we are doing it manually
      let q = question.question
        q = q.replaceAll('&quot;', '\"')
        q = q.replaceAll('&ldquo;', '\"')
        q = q.replaceAll('&rdquo;', '\"')
        q = q.replaceAll('&#039;', '\'')
        q = q.replaceAll('&eacute;', 'é')
        q = q.replaceAll('&amp;', '&')
      
      // Load in each of the answer elements separately for logic purposes,
      // in order to have the desired outcome we want from the quiz.
      const answerElements = question.answers.map(answer => {
        return <Answer 
                key={answer.id} 
                answer={answer.answer} 
                isCorrect={answer.isCorrect}
                isSelected={answer.isSelected} 
                selectAnswer={() => selectAnswer(question.id, answer.id)}
                checkedAnswers={checkedAnswers}
                />
      })

      return (
          <div className='question'>
              <h3>{q}</h3>
              <div className='answers'>
                {answerElements}
              </div>
          </div>
      )
    })
  }


  // Loads the score based on conditional rendering, as well as the button and text based on 
  // if the user has checked their answers or not.
  function loadScoreAndButton() {
    const scoreElements = <p>You scored {score}/5 correct answers</p>
    const checkAnswersButton = <button className='answers-button' onClick={checkAnswers}>Check Answers</button>
    const playAgainButton = <button className='score-button' onClick={toggleReplay}>Play Again</button>
    return (
      <section className='score-and-button'>
        {checkedAnswers && scoreElements}
        {!checkedAnswers && checkAnswersButton}
        {checkedAnswers && playAgainButton}
      </section>
    )
  }

  // Main return for the component, getting all the elements and displaying them based on conditional
  // rendering
  return ( 
    <main>
      {isOnIntro && loadIntroContent()}
      {!isOnIntro && loadQuestionsContent()}
      {!isOnIntro && loadScoreAndButton()}
    </main>
  )
  
}