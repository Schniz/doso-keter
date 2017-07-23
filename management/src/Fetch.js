import React from 'react';

export default class Fetch extends React.Component {
  state = {loading: true}

  fetch = props => {
    this.setState({loading: true, data: null, error: null}, () => {
      fetch(this.props.url, this.props.options)
        .then(e => e.json())
        .then(data => ({ data, error: null }))
        .catch(error => ({ error: `${error.message}\n${error.stack}`, data: null }))
        .then(({error, data}) => this.setState({ error, data, loading: false }))
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.fetch(nextProps)
    }
  }

  componentDidMount() {
    this.fetch(this.props)
  }

  render() {
    return this.props.render(this.state);
  }
}
