import React from 'react';
import {toGridTemplate} from "src/uikitEjected/index";
import {Box} from "@market-ui/falcon-ui";

const area = {
  content: 'content',
  empty: '.',
};

const FORM_WIDTH = '415px';

const layout = {
  tableLayout: {
    display: 'grid',
    gridTemplate: {
      xl: toGridTemplate([
        [ '1fr',        FORM_WIDTH,   '1fr'      ],
        [ area.empty,   area.content, area.empty ],
      ]),
      lg: toGridTemplate([
        [ '1fr',        FORM_WIDTH,   '1fr'      ],
        [ area.empty,   area.content, area.empty ],
      ]),
      md: toGridTemplate([
        [ '1fr',        FORM_WIDTH,   '1fr'      ],
        [ area.empty,   area.content, area.empty ],
      ]),
      sm: toGridTemplate([
        [ '1fr',        FORM_WIDTH,   '1fr'      ],
        [ area.empty,   area.content, area.empty ],
      ]),
      xs: toGridTemplate([
        [ '1fr'        ],
        [ area.content ],
      ]),
    },
  }
};

interface IProps {
  children: React.ReactElement
}

export const AuthLayoutLayer = (props: IProps) => {
  return (
    <Box defaultTheme={layout}>
      {React.cloneElement(props.children, {gridArea: area.content})}
    </Box>
  );
};
