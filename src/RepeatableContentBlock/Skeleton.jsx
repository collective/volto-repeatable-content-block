import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from 'design-react-kit/dist/design-react-kit';

const Skeleton = () => {
  return (
    <div className="skeleton-template">
      <Row>
        <Col lg={{ size: 12, order: 1 }}>
          <Card>
            <CardBody className="pb-2">
              <CardTitle tag="h2">-</CardTitle>
              <CardText></CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
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
