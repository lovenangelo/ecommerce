import SellForm from "./components/forms";
import SellLayout from "./layout";

const Index = ({ id }: { id?: string }) => {
  return (
    <SellLayout>
      <SellForm id={id} />
    </SellLayout>
  );
};

export default Index;
