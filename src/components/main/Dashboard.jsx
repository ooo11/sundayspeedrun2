import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { getUser } from "../utils/getUser";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import getName from "../utils/getName";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

function Dashboard() {
  const { token } = useStoreState((state) => state);
  const { reset } = useStoreActions((actions) => actions);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const user = getUser(token);

  useEffect(() => {
    getName(user.id).then((n) => {
      setLoading(false);
      setName(n);
    });
  }, [user.id]);

  // const userName = getName(user.id);
  // console.log(userName);

  const logout = () => {
    reset();
  };
  if (!user.id) {
    return <Redirect to="/login" />;
  }
  if (loading)
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />;
      </Box>
    );

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={logout}
      >
        <ExitToAppIcon />
      </IconButton>
      <h1>Hello + {name} 👻</h1>
    </div>
  );
}

export default Dashboard;
