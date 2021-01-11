import React, { Component } from 'react'

import LazyLoader from './LazyLoader'
import AuthManager from '../../../../utils/AuthManager'

import InfiniteScroll from 'react-infinite-scroller'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      items: props.items,
      emptyStateMessage: props.emptyStateMessage
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  handleScroll(e) {
    if (
      document.documentElement.scrollHeight >
      document.body.offsetHeight + window.pageYOffset
    ) {
      return
    }
    this.props.loadMore()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    setTimeout(this.handleScroll, 2000)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  _renderEmptyState() {
    var text = 'Nothing to see here, check back later'
    if (this.props.emptyStateMessage) {
      text = this.props.emptyStateMessage
    }
    if (this.props.isInitialLoading) {
      return null
    }
    return <span>{text}</span>
  }

  render() {
    let { items } = this.state
    if (items.length <= 0 && !this.props.isInitialLoading) {
      return this._renderEmptyState()
    }
    return items.map(item => {
      return this.props.renderItem(item)
    })
  }
}
