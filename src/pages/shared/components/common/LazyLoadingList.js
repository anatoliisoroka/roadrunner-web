import React, { Component } from 'react'

import Loader from 'react-loader-spinner'

import LazyLoader from './LazyLoader'
import List from './List'
import AuthManager from '../../../../utils/AuthManager'

export default class LazyLoadingList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: props.endpoint,
      items: [],
      isInitialLoading: true
    }
    this.lazyLoader = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  refresh() {
    this.lazyLoader.current._refresh()
  }

  _renderLoader() {
    if (!this.state.isInitialLoading) {
      return null
    }

    return (
      <div className="col-md-12 text-center">
        <Loader
          type="Oval"
          color={global.Colors.Primary}
          height={60}
          width={60}
        />
      </div>
    )
  }

  render() {
    let { endpoint, items, isInitialLoading } = this.state
    return (
      <LazyLoader
        ref={this.lazyLoader}
        endpoint={endpoint}
        headers={AuthManager.getHeaders()}
        onEndReached="loadMore"
        onItemsUpdated={items =>
          this.setState({ items, isInitialLoading: false })
        }
        onRefresh={items =>
          this.setState({ items: [], isInitialLoading: true })
        }
      >
        <List
          items={items}
          noResultsText={this.props.noResultsText}
          isInitialLoading={this.state.isInitialLoading}
          renderLoader={() => this._renderLoader()}
          renderItem={item => this.props.renderItem(item)}
          loadMore={() => {
            if (this.lazyLoader.current) {
              this.lazyLoader.current._loadMore()
            }
          }}
        />
      </LazyLoader>
    )
  }
}
