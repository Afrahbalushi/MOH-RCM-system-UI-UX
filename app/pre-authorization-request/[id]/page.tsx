import PreAuthorizationRequest from "../../../pre-authorization-request"

export default function PreAuthorizationRequestPage({ params }: { params: { id: string } }) {
  return <PreAuthorizationRequest requestId={params.id} />
}
