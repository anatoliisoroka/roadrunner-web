import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import ScriptCache from '../../utils/ScriptCache'
import General from '../../utils/General'

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this._loadJs()
    General.updateModals()
  }

  _loadJs() {
    ScriptCache.loadDefaults()
  }

  render() {
    return (
      <div className="main-container">
        <section className="p-b-0 bg--secondary">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Any issues? Get in touch.</h2>
                <hr />
              </div>
            </div>
            {/*end of row*/}
          </div>
          {/*end of container*/}
        </section>
        <section className=" bg--secondary">
          <div className="container">
            <div className="row justify-content-center no-gutters">
              <div className="col-md-10 col-lg-8">
                <div className="boxed boxed--border">
                  <form
                    className="text-left form-email row mx-0"
                    data-success="Thanks for your enquiry, we'll be in touch shortly."
                    data-error="Please fill in all fields correctly."
                    data-recaptcha-sitekey="6LewhCIUAAAAACSwFvBDhgtTbw6EnW6e9dip8o2u"
                    data-recaptcha-theme="light"
                    noValidate="true"
                  >
                    <div className="col-md-6">
                      <span>Name:</span>
                      <input
                        type="text"
                        name="name"
                        className="validate-required"
                      />
                    </div>
                    <div className="col-md-6">
                      <span>Email Address:</span>
                      <input
                        type="email"
                        name="email"
                        className="validate-required validate-email"
                      />
                    </div>
                    <div className="col-md-12">
                      <span>Message:</span>
                      <textarea
                        rows={5}
                        name="description"
                        className="validate-required"
                        defaultValue={''}
                      />
                    </div>
                    <div className="col-12 col-md-8 boxed">
                      <div className="recaptcha">
                        <div style={{ width: '304px', height: '78px' }}>
                          <div>
                            <iframe
                              src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LewhCIUAAAAACSwFvBDhgtTbw6EnW6e9dip8o2u&co=aHR0cDovL3RyeXN0YWNrLm1lZGl1bXJhLnJlOjgw&hl=en&v=EQY1At-f1G9OIivZUYX73fK0&theme=light&size=normal&cb=ow35zvphhcec"
                              width={304}
                              height={78}
                              role="presentation"
                              name="a-xt2qj0cg2q2n"
                              frameBorder={0}
                              scrolling="no"
                              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            />
                          </div>
                          <textarea
                            id="g-recaptcha-response"
                            name="g-recaptcha-response"
                            className="g-recaptcha-response"
                            style={{
                              width: '250px',
                              height: '40px',
                              border: '1px solid rgb(193, 193, 193)',
                              margin: '10px 25px',
                              padding: '0px',
                              resize: 'none',
                              display: 'none'
                            }}
                            defaultValue={''}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 boxed">
                      <button
                        type="submit"
                        className="btn btn--primary type--uppercase"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/*end of row*/}
          </div>
          {/*end of container*/}
        </section>
      </div>
    )
  }
}
