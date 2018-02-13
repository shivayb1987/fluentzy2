import React, { PropTypes } from 'react'
import Units from './Units'
import styled from 'styled-components'
import {sections} from './metadata/sections'

const AppComponent = styled.div`
  display: flex;
`

const Section = styled.div`
  margin: 50px;
  border: 1px solid dotted;
`
const Header = styled.div`
  padding: 5px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  border: 1px dotted;
  background-color: lightyellow;
`
const AppArea = styled.div`
  text-align: center;
  margin: 50px 0px 0 0px;
  font-size: 20px;
  font-weight: bold;
  flex: 2;
`
export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      speed: 1000,
      paused: false
    }
  }

  componentDidMount () {
    this.increase()
    let { onClear, onReset } = this.props;

    document.addEventListener('keydown', (event) => {
      let { keyCode } = event;
      if (keyCode === 32) {
        this.pause()
      }
      if (keyCode === 40) {
        this.increase()
      }
      if (keyCode === 38) {
        this.decrease()
      }
    })

  }

  increase = () => {
    this.setState({
      speed: this.state.speed + 200
    })
  }

  decrease = () => {
    this.setState({
      speed: this.state.speed > 0 ? this.state.speed - 200 : 1000
    })
  }

  pause = () => {
      this.setState({
          paused: !this.state.paused
      })
  }

  shuffle = () => {
    this.setState({
      shuffled: !this.state.shuffled
    })
  }

  render () {
    const { speed, paused, shuffled } = this.state
    const { onClick } = this.props
    return (
      <AppComponent>
        <Section>
          <div>Click a topic to begin!</div>
          {sections.map((section, index) => <Header key={index} onClick={() => onClick(section.replace(/ /g, ''))}>{section}</Header>)}
        </Section>
        <AppArea>
            <div className='plus' onClick={this.shuffle}>&#128256;</div>
            <span className='speed'>Speed: {this.state.speed/1000}s </span>
            <div className='plus' onClick={this.decrease}>+</div><div className='minus' onClick={this.increase}>-</div>
          <Units value={this.props.value} speed={speed} paused={paused} shuffled={shuffled}/>
        </AppArea>
      </AppComponent>
    )
  }
}

App.propTypes = {
}
