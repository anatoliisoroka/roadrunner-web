import React from 'react'
import Logo from './components/common/Logo'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import NavBar from '../customer/components/NavBar'
import Footer from '../customer/components/Footer'
class Terms extends React.Component {
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
                  <h1 className="text-center">Roadrunner Terms of Service</h1>
                  <p>
                    This page (together with the documents referred to in it)
                    tells you the terms (the "Terms") which apply when you use
                    Roadrunner's ("us", "we" "our") website at
                    www.roadrunner.menu(the "Website") and the Roadrunner mobile
                    application (the "App") (together "the Platform") to order
                    products (the "Products") from our restaurant partners
                    ("Partners"). Reference to the Platform throughout these
                    Terms includes any current or future version of the Website
                    and the App through which you order Products.
                  </p>
                  <p>
                    By ordering Products on the Platform, you agree to be bound
                    by these Terms. Use of the Platform is governed by the
                    Platform Terms of Use, which can be found at{' '}
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.history.push('/privacy-policy')}
                    >
                      Terms of Use
                    </a>
                    . If you do not agree to be bound by these Terms or the
                    Platform Terms of Use, you should leave the Platform
                    immediately and refrain from placing any orders for
                    Products. You should read these Terms carefully before
                    ordering any Products on the Platform. If you have any
                    questions relating to these Terms please
                    contact&nbsp;[eamon@roadrunner.menu] before you use the
                    Platform to place an order.
                  </p>
                  <p>
                    We reserve the right to amend or vary these Terms from time
                    to time and will do so on this page. If we make any changes
                    which affect your rights in relation to our Services
                    (defined below), we will notify you. Changes to the Terms
                    will not affect any orders you have placed where we have
                    sent you Confirmation (defined below). You should print a
                    copy of these Terms for future reference. These Terms are
                    only available in the English language.
                  </p>
                  <p>
                    Use of your personal information submitted on the Platform
                    is governed by our Privacy Policy which is available at{' '}
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.history.push('/privacy-policy')}
                    >
                      Privacy Policy
                    </a>
                  </p>
                  <h4>1. ABOUT US</h4>
                  <p>
                    Roadrunner is operated by Roadrunner App Limited, a company
                    incorporated and registered in [ Northern Ireland ], whose
                    registered office is at [ 64 Rostrevor Road, Warrenpoint,
                    BT34 3RU• ]. Our Company registration number is [ NI663075
                    ]. You may contact us at [ eamon@roadrunner,menu ]&nbsp;or
                    by phone on [ 07716137341 ].
                  </p>
                  <h4>2. YOUR STATUS</h4>
                  <p>
                    By placing an order for Products on the Platform, you
                    warrant that you have the legal ability to enter into a
                    binding contract with the Partner for the purchase of
                    Products, and you are at least 18 years old. You also
                    confirm that you are using the Services for personal,
                    non-commercial use.
                  </p>
                  <h4>3. OUR SERVICES AND ROLE</h4>
                  <p>
                    We provide you with a way to order Products from our
                    Partners using the Platform (the "Services"). We act as an
                    agent on behalf of the Partner to complete the order for
                    Products from the Platform and to offer updates and other
                    communications during the ordering process. Your Products
                    will be delivered by our delivery personnel and/or our
                    Partners, to the address provided by you when ordering. The
                    legal contract for the purchase of Products from the Partner
                    is between you and the Partner.
                    <br />
                    We will endeavour to make the Platforms available 24 hours a
                    day, however we do not undertake any obligation to do so,
                    and we will not be liable to you if the Platform is
                    unavailable at any time or period. You acknowledge that we
                    will carry out maintenance on the Platforms from time to
                    time, and the Platforms may have limited or no availability
                    during these times.
                    <br />
                    The Services in respect of certain Partners may not be
                    available in your area. Each Partner has their own operating
                    area and opening hours, which are within their control and
                    at their discretion. This means our Service availability and
                    range of Partners available to you is dependent on the
                    operating hours of our Partners, and your location. Our
                    Services are only available in Northern Ireland and the
                    Republic of Ireland.
                    <br />
                    If you attempt to order Products to a location outside the
                    delivery area or operating hours of a Partner, or the
                    Platform is otherwise unavailable for any reason, we will
                    notify you.
                  </p>
                  <h4>4. OPENING A ROADRUNNER ACCOUNT</h4>
                  <p>
                    You will need to create a Roadrunner account with us before
                    you can order Products on the Platform. When you open a
                    Roadrunner account you will be asked to provide your
                    personal details including name, address, date of birth,
                    credit card details and you will be asked to create a unique
                    password to access your account. You will be responsible for
                    entering this data accurately, and for keeping any password
                    you create secret, and prevent others from accessing your
                    account. Your personal details will be processed by us in
                    accordance with our Privacy Policy.
                    <br />
                    We are not responsible for any losses you suffer as a result
                    of an unauthorised person accessing your account, unless the
                    reason for the unauthorised access is due to us not keeping
                    your account secure.
                  </p>
                  <h4>5. ORDERING PROCESS</h4>
                  <p>
                    It is important that you check the Products you have ordered
                    and correct any errors before submitting your order, as once
                    you do so, you will have entered into a contract with the
                    Partner, and any errors cannot be corrected (subject to
                    clause 10 below).
                    <br />
                    You will be asked to select your payment method. Payment
                    will be taken via our third party payment operator, Stripe,
                    Inc. (Stripe). Where the payment method you have selected is
                    not authorised, your order will not be confirmed or sent to
                    the Partner.
                    <br />
                    Once payment is authorised by Stripe, we will send your
                    order to the Partner, and notify you on the Platform that
                    your order has been received and is being processed by the
                    Partner ("Confirmation"). The contract between you and the
                    Partner for the supply of the Products to you comes into
                    existence when we send you the Confirmation. Please note
                    that a Confirmation does not necessarily mean the order will
                    be fulfilled by the Partner. The Partner has the ability to
                    reject orders at any time, for example, because they are too
                    busy. We will notify you as soon as reasonably practicable
                    by email or on the Platform if a Partner has rejected an
                    order. Please see clause 10 for the process on rejected
                    orders.
                    <br />
                    You are responsible for:
                  </p>
                  <ul>
                    <li>paying for all Products ordered using your account;</li>
                    <li>paying related delivery charges, and</li>
                    <li>
                      complying with these Terms, even if you have ordered on
                      behalf of someone else.
                    </li>
                  </ul>
                  You acknowledge that some Partners operate a minimum order
                  value policy and this will be notified to you on the Platform.
                  All Products are subject to availability.
                  <p />
                  <h4>6. FOOD ALLERGIES AND INTOLERANCES</h4>
                  <p>
                    Our Partners have an obligation to provide us with
                    up-to-date information in respect of menus. We will include
                    this on the Platforms. Where this information includes
                    allergy or dietary information, we will use reasonable
                    endeavours to accurately display this information on our
                    Platforms.
                    <br />
                    If you have a food allergy or intolerance, you acknowledge
                    that it is your responsibility to check that the Products
                    are suitable for you, and to notify the Partner of any food
                    allergy or intolerance before placing an order for Products.
                    You should always contact the Partner directly, and you
                    should not use the Platform for this purpose.
                    <br />
                    We cannot guarantee that any of the Products sold by our
                    Partners are free from allergens. We shall not be liable for
                    any claim for direct, indirect, special or consequential
                    loss or damage to you or anyone else arising from any
                    inaccurate information provided to us by the Partner and/or
                    displayed on our Platform in relation to allergies or
                    dietary requirements, and/or the act, omission or negligence
                    of the Partner in relation to allergies or dietary
                    requirements.
                  </p>
                  <h4>7. ALCOHOL</h4>
                  <p>
                    You acknowledge that it is an offence for a person under the
                    age of 18 to buy or attempt to buy alcohol, or for a person
                    over 18 to buy or attempt to buy alcohol for someone who is
                    under the age of 18.
                    <br />
                    If the Products you have ordered include alcohol, you are
                    confirming that you are at least 18 years old. You will be
                    asked to provide proof of age on delivery of your order.
                    Roadrunner operates the "Challenge 25" age verification
                    policy which means customers who look under 25 will be asked
                    by our delivery personnel to provide proof that they are
                    aged 18 or over. Our delivery personnel may refuse to
                    deliver any alcohol to any person [who does not look 25]
                    unless they can provide valid photo ID proving that they are
                    aged 18 or over. The Partner and the delivery personnel may
                    also refuse to deliver any alcohol to any person who they
                    believe is buying alcohol on behalf of someone who is under
                    the age of 18, or who is, or appears to be, under the
                    influence of either alcohol and/or drugs. If delivery of
                    alcohol is refused for any reason, you will still be charged
                    for the Products and delivery.
                  </p>
                  <h4>8. PARTNER OFFERS</h4>
                  <p>
                    Partners can make special offers available through the
                    Platform, at their discretion which will be set out on their
                    menu. Offers can be withdrawn at any time, unless you have
                    received a Confirmation or the offer terms state a fixed
                    period of availability.
                  </p>
                  <h4>9. DELIVERY PROCESS</h4>
                  <p>
                    When you place an order you will have the choice to have it
                    placed for delivery 'now' or at a specified time. For a
                    delivery 'now' we will tell you an estimated delivery time
                    for your Products before you place the order but you must be
                    available to accept delivery from the time you place the
                    order.
                    <br />
                    For delivery at a specified time, we will give you an
                    estimated delivery time, and you must be available to accept
                    delivery for [1 hour] before and after the time.
                    <br />
                    Estimated times for deliveries are only estimates, and we
                    and our Partners cannot guarantee that orders will be
                    delivered on time. If your order is more than 1 hour late
                    and this is not due to a Customer Fault (defined below) we
                    will notify you, and give you the option to cancel your
                    order. If you choose cancel your order in these
                    circumstances, you will receive a refund for the Products in
                    accordance with clause 10.
                    <br />
                    We will attempt delivery at the address you provide on the
                    Platform when you place your order. You are responsible for
                    entering this accurately. You can change the delivery
                    address after the order has been placed by ringing the
                    restaurant if the order has not been dispatched and if the
                    new address is in the Partner's delivery area. If we cannot
                    change the delivery address, you have the option to cancel
                    the order, but if food preparation has started you will be
                    charged the full price for the Products, and if the driver
                    has been despatched you will also be charged for delivery.
                    <br />
                    You will still be charged for the Products and for delivery
                    in the event that a delivery cannot be completed because of
                    circumstances caused by you ("Customer Fault"). A Customer
                    Fault might be caused by the following reasons (including
                    but not limited to):
                    <br />
                  </p>
                  <ul>
                    <li>You do not come to the door to accept delivery;</li>
                    <li>
                      The driver is unable to find a safe location to leave the
                      food;
                    </li>
                    <li>
                      You provided a misleading, confusing or ambiguous delivery
                      address;
                    </li>
                    <li>You provided an incorrect delivery address;</li>
                    <li>
                      The driver refuses to deliver the Products to you in
                      accordance with clause 7 (Alcohol), or if your behaviour
                      is intimidating, rude, violent or aggressive;
                    </li>
                    <li>You cancelled the order after dispatch.</li>
                  </ul>
                  <p />
                  <h4>10. CANCELLATION</h4>
                  <p>
                    Once an order for Products has been submitted and your
                    payment method has been authorised, you will not be able to
                    change or cancel your order, or be entitled to a refund
                    (subject to clause 11 below). If you wish to cancel your
                    order, you can contact our customer care team on 07716137341
                    and we will attempt to contact the Partner to amend or
                    cancel your order as requested. However, we cannot guarantee
                    that we will be able to make contact with the Partner, or
                    that the Partner will be able to comply with your request.
                    <br />
                    If you cancel an order after the Partner has started to
                    prepare it, you will be charged full price for the Products,
                    and if our delivery personnel have already left to begin
                    delivery, you will also be charged for delivery, together
                    with any applicable Service Fees.
                    <br />
                    Partners may reject an order at any time, for example, if
                    they are too busy, as set out at paragraph 5. We and the
                    Partner may notify you that an order has been rejected at
                    any time. You will not be charged for any orders rejected by
                    us or the Partner, and we will reimburse you for any payment
                    already made using the same method you used to pay for your
                    order. Because of banking procedures, a refund may take 3 to
                    5 working days (or longer, depending on your bank or card
                    issuer) to appear in your account, as set out at clause 11
                    below). You acknowledge and agree that neither we or our
                    Partner are liable to you in respect of any delay by your
                    bank or card issuer to release funds back into your account.
                  </p>
                  <h4>11. PRICES AND PAYMENT</h4>
                  <p>
                    Payment for all Products and deliveries can be made on our
                    Platform by credit or debit card or cash when applicable.
                    Where the option to pay by cash is available, this will be
                    made clear to you on our Platform before you place your
                    order. Online payment will be taken by Stripe, and is made
                    directly to Roadrunner as agent on behalf of the Partner. We
                    are authorised by the Partners to accept payment on their
                    behalf in this way. Once you place your order and your
                    payment has been authorised by Stripe, your bank or card
                    issuer will allocate the full amount of your order for
                    payment for 3 to 5 working days (or more, depending on your
                    bank or card issuer). The amount for the order which has
                    been allocated will not appear in your available balance
                    during that period. Payment will be debited from your
                    account or charged to your card when funds are received by
                    us from your bank or card issuer. Sometimes payment can take
                    up to sixty (60) days to be debited from your account or
                    charged to your credit card, due to delays in processing, or
                    depending on your card issuer or bank. If the order is
                    rejected by the Partner in accordance with clause 9, the
                    allocated amount will be released back into your account as
                    a refund, which may take 3 to 5 working days (or longer,
                    depending on your bank or card issuer) to appear in your
                    account. You acknowledge that we, nor the Partner, are
                    liable for any delay by your bank or card issuer to release
                    funds to us, or release refunds back into your account.
                    <br />
                    Prices for Products are as set out on the Platform, and are
                    inclusive of VAT but exclude delivery costs and any service
                    fees we may charge ("Service Fees"). These will be notified
                    to you and added to the total amount prior to purchase, if
                    applicable. We reserve the right to change the Service Fees
                    at any time. Total price of your order will be set out at
                    the checkout page on the Platform, including total Product
                    price, delivery price, taxes (including VAT) and applicable
                    Service Fees.
                    <br />
                    Prices of Products and delivery may change while you are
                    browsing the Platform, and may also change at any time at
                    the discretion of the Partner. Price changes will not affect
                    existing confirmed orders or any orders in progress provided
                    you complete the order within 2 hours of starting it.
                    <br />
                    If you make payment online via debit or credit card, you may
                    be asked to produce the debit or credit card at the time of
                    delivery of the Products to you, as proof of identity.The
                    Platform contains a large number of menus, and there is a
                    possibility that some of the menus may include incorrect
                    pricing. If there is an obvious pricing mistake we will
                    notify you as soon as we can and you can either confirm the
                    order at the correct price or cancel the order without
                    charge and a full refund of any amounts paid.
                  </p>
                  <h4>12. DISCRETIONARY PAYMENTS</h4>
                  <p>
                    You can make a discretionary payment of a tip or gratuity to
                    us at checkout. You will be given this option at checkout.
                    100% of the discretionary payment made by you will be given
                    to your delivery personnel.
                  </p>
                  <h4>13. YOUR RIGHTS</h4>
                  <p>
                    We take customer care seriously and subject to paragraph 10,
                    we will try to assist you if you have any problems with your
                    order. You can contact our customer care team at 07716137341
                    If you are dissatisfied with the Services, the performance
                    of the Platform or the manner of our delivery personnel
                    please contact our customer care team at
                    eamon@roadrunner.menu
                    <br />
                    If you have a problem with the Products, or with the service
                    provided by the Partner, for example, if your order is
                    taking longer than anticipated, or if your order is
                    incorrect, you can contact our customer care team on the
                    number set out above, and they will attempt to contact the
                    Partner to attempt to follow up on the query. If you wish to
                    cancel or amend your order, you may contact the customer
                    care team as set out at paragraph 10, however we cannot
                    guarantee that our team will be able to get in contact with
                    the Partner, or that they will be able to accommodate your
                    request.
                    <br />
                    You have a legal right to receive goods which comply with
                    their description, which are of satisfactory quality and
                    which are compliant with any specific requirements you tell
                    us about (and we agree to) before you place your order. If
                    you do not believe the Products are in compliance with this,
                    or if are dissatisfied with the quality of the Products or
                    the service provided by the Partner, please contact the
                    Partner directly to make your complaint, and follow the
                    Partner's complaint procedures. If you are unable to make
                    contact with the Partner, or if the Partner refuses to deal
                    with your complaint, please contact our customer care team
                    as outlined above, within 48 hours of placing your order. We
                    may request a photograph showing the problem. Our customer
                    care team will attempt to contact the Partner on your
                    behalf. Please note that the contract for the supply and
                    purchase of the Products is between you and the relevant
                    partner. We have no control over the services they provide
                    or the Products they supply, and we shall be in no way
                    liable to you for any act, omission or negligence by the
                    Partner, or for any compensation that you believe is due to
                    you from a Partner. We do not give any undertaking that the
                    Products ordered from any Partner are of satisfactory
                    quality or suitable for your purpose and we disclaim any
                    such warranties.
                    <br />
                    We will pay any refund to you on behalf of the Partner, if
                    instructed to do so by the Partner. We may ask you for an
                    account of what happened.
                  </p>
                  <h4>14. DATA PROTECTION</h4>
                  <p>
                    We process your personal data in accordance with our Privacy
                    Policy which can be found at{' '}
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.history.push('/privacy-policy')}
                    >
                      Privacy Policy
                    </a>
                  </p>
                  <h4>15. OUR LIABILITY</h4>
                  <p>
                    Subject to this clause 15, we are responsible to you for any
                    loss or damage that you suffer that is a direct and
                    foreseeable result of us breaching these Terms or of failing
                    to use reasonable care and skill in relation to your use of
                    our Services. Loss or damage is "foreseeable" if it is clear
                    that it will happen, or if you told us that it may happen.
                    Nothing in these Terms excludes or limits our liability to
                    you for:
                    <br />
                  </p>
                  <ul>
                    <li>
                      death or personal injury arising from our negligence;
                    </li>
                    <li>
                      defective Products under the Consumer Protection Act 1987;
                    </li>
                    <li>fraudulent misrepresentation;</li>
                    <li>
                      or any other liability which cannot be lawfully excluded.
                    </li>
                  </ul>
                  We will under no circumstances whatsoever will we be liable to
                  you (even if it is foreseeable) in connection with these Terms
                  or the use of our Services for:
                  <br />
                  <ul>
                    <li>
                      any loss arising from your act, omission or negligence or
                      your breach of these Terms, including for the avoidance of
                      doubt, failure to inform the Partner of any allergy or
                      dietary requirements;
                    </li>
                    <li>
                      any loss arising from the act, omission or negligence of
                      the Partner, including for the avoidance of doubt, failure
                      to provide Products in compliance with your allergy or
                      dietary requirements if applicable;
                    </li>
                    <li>any loss of profits, sales, business, or revenue;</li>
                    <li>
                      loss or corruption of data, information, or software,
                      including payment data provided to Stripe;
                    </li>
                    <li>loss of business opportunity;</li>
                    <li>loss of anticipated savings;</li>
                    <li>loss of goodwill;</li>
                    <li>or any indirect or consequential loss.</li>
                  </ul>
                  Subject to this clause 15 our total liability to you in
                  respect of all other losses arising under or in connection
                  with these Terms the use of our Services shall in no
                  circumstances exceed twice the order value or £100 whichever
                  is the lower.
                  <p />
                  <h4>16. EVENTS BEYOND OUR CONTROL</h4>
                  <p>
                    We will not be liable to you for any failure to perform, or
                    any delay in our performance of our obligations under these
                    Terms and in connection with the Services that is caused by
                    events outside our reasonable control, including but not
                    limited to:
                    <br />
                  </p>
                  <ul>
                    <li>
                      Failure of any IT hardware or software that is not part of
                      the Platform;
                    </li>
                    <li>
                      acts of God, flood, drought, earthquake or other natural
                      disaster;
                    </li>
                    <li>epidemic or pandemic;</li>
                    <li>
                      terrorist attack, civil war, civil commotion or riots,
                      war, threat of or preparation for war, armed conflict,
                      imposition of sanctions, embargo, or breaking off of
                      diplomatic relations;
                    </li>
                    <li>
                      nuclear, chemical or biological contamination or sonic
                      boom;
                    </li>
                    <li>
                      any law or any action taken by a government or public
                      authority, including without limitation imposing an export
                      or import restriction, quota or prohibition, or failing to
                      grant a necessary licence or consent;
                    </li>
                    <li>
                      collapse of buildings, fire, explosion or accident; and
                    </li>
                    <li>
                      any labour or trade dispute, strikes, industrial action or
                      lockouts.
                    </li>
                  </ul>
                  <p />
                  <h4>17. OTHER TERMS</h4>
                  <p>
                    These Terms and the documents referred to within them form
                    the entire agreement between you and us and supersede and
                    extinguish all discussions, correspondence, negotiations,
                    understandings or agreements between us relating to the
                    subject matter of these Terms.
                    <br />
                    As a consumer you have certain legal rights when you order
                    Products from our Platform. Your legal rights are not
                    affected by these Terms.
                    <br />
                    We provide you with access to the Platform on the basis
                    that, to the maximum extent permitted by law, all
                    exclusions, warranties, representations, conditions,
                    undertakings and other terms that are not set out in these
                    Terms in relation to the Platform and your use of it are
                    excluded, including those which are implied by statute, in
                    common law, or otherwise.
                    <br />
                    If a court or other competent authority decides that any
                    part of these Terms is illegal or invalid, the rest of these
                    Terms will be unaffected and will remain in force.
                    <br />
                    We and you have the right to enforce these Terms against
                    each other, even if the enforcing party has delayed
                    enforcement, or waives their right to enforce them.
                  </p>
                  <h4>18. CLOSING YOUR ROADRUNNER ACCOUNT</h4>
                  <p>
                    You may close your account at any time by requesting to do
                    so in the "Your Account" section of the Website or
                    contacting our customer care team as outlined above.
                    <br />
                    We may suspend your access to your account, or close it
                    permanently, if we believe that your account has been used
                    by someone else. We may also close your account at our
                    discretion if we have reasonable cause to believe you are
                    abusing your use of the Services, for example, continually
                    making unreasonable complaints, continually attempting to
                    cancel orders, seeking refunds which you are not entitled
                    to, mistreating our staff, or any other reason. If we close
                    your account permanently we will refund any remaining
                    account credit you have validly obtained from our customer
                    care team.
                  </p>
                  <h4>19. GOVERNING LAW AND JURISDICTION</h4>
                  <p>
                    These Terms are governed by the laws of Northern Ireland and
                    you can bring legal proceedings in relation to our Services
                    in the Northern Irish courts, and the courts of Northern
                    Ireland shall have exclusive jurisdiction to settle any
                    dispute (including non-contractual disputes or claims)
                    relating to these Terms.
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
export default withRouter(Terms)
