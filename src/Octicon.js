/** @babel */
/** @jsx etch.dom */

import octicons from 'octicons'
import etch from 'etch'

/*
  Public: Abstract class for handling the initialization
  boilerplate of an Etch component.
*/
export default class Octicon {
  constructor (props) {
    if (!props || !props.name) {
      throw new Error('The name property is required')
    }
    if (!props.mega) {
      props.mega = false
    }
    if (!props.spin) {
      props.spin = false
    }
    this.props = props

    etch.initialize(this)
    Octicon.setScheduler(atom.views)
  }

  /*
    Public: Gets the scheduler Etch uses for coordinating DOM updates.

    Returns a {Scheduler}
  */
  static getScheduler () {
    return etch.getScheduler()
  }

  /*
    Public: Sets the scheduler Etch uses for coordinating DOM updates.

    * `scheduler` {Scheduler}
  */
  static setScheduler (scheduler) {
    etch.setScheduler(scheduler)
  }

  /*
    Public: Updates the component's properties and re-renders it. Only the
    properties you specify in this object will update – any other properties
    the component stores will be unaffected.

    * `props` an {Object} representing the properties you want to update
  */
  update (props) {
    const oldProps = this.props
    this.props = Object.assign({}, oldProps, props)
    return etch.update(this)
  }

  /*
    Public: Destroys the component, removing it from the DOM.
  */
  destroy () {
    etch.destroy(this)
  }

  render () {
    const {name, className, mega, spin} = this.props
    const classNames = [mega ? 'mega-etch-octicon' : 'etch-octicon', `etch-octicon-${name}`]
    if (spin) {
      classNames.push('spin-etch-octicon')
    }
    if (className) {
      classNames.push(className)
    }

    const octicon = octicons[name].toSVG()
    return (
      <span innerHTML={octicon} className={classNames.join(' ')} />
    )
  }
}
