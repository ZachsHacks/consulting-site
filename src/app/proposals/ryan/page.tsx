import { cookies } from "next/headers";
import RyanProposal from "./RyanProposal";
import ProposalUnlock from "@/components/ProposalUnlock";

const SLUG = "ryan";
const RECIPIENT = "Ryan";

export default async function RyanPage() {
  const cookieStore = await cookies();
  const stored = cookieStore.get(`proposal-${SLUG}`)?.value;
  const expected = process.env.PROPOSAL_PASSWORD_RYAN;
  const authorized = Boolean(expected) && stored === expected;

  if (!authorized) {
    return <ProposalUnlock slug={SLUG} recipient={RECIPIENT} />;
  }

  return <RyanProposal />;
}
