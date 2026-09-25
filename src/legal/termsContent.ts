import type { LegalDocument } from './types'

const CONTACT =
  'WhatsApp +233 59 999 5651 (wa.me/233599995651) or message us through the Waakye Plug website.'

export const termsDocument: LegalDocument = {
  title: 'Terms of Service',
  lastUpdated: 'September 25, 2026',
  sections: [
    {
      heading: 'Introduction',
      body: `These terms govern use of the Waakye Plug platform by customers, riders, and vendors. By using the platform, you agree to them.

This is a working draft. Have it reviewed by a lawyer before treating it as final, especially the liability and rider-contractor sections.`,
    },
    {
      heading: '1. What Waakye Plug is',
      body: `Waakye Plug connects customers with local food vendors and independent delivery riders. Waakye Plug is a technology platform. It does not prepare food (that's the vendor's responsibility) and delivery is carried out by independent riders under the terms below.`,
    },
    {
      heading: '2. For customers',
      body: `• Orders are placed and paid for on delivery (cash), unless otherwise stated.
• Delivery times are estimates, not guarantees. They can be affected by traffic, weather, or vendor delays.
• If a vendor is unable to fulfill your order after it's been placed, you will be notified and the order will be cancelled with no charge.
• Complaints about food quality should be directed to us within 24 hours of delivery so we can follow up with the vendor.`,
    },
    {
      heading: '3. For riders',
      body: `3.1 Independent contractor status
Riders on Waakye Plug are independent contractors, not employees of Waakye Plug. You choose when to go online and which orders to accept. You are responsible for your own transport, fuel, and compliance with road traffic law.

3.2 Requirements to ride
• You must be 18 years or older
• You must hold a valid Ghana Card and provide accurate identity information
• You must provide a working phone number and emergency contact
• You are responsible for your own roadworthy vehicle and valid license/registration where applicable

3.3 Deposit
A refundable deposit of GH₵[X] is required before you can begin accepting orders. This deposit:
• Remains your money. It is not a fee paid to Waakye Plug
• Is held to cover (a) unpaid commission owed if you stop responding or leave the platform without settling, and (b) cash collected from a customer that goes missing and cannot be accounted for
• Will not be used for any purpose beyond those two situations
• Is refunded in full when you leave the platform in good standing (no commission owed, no unresolved cash discrepancy)
• If any amount is deducted, you will be told in writing exactly why and how much

3.4 Handling cash
You may be required to pay a vendor for an order before collecting payment from the customer. You are responsible for the cash you collect until it is settled with Waakye Plug according to the in-app settlement process. Deliberately withholding collected cash is grounds for immediate removal from the platform and forfeiture of the relevant deposit amount, without prejudice to further legal action.

3.5 Conduct
Riders are expected to treat customers and vendors respectfully, deliver orders promptly and honestly, and report any issue (inability to complete a delivery, a vendor unable to fulfill an order, an accident) through the app or to support as soon as possible rather than leaving an order unresolved.

3.6 Safety and liability
You are responsible for your own safety while riding, including wearing appropriate protective gear and following traffic law. Waakye Plug is not liable for injury, accident, or loss of property while you are using your own vehicle to make deliveries. Riders are strongly encouraged to hold their own personal accident/motor insurance.

3.7 Removal from the platform
Waakye Plug may suspend or remove a rider for: falsifying identity information, repeated failure to complete accepted orders, mishandling of customer cash, or conduct that endangers customers, vendors, or the platform's reputation. Where commission is owed, it must be settled before final removal and deposit refund.`,
    },
    {
      heading: '4. For vendors',
      body: `• Vendors are responsible for the safety, quality, and accurate description of the food they provide.
• Vendors must have orders ready within the time communicated to the platform to avoid rider and customer delays.
• Waakye Plug is not liable for food safety issues arising from a vendor's preparation.`,
    },
    {
      heading: '5. Payments and commission',
      body: `• Waakye Plug takes a commission on the delivery fee portion of each order, as communicated to riders at onboarding.
• Commission settlement is processed through Paystack. Waakye Plug is not responsible for delays caused by Paystack or the rider's payment provider.`,
    },
    {
      heading: '6. Limitation of liability',
      body: `Waakye Plug provides the platform "as is" and is not liable for indirect losses arising from delays, cancelled orders, or rider/vendor conduct, beyond facilitating a resolution between the affected parties. Nothing in these terms limits liability that cannot be excluded under Ghanaian law.`,
    },
    {
      heading: '7. Changes to these terms',
      body: 'We may update these terms as the platform grows. Continued use of the platform after a change means you accept the updated terms.',
    },
    {
      heading: '8. Contact',
      body: `Questions about these terms: ${CONTACT}`,
    },
  ],
}
