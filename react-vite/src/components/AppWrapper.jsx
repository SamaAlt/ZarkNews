import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { thunkRestoreUser } from "../redux/session";
import { router } from "../router";

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkRestoreUser());
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppWrapper;
