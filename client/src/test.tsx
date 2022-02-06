import React from 'react';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';

const test = () => {
  const { id } = useParams();

  return (
    <>
    <Button >Add to cart {id}</Button>
    </>
  );
}

export default test;
