import ClaimsCodingScreen from "../../../claims-coding-screen"

export default function ClaimsCodingScreenPage({ params }: { params: { id: string } }) {
  return <ClaimsCodingScreen claimId={params.id} />
}
