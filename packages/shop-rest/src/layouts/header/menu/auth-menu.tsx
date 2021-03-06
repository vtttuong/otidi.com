import React from "react";
import { Button } from "components/button/button";
import { FormattedMessage } from "react-intl";
import Popover from "components/popover/popover";
import { AuthorizedMenu } from "./authorized-menu";
import { Profile } from "assets/icons/Profile";

interface Props {
  isAuthenticated: boolean;
  onJoin: () => void;
  onLogout: () => void;
  avatar: string;
}

const AuthMenu = ({ isAuthenticated, onJoin, onLogout, avatar }: Props) => {
  return !isAuthenticated ? (
    <Button variant="primary" onClick={onJoin}>
      <FormattedMessage id="joinButton" defaultMessage="join" />
    </Button>
  ) : (
    <Popover
      direction="right"
      className="user-pages-dropdown"
      handler={
        avatar ? (
          <img
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            src={avatar}
            alt="user"
          />
        ) : (
          <>
            <Profile />
          </>
        )
      }
      content={<AuthorizedMenu onLogout={onLogout} />}
    />
  );
};
export default AuthMenu;
