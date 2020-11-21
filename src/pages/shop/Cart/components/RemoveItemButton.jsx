import {Button, Icon} from "@market-ui/falcon-ui";
import PropTypes from "prop-types";
import React from "react";
import { DeleteIcon } from 'src/styling';

export const RemoveItemButton = ({ onClick, loading }) => (
  <Button
    onClick={() => onClick()}
    disabled={loading}
    variant='icon'
  >
    {loading ? (
      <Icon
        src={'loader'}
        size="md"
        stroke="secondaryText"
        // css={({ theme }) => ({
        //   ':hover': {
        //     stroke: theme.colors.primary
        //   }
        // })}
      />
    ) : (
      <DeleteIcon
        width='md'
      />
    )}
  </Button>
);

RemoveItemButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool
};
