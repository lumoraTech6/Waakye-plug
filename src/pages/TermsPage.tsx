import { termsDocument } from '../legal/termsContent'
import { LegalLayout, LegalSections } from './LegalLayout'

export default function TermsPage() {
  const doc = termsDocument
  return (
    <LegalLayout title={doc.title} lastUpdated={doc.lastUpdated}>
      <LegalSections sections={doc.sections} />
    </LegalLayout>
  )
}
