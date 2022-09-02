import React from 'react'

export default function Answer(props) {

    // Do the same for the answers to ensure there is no issues
    let answer = props.answer
    answer = answer.replaceAll('&quot;', '\"')
    answer = answer.replaceAll('&ldquo;', '\"')
    answer = answer.replaceAll('&rdquo;', '\"')
    answer = answer.replaceAll('&#039;', '\'')
    answer = answer.replaceAll('&eacute;', 'é')
    answer = answer.replaceAll('&amp;', '&')
    
    // For this, we have to do a bunch of checks for certain conditions in order to get the 
    // correct color to pop up for the scenarios that are possible.
    function getStyles() {
        if (props.isSelected) {
            if (props.checkedAnswers) {
                const styles = {
                    backgroundColor: props.isSelected === props.isCorrect ? '#94D7A2' : '#F8BCBC',
                    border: 'none'
                }
                return styles
            } else {
                const styles = {
                    backgroundColor: '#D6DBF5',
                    border: 'none'
                }
                return styles;
            }
        } else if (props.checkedAnswers && props.isCorrect) {
            const styles = {
                backgroundColor: '#94D7A2',
                border: 'none'
            }
            return styles;
        } else {
            const styles = {
                backgroundColor: 'white'
            }
            return styles;
        }
    }

    const styles = getStyles()

    return (
        <button onClick={props.selectAnswer} style={styles}>{answer}</button>
    )
}