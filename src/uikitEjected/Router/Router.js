import { withRouter } from 'react-router-dom';

const RenderRouterProps = props => {
  const { match, location, history, children } = props;

  return children({ match, location, history });
};

export const Router = withRouter(RenderRouterProps);
