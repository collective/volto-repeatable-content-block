import React from 'react';
import PropTypes from 'prop-types';

import {
  GridRow,
  GridColumn,
  Grid,
  CardHeader,
  CardDescription,
  CardContent,
} from 'semantic-ui-react';

const Skeleton = () => {
  return (
    <div className="skeleton-template">
      <Grid>
        <GridRow>
          <GridColumn>
            <CardContent className="pb-2">
              <CardHeader tag="h2">-</CardHeader>
              <CardDescription></CardDescription>
            </CardContent>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Skeleton.propTypes = {
  content: PropTypes.objectOf(PropTypes.any),
  pathname: PropTypes.string,
};

export default Skeleton;
