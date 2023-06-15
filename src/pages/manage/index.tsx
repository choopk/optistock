import PrivateLayout from "@/components/layouts/PrivateLayout";

const ProtectedIndex = () => {
  return (
    <PrivateLayout>
      <div>This is manage page</div>
    </PrivateLayout>
  );
};

export default ProtectedIndex;
