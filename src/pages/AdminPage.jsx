import { useLocation } from "react-router-dom";

const AdminPage = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <p>Admin Page </p>
    </>
  );
};

export default AdminPage;
