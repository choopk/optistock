import PrivateLayout from "@/components/layouts/PrivateLayout";
import { useSession } from "next-auth/react";

const Account = () => {
  const { data: session } = useSession();
  return (
    <PrivateLayout>
      <div>Account</div>
      {JSON.stringify(session?.user)}
    </PrivateLayout>
  );
};

export default Account;
