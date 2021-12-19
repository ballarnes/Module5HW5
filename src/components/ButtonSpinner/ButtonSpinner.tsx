import { Button, Spinner } from 'react-bootstrap';
import React, { MouseEventHandler } from 'react';

interface Props {
  query: string,
  onClick: MouseEventHandler,
  isLoading: boolean,
  text: string
}

const ButtonSpinner = (props: Props) => {
  if (!props) {
      return null;
  }

  return (
  <Button
    disabled={!props.query}
    variant="primary"
    onClick={props.onClick}
    type="button"
  >
    {props.isLoading ? (
      <Spinner animation="border" size="sm" />
    ) : (
      `${props.text}`
    )}
  </Button>)
}

export default ButtonSpinner;
