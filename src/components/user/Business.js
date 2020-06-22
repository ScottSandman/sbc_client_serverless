import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: {
    width: 310,
  },
});

const Business = ({ business }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <div className={classes.root}>
        <Typography gutterBottom variant="h5" component="h2">
          {business.name}
        </Typography>
        <Typography variant="body2" component="p">
          {business.description}
        </Typography>
        <Typography variant="body2" component="p">
          {business.contact && business.contact.address.split(",")[0]}
        </Typography>
        <Typography variant="body2" component="p">
          {business.contact && business.contact.address.split(",")[1]}
        </Typography>
        <Typography variant="body2" component="p">
          {business.contact && business.contact.phone}
        </Typography>
        <Typography variant="body2" component="p">
          <Link href={business.contact.url} component="a" target="_blank">
            map
          </Link>
        </Typography>
        <Typography variant="body2" component="p">
          <Link href={business.contact.website} component="a" target="_blank">
            learn more
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Business;
