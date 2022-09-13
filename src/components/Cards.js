import React from 'react';
import Card from 'react-bootstrap/Card';
import { AiFillHeart } from 'react-icons/ai';

const Cards = ({ item }) => (
  <>
    <Card className="mt-5 shadow g-0">
      <Card.Img
        variant="top"
        src={item.images.fixed_height.url}
        width="200px"
        height="200px"
      />

      <Card.Body>
        <div className="title">
          <Card.Text>{item.title ? item.title : 'No title'}</Card.Text>
          <span className="heart-icon">
            <AiFillHeart />
          </span>
        </div>
      </Card.Body>
    </Card>
  </>
);

export default Cards;
