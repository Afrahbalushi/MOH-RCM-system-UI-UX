import ResubmissionScreen from "../../../resubmission-screen"

export default function ResubmissionPage({ params }: { params: { id: string } }) {
  return <ResubmissionScreen claimId={params.id} />
}
