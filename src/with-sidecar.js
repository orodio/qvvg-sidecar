import React from 'react'
import {Domain} from '@qvvg/sos'

export const withSidecar = (mods = [], opts = {}) => Comp => {
  const Sidecar = Domain(mods)

  class WithSidecar extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.setProps = (props = {}) => {
        if (typeof props !== 'object')
          throw new Error(`sidecar setProps(value) -- value must be an object`)

        setTimeout(() => this.mount && this.setState(props), 0)
        return props
      }
      this.$sidecar = Sidecar.init(props, {
        ...opts,
        inject: {setProps: this.setProps, ...(opts.inject || {})},
      })
    }

    componentDidMount() {
      this.mount = true
    }

    componentWillUnmount() {
      this.mount = false
      Domain.stop(this.$sidecar, 'Unmounted Coupled React Component')
    }

    render() {
      if (this.$sidecar == null) return null
      const label = Sidecar.node.label
      const sidecarProps = {
        [label + 'Sidecar']: Sidecar,
        [label + 'Self']: () => this.$sidecar,
      }
      return <Comp {...sidecarProps} {...this.props} {...this.state} />
    }
  }

  WithSidecar.Sidecar = Sidecar
  return WithSidecar
}
