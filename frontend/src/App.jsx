import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <Outlet />
    </div>
  );
};

export default App;
