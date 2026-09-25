import { privacyDocument } from '../legal/privacyContent'
import { LegalLayout, LegalSections } from './LegalLayout'

export default function PrivacyPage() {
  const doc = privacyDocument
  return (
    <LegalLayout title={doc.title} lastUpdated={doc.lastUpdated}>
      <LegalSections sections={doc.sections} />
    </LegalLayout>
  )
}
