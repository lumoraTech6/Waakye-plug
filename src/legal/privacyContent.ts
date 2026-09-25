import type { LegalDocument } from './types'

const CONTACT =
  'WhatsApp +233 59 999 5651 (wa.me/233599995651) or message us through the Waakye Plug website.'

export const privacyDocument: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: 'September 25, 2026',
  sections: [
    {
      heading: 'Introduction',
      body: `Waakye Plug ("we", "us", "our") operates a food ordering and delivery platform in Ghana. This policy explains what personal data we collect from customers, riders, and vendors, why we collect it, and how it's protected, in line with Ghana's Data Protection Act, 2012 (Act 843).

This is a working draft to get you compliant quickly. It has not been reviewed by a lawyer. Before relying on it for full legal compliance, have it checked by someone qualified, especially once you register with the Data Protection Commission.`,
    },
    {
      heading: '1. Who this applies to',
      body: 'This policy covers anyone who uses the Waakye Plug platform: customers placing orders, riders delivering them, and vendors listed on the platform.',
    },
    {
      heading: '2. What we collect',
      body: `From customers:
• Name, phone number
• Delivery address / location
• Order history and payment amounts (we do not store your card or MoMo details. Payments are processed by Paystack, which has its own privacy practices)

From riders:
• Full name, phone number
• Ghana Card number and a photo of the physical card
• A profile photo
• Home area, emergency contact name and phone number
• Live GPS location while actively on a delivery (not tracked outside active delivery windows)
• Earnings, commission, and settlement history

From vendors:
• Business name, contact phone number, and location/coordinates`,
    },
    {
      heading: '3. Why we collect it',
      body: `• To connect customers with vendors and riders and complete deliveries
• To verify rider identity before allowing them onto the platform, for the safety of customers and the integrity of the platform
• To route riders to the correct pickup and delivery locations
• To calculate and settle commission and earnings
• To contact you about your order, account, or platform issues
• To investigate a complaint, dispute, or suspected fraud

We do not sell personal data to third parties, and we do not use it for advertising.`,
    },
    {
      heading: '4. Who we share it with',
      body: `• Paystack — for processing rider commission settlements. Paystack has its own privacy policy governing that data.
• Riders — see the customer's name, phone number, and delivery address needed to complete a delivery. They do not see payment details.
• Vendors — see the order details and delivery location needed to prepare and hand off an order.
• We do not share personal data with any other outside party except where required by law (e.g. a lawful request from Ghanaian authorities).`,
    },
    {
      heading: '5. How long we keep it',
      body: `We keep order and account data for as long as your account is active, and for a reasonable period afterward to meet tax, dispute, and legal record-keeping obligations. Ghana Card photos and numbers for riders who leave the platform are retained only as long as needed for settlement/dispute purposes, then deleted.`,
    },
    {
      heading: "6. How it's protected",
      body: `• Access to rider identity documents, financial records, and admin functions is restricted to authorized platform administrators only.
• Passwords and PINs are never stored in plain text.
• Data is stored with Supabase, which provides encryption in transit and at rest.`,
    },
    {
      heading: '7. Your rights',
      body: `Under Ghana's Data Protection Act, you have the right to:
• Know what personal data we hold about you
• Request a copy of it
• Request correction of inaccurate data
• Request deletion of your data, subject to our legal obligation to retain certain records (e.g. financial/tax records)
• Withdraw consent to processing, understanding this may mean you can no longer use the platform (e.g. a rider withdrawing consent to location tracking cannot be assigned deliveries)

To exercise any of these rights, contact us at ${CONTACT}.`,
    },
    {
      heading: '8. Location data specifically',
      body: 'Rider location is only actively tracked while a delivery is in progress, to power live tracking for the customer and for route calculation. It is not tracked when a rider is offline or not on an active delivery.',
    },
    {
      heading: '9. Children',
      body: 'Waakye Plug is not intended for use by anyone under 18. Riders must be 18 or older to register.',
    },
    {
      heading: '10. Changes to this policy',
      body: 'We may update this policy as the platform grows. Material changes will be communicated to registered riders and vendors.',
    },
    {
      heading: '11. Contact',
      body: `Questions about this policy or your data: ${CONTACT}

Waakye Plug intends to register as a Data Controller with Ghana's Data Protection Commission. This policy will be updated with our registration details once complete.`,
    },
  ],
}
