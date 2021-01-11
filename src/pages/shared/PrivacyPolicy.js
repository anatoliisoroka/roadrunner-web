import React from 'react'
import Logo from './components/common/Logo'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import NavBar from '../customer/components/NavBar'
import Footer from '../customer/components/Footer'
import { withRouter } from 'react-router-dom'
class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this._scrollToTop()
  }

  _scrollToTop() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <div className="main-container">
          <section>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <h1 className="text-center">
                    Roadrunner Platform Terms and Conditions and Terms of Use
                  </h1>
                  <p>
                    This page (together with the documents referred to in it)
                    tells you the terms (the "Terms of Use") which apply when
                    you access Roadrunner's ("us", "we" "our") website at
                    www.roadrunner.menu (the "Website") and the Roadrunner
                    mobile application (the "App") (together "the Platform")
                    whether to browse or to order products (the "Products") from
                    our restaurant partners ("Partners"). Reference to the
                    Platform throughout these Terms of Use includes any current
                    or future version of the Website and the App through which
                    you order Products.
                  </p>
                  <p>
                    By accessing the Platform, whether as a guest or registered
                    user, you agree to be bound by these Terms. If you do not
                    agree to be bound by these Terms of Use, you should leave
                    the Platform immediately. You should read these Terms of Use
                    carefully before accessing and/or ordering any Products on
                    the Platform. If you have any questions relating to these
                    Terms of Use please contact eamon@roadrunner.menu before you
                    use the Platform to place an order.
                  </p>
                  <p>
                    We reserve the right amend or vary these Terms of Use from
                    time to time and will do so on this page. If we make any
                    changes which affect your rights in relation to our Services
                    (defined below), we will notify you. You should print a copy
                    of these Terms of Use for future reference. These Terms are
                    only available in the English language.
                  </p>
                  <p>
                    Use of your personal information submitted on the Platform
                    is governed by our Privacy Policy which is available at
                    [INSERT LINK]
                  </p>
                  <h4>1. INFORMATION ABOUT US</h4>
                  <p>
                    The Platform is operated by Roadrunner app Limited ("we",
                    "us" or "Roadrunner"), incorporated and registered in
                    Northern Ireland , whose registered office is at 64
                    Rostrevor rd Warrenpoint Our Company registration number is
                    NI663075.
                  </p>
                  <h4>2. OTHER TERMS THAT APPLY</h4>
                  <p>
                    These terms of use refer to the following additional terms,
                    which also apply to your use of our Platform:
                  </p>
                  <ul>
                    <li>Our Privacy Policy [INSERT LINK]; and</li>
                    <li>
                      If you purchase Products from our Platform, our{' '}
                      <a
                        onClick={() =>
                          this.props.history.push('/terms-conditions')
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        Terms of Service
                      </a>{' '}
                      will apply to the sales.
                    </li>
                  </ul>
                  <p />
                  <h4>3. CHANGES TO THE PLATFORM</h4>
                  <p>
                    We may update and change our Platform from time to time to
                    reflect changes to the Products, changes to our Partners'
                    information, our users' needs and our business priorities.
                  </p>
                  <h4>4. ACCESSING OUR PLATFORM</h4>
                  <p>
                    Our Platform is made available free of charge.
                    <br />
                    We do not guarantee that the Platform or any content on it
                    will always be available or be uninterrupted. While we try
                    to ensure the Platform is normally available 24 hours a day,
                    we do not undertake any obligation to do so, and we will not
                    be liable to you if the Platform is unavailable at any time
                    or for any period. You acknowledge that we will carry out
                    maintenance on the Platform from time to time, and the
                    Platform may have limited or no availability during these
                    times.
                    <br />
                    We may suspend or withdraw or restrict the availability of
                    all or any part of the Platform for business and operational
                    reasons. We will try to give you reasonable notice of any
                    suspension or withdrawal.
                    <br />
                    You are also responsible for ensuring that all persons who
                    access our Platform through your internet connection are
                    aware of these Terms of Use and other applicable terms and
                    conditions, and that they comply with them.
                    <br />
                    Our Platform is directed to people residing in Northern
                    Ireland and the Republic of Ireland. The Services are not
                    available in other locations. <br />
                    We will not be liable if, for any reason, the Platform is
                    unavailable at any time or for any period. <br />
                    You are responsible for updating the App periodically as
                    updates are released. <br />
                    If you open a Roadrunner account you must treat your
                    username and password as confidential. You must not disclose
                    it to any third party. We have the right to disable any user
                    identification code or password, whether chosen by you or
                    allocated by us, at any time, if in our reasonable opinion
                    you have failed to comply with any of the provisions of
                    these Terms of Use. If you know or suspect that anyone other
                    than you knows your user identification code or password,
                    you must promptly notify us at eamon@roadrunner.menu We
                    shall not be liable to you for any unauthorised access to
                    your account, save for where the unauthorised access has
                    been caused by a breach of our system.
                    <br />
                    The transmission of information via the Internet is not
                    totally secure. Although we take the steps required by law
                    to secure your information, we cannot guarantee the security
                    of information, including your data to the Platform, and as
                    such, any transmission is entirely at your own risk.
                    <br />
                    Any of the material on our Platform may be out of date at
                    any given time, and we are under no obligation to update
                    such material.
                    <br />
                    We do not guarantee that our Platform will be secure or free
                    from bugs or viruses. You are responsible for configuring
                    your information technology, computer programmes and
                    platform to access our Platform. You should use your own
                    virus protection software.
                  </p>
                  <h4>5. PROHIBITED USES</h4>
                  <p>
                    You may use our Platform only for lawful purposes. You may
                    not use our Platform in any way that breaches any applicable
                    local, national or international law or regulation, in any
                    way that is unlawful or fraudulent, or has any unlawful or
                    fraudulent purpose or effect, for the purpose of harming or
                    attempting to harm minors in any way, to bully, insult,
                    intimidate or humiliate any person, to send, knowingly
                    receive, upload, download, use or re-use any material which
                    does not comply with our content standards (see below), to
                    transmit, or procure the sending of, any unsolicited or
                    unauthorised advertising or promotional material or any
                    other form of similar solicitation (spam), to knowingly
                    transmit any data, send or upload any material that contains
                    viruses, Trojan horses, worms, time-bombs, keystroke
                    loggers, spyware, adware or any other harmful programs or
                    similar computer code designed to adversely affect the
                    operation of any computer software or hardware. You must not
                    attack our Platform via a denial-of-service attack or a
                    distributed denial-of service attack. By breaching this
                    provision, you would commit a criminal offence under the
                    Computer Misuse Act 1990. We will report any such breach to
                    the relevant law enforcement authorities and we will
                    co-operate with those authorities by disclosing your
                    identity to them. In the event of such a breach, your right
                    to use our Platform will cease immediately.
                    <br />
                    You also agree not to reproduce, duplicate, copy or re-sell
                    any part of our Platform in contravention of the provisions
                    of these Terms of Use.
                    <br />
                    You also agree not to access without authority, interfere
                    with, damage or disrupt any part of the Platform, any
                    equipment or network on which the Platform is stored, any
                    software used in the provision of our Platform or any
                    equipment or network or software owned or used by any third
                    party.
                  </p>
                  <h4>6. INTELLECTUAL PROPERTY RIGHTS</h4>
                  <p>
                    We are the owner or the licensee of all intellectual
                    property rights in our Platform, and in the material
                    published on it. Those works are protected by copyright laws
                    and treaties around the world. All such rights are reserved.
                    <br />
                    You may print off one copy, and may download extracts, of
                    any page(s) from our Platform for your personal use and you
                    may draw the attention of others to content posted on our
                    Platform. You must not modify the paper or digital copies of
                    any materials you have printed off or downloaded in any way,
                    and you must not use any illustrations, photographs, video
                    or audio sequences or any graphics separately from any
                    accompanying text. Our status (and that of any identified
                    contributors) as the authors of content on our Platform must
                    always be acknowledged.
                    <br />
                    You must not use any part of the content on our Platform for
                    commercial purposes without obtaining a licence to do so
                    from us or our licensors.
                    <br />
                    If you print off, copy or download any part of our Platform
                    in breach of these terms of use, your right to use our
                    Platform will cease immediately and you must, at our option,
                    return or destroy any copies of the materials you have made.
                    <br />
                    "Roadrunner" and its logo are UK and ROI registered
                    trademarks of Eamon Breen. You are not permitted to use them
                    without our approval.
                  </p>
                  <h4>7. UPLOADING CONTENT TO OUR PLATFORM</h4>
                  <p>
                    Whenever you make use of a feature that allows you to upload
                    content to our Platform, such as submitting a review, you
                    must comply with the content standards set out at clause 8.
                    <br />
                    You warrant that any such contribution does comply with
                    those standards, and you will be liable to us and our
                    Partners (or any other third party) and indemnify us and our
                    Partners (and any other third party) for any breach of that
                    warranty. This means you will be responsible for any loss or
                    damage we, our Partners (or any third party) suffer as a
                    result of your breach of warranty.
                    <br />
                    Any content you upload to our Platform will be considered
                    non-confidential and non-proprietary. You retain all of your
                    ownership rights in your content, but you grant us and our
                    Partners, a limited licence to use, store, sell and copy
                    that content and to distribute and make it available to
                    third parties for any business purposes.
                    <br />
                    We also have the right to disclose your identity to any
                    third party who is claiming that any content posted or
                    uploaded by you to our Platform constitutes a violation of
                    their intellectual property rights, or of their right to
                    privacy.
                    <br />
                    We have the right, (but do not undertake, except as required
                    by law, any obligation), and have the sole discretion to
                    remove any material posted, uploaded, or transmitted to the
                    Platform if, in our opinion, the material does not comply
                    with the content standards set out at clause 8, is
                    objectionable or may expose us, our Partners or any third
                    parties to harm or liability of any kind, or for any other
                    reason. <br />
                    You are solely responsible for securing and backing up your
                    content.
                  </p>
                  <h4>8. CONTENT STANDARDS</h4>
                  <p>
                    These content standards apply to any and all material which
                    you contribute to our Platform, including reviews, (
                    <strong>Contribution</strong>), and to any interactive
                    services associated with it.
                  </p>
                  <p>
                    The Content Standards must be complied with in spirit as
                    well as to the letter. The standards apply to each part of
                    any Contribution as well as to its whole.
                  </p>
                  <p>
                    We will determine, in its discretion, whether a Contribution
                    breaches the Content Standards. A Contribution must be
                    accurate (where it states facts), be genuinely held (where
                    it states opinions), comply with the law applicable in
                    Northern Ireland and in any country from which it is posted.
                  </p>
                  <p>A Contribution must not:</p>
                  <ul>
                    <li>
                      Be defamatory of any person, threatening, abusive or
                      invasive of another's privacy, obscene, offensive, hateful
                      or inflammatory, bully, insult, intimidate or humiliate
                      any person
                    </li>
                    <li>
                      Promote sexually explicit material, violence,
                      discrimination based on race, sex, religion, nationality,
                      disability, sexual orientation or age.
                    </li>
                    <li>
                      Infringe any copyright, database right or trade mark of
                      any other person.
                    </li>
                    <li>Be likely to deceive any person.</li>
                    <li>
                      Breach any legal duty owed to a third party, such as a
                      contractual duty or a duty of confidence.
                    </li>
                    <li>
                      Promote any illegal activity or be in contempt of court.
                    </li>
                    <li>
                      Impersonate any person, or misrepresent your identity or
                      affiliation with any person.
                    </li>
                    <li>
                      Give the impression that the Contribution emanates from
                      us, if this is not the case.
                    </li>
                    <li>
                      Advocate, promote, incite any party to commit, or assist
                      any unlawful or criminal act such as (by way of example
                      only) copyright infringement or computer misuse.
                    </li>
                    <li>
                      Contain a statement which you know or believe, or have
                      reasonable grounds for believing, that members of the
                      public to whom the statement is, or is to be, published
                      are likely to understand as a direct or indirect
                      encouragement or other inducement to the commission,
                      preparation or instigation of acts of terrorism.
                    </li>
                    <li>
                      Contain any advertising or promote any services or web
                      links to other sites or services similar to our Services.
                    </li>
                  </ul>
                  <h4>9. SUSPENSION AND TERMINATION</h4>
                  <p>
                    When we consider that a breach of these Terms of Use has
                    occurred, we may take such action as we deem appropriate.
                    Failure to comply with section 5 (Prohibited Use) and/or 6
                    (Intellectual Property Rights) and/or 8 (Content Standards)
                    in these Terms of Use constitutes a material breach of the
                    Terms of Use, and may result in our taking all or any of the
                    following actions:
                  </p>
                  <ul>
                    <li>
                      Immediate, temporary or permanent withdrawal of your right
                      to use our Platform;
                    </li>
                    <li>
                      Immediate, temporary or permanent removal of any
                      Contribution uploaded by you to our Platform;
                    </li>
                    <li>Issue of a warning to you;</li>
                    <li>
                      Legal proceedings against you for reimbursement of all
                      costs on an indemnity basis (including, but not limited
                      to, reasonable administrative and legal costs) resulting
                      from the breach.
                    </li>
                    <li>Further legal action against you.</li>
                    <li>
                      Disclosure of such information to law enforcement
                      authorities as we reasonably feel is necessary or as
                      required by law.
                    </li>
                  </ul>
                  <p>
                    The actions described in this clause are not limited, and we
                    may take any other action we reasonably deem appropriate.
                  </p>
                  <h4>10. RELIANCE ON INFORMATION POSTED</h4>
                  <p>
                    The content on our Platform is provided for general
                    information only. It is not intended to amount to advice on
                    which you should rely.
                    <span className="Apple-converted-space">&nbsp;</span>
                  </p>
                  <p>
                    Although we make reasonable efforts to update the
                    information on our Platform, we make no representations,
                    warranties or guarantees, whether express or implied, that
                    the content on our Platform is accurate, complete or up to
                    date.
                  </p>
                  <p>
                    Any images of Products displayed on the Platform are for
                    indicative purposes only and may not be an actual image of
                    the Products produced by a particular Partner, or
                    representative of food you will receive from a Partner.
                    <span className="Apple-converted-space">&nbsp;</span>
                  </p>
                  <h4>11. OUR LIABILITY</h4>
                  <p>
                    We do not exclude or limit in any way our liability to you
                    where it would be unlawful to do so. This includes liability
                    for death or personal injury caused by our negligence or the
                    negligence of our employees, agents or subcontractors and
                    for fraud or fraudulent misrepresentation.
                  </p>
                  <p>
                    Different limitations and exclusions of liability will apply
                    to liability arising as a result of the supply of any
                    Products to you, which will be set out in our Terms of
                    Service available at&nbsp;
                    <span className="s3">[INSERT LINK].</span>
                  </p>
                  <p>
                    Please note that we only provide our Platform for domestic
                    and private use. You agree not to use our Platform for any
                    commercial or business purposes, and to the maximum extent
                    permitted by law, we exclude all liability to you or any
                    third party for loss or damage which you or any third party
                    incur in connection with our Platform, Services or any
                    material posted on our Platform including use of, or
                    inability to use, our Platform or use of or reliance on any
                    content displayed on our Platform.
                  </p>
                  <p>
                    We will not be responsible for any errors or omissions in
                    relation to any content on the Platform, including
                    user-generated content, or for any technical problems you
                    experience as a result of using the Platform.
                    <span className="Apple-converted-space">&nbsp;</span>
                  </p>
                  <p>
                    If we become aware of any inaccuracies, errors or omissions
                    on the Platform, we will attempt to correct these as soon as
                    we can.
                  </p>
                  <h4>12. YOUR DATA</h4>
                  <p>
                    We collect certain data about you as a result of you using
                    our Platform, and this is set out in in our Privacy Policy
                    available at&nbsp;<span className="s3">[INSERT LINK]</span>
                  </p>
                  <h4>13. SITES WE LINK TO</h4>
                  <p>
                    Where our Platform contains links to other sites and
                    resources provided by third parties, these links are
                    provided for your information only. Such links should not be
                    interpreted as approval by us of those linked websites or
                    information you may obtain from them.
                  </p>
                  <p>
                    We have no control over the contents of those sites or
                    resources.
                  </p>
                  <h4>14. RULES ABOUT LINKING TO OUR PLATFORM</h4>
                  <p>
                    You may link to our Website home page, or App, provided you
                    do so in a way that is fair and legal and does not damage
                    our reputation or take advantage of it.
                  </p>
                  <p>
                    You must not establish a link in such a way as to suggest
                    any form of association, approval or endorsement on our part
                    where none exists.
                  </p>
                  <p>
                    You must not establish a link to our Platform in any website
                    that is not owned by you.
                  </p>
                  <p>
                    Our Platform must not be framed on any other site, nor may
                    you create a link to any part of our Platform other than the
                    home page. We reserve the right to withdraw linking
                    permission without notice.
                  </p>
                  <p>
                    The website in which you are linking must comply in all
                    respects with the content standards set out in clause 8 of
                    these Terms of Use.
                  </p>
                  <h4>15. NO RESPONSIBILITY FOR USER-GENERATED CONTENT</h4>
                  <p>
                    The Platform may include information and materials uploaded
                    by other users of the Platform, including reviews. This
                    information and these materials have not been verified or
                    approved by us. The views expressed by other users on our
                    Platform do not represent our views or values.
                  </p>
                  <h4>16. QUERIES</h4>
                  <p>
                    If you have any concerns about material which appears on our
                    Service, please contact
                    <a
                      style={{ paddingLeft: 4 }}
                      href="mailto:eamon@roadrunner.menu"
                    >
                      eamon@roadrunner.menu
                    </a>
                  </p>
                  <h4>17. VARIATIONS</h4>
                  <p>
                    We may revise these terms of use at any time by amending
                    this page. You are expected to check this page from time to
                    time to take notice of any changes we make, as they are
                    binding on you.
                  </p>
                  <h4>18. JURISDICTION AND APPLICABLE LAW</h4>
                  <p>
                    The courts of Northern Ireland courts will have exclusive
                    jurisdiction over any claim arising from, or related to, a
                    visit to our Platform or use of our Services. These Terms of
                    Use and any dispute or claim arising out of or in connection
                    with them or their subject matter or formation (including
                    non-contractual disputes or claims) shall be governed by and
                    construed in accordance with the laws of Northern Ireland.
                  </p>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </section>
        </div>
      </div>
    )
  }
}
export default withRouter(PrivacyPolicy)
