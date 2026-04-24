import { cookies } from "next/headers";
import ClarkProposal from "./ClarkProposal";
import ProposalUnlock from "@/components/ProposalUnlock";

const SLUG = "clark";
const RECIPIENT = "Clark";

export default async function ClarkPage() {
  const cookieStore = await cookies();
  const stored = cookieStore.get(`proposal-${SLUG}`)?.value;
  const expected = process.env.PROPOSAL_PASSWORD_CLARK;
  const authorized = Boolean(expected) && stored === expected;

  if (!authorized) {
    return <ProposalUnlock slug={SLUG} recipient={RECIPIENT} />;
  }

  return <ClarkProposal />;
}
