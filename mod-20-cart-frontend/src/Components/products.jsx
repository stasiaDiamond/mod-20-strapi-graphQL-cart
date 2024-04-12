import React, { useState, useEffect } from 'react';
import { Card, Accordion, Button, Container, Row, Col, Image } from "react-bootstrap";
import axios from 'axios';

const Products = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    axios.post('http://localhost:1337/graphql', {
      query: `
        query {
          products {
            data {
              id
              attributes {
                name
                country
                cost
                instock
              }
            }
          }
        }
      `
    })
    .then(response => {
      console.log('Products response:', response.data);
      const itemsData = response.data.data.products.data.map(product => product.attributes);
      setItems(itemsData);
    })
    .catch(error => {
      console.error('Error fetching products:', error.response ? error.response.data : error);
    });
  }, []);

  const addToCart = (name) => {
    const itemIndex = items.findIndex(item => item.name === name);
    if (items[itemIndex].instock > 0) {
      const updatedItems = items.map(item =>
        item.name === name ? { ...item, instock: item.instock - 1 } : item
      );
      setItems(updatedItems);

      const itemToAdd = updatedItems[itemIndex];
      setCart(currentCart => [...currentCart, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const deleteCartItem = (index) => {
    const itemToRemove = cart[index];
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);

    if (itemToRemove) {
      setItems(items =>
        items.map(item =>
          item.name === itemToRemove.name ? { ...item, instock: item.instock + itemToRemove.quantity } : item
        )
      );
    }
  };

  const calculateTotalCost = () => {
    return cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
  };

  const handlePurchase = () => {
    const total = calculateTotalCost();
    setTotalCost(total);
    console.log(`Total checked out: $${total}`);
    setCart([]); // Clear cart after checkout
  };

  let list = items.map((item, index) => (
    <li key={index}>
      <Image src={`https://picsum.photos/id/${1049 + index}/50/50`} width={70} roundedCircle />
      <Button variant="success" size="large" onClick={() => addToCart(item.name)}>
        {item.name}: ${item.cost}/ea | Qty in Stock: {item.instock}
      </Button>
    </li>
  ));

  let cartList = cart.map((item, index) => (
    <Accordion.Item key={index} eventKey={index.toString()}>
      <Accordion.Header>{item.name}</Accordion.Header>
      <Accordion.Body onClick={() => deleteCartItem(index)}>
        ${item.cost} from {item.country} - Click to Return Stock
      </Accordion.Body>
    </Accordion.Item>
  ));

  const totalCostDisplay = calculateTotalCost();

  return (
    <Container>
      <Row>
        <Col>
          <h1>Product List</h1>
          <ul style={{ listStyleType: 'none' }}>{list}</ul>
        </Col>
        <Col>
          <h1>Cart Contents</h1>
          <Accordion defaultActiveKey="0">{cartList}</Accordion>
        </Col>
        <Col>
          <h1>Checkout </h1>
          <Button onClick={handlePurchase}>Purchase $ {totalCostDisplay}</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
