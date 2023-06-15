import PrivateLayout from "@/components/layouts/PrivateLayout";

const ProtectedIndex = () => {
  return (
    <PrivateLayout>
      <div>This is protected page</div>
    </PrivateLayout>
  );
};

export default ProtectedIndex;
