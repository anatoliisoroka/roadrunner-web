import React from 'react'

export default class MenuShimmer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main-container">
        <div className="shine" style={styles.slideContainer}></div>

        <section className="space--xs bg--secondary">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="shine" style={styles.menuNav}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg--secondary">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-12 col-lg-12">
                <div className="shine" style={{width: 300, height: 45, marginBottom: 26}}></div>
                <div className="row">
                  <div className="col-md-4 mb-5">
                    <div className="menuItem d-flex flex-column shine" style={styles.menuItem}></div>
                  </div>
                  <div className="col-md-4 mb-5">
                    <div className="menuItem d-flex flex-column shine" style={styles.menuItem}></div>
                  </div>
                  <div className="col-md-4 mb-5">
                    <div className="menuItem d-flex flex-column shine" style={styles.menuItem}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const styles = {
  slideContainer: {
    width: '100%',
    height: 500
  },
  menuNav: {
    width: '100%',
    height: 105
  },
  menuItem: {
    border: 'none',
    height: 240,
    borderRadius: 20,
    padding: 20
  }
}