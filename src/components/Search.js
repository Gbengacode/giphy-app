import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BsSearch } from 'react-icons/bs';

const Search = ({
  handleChangeSearch, handleSubmit, error,
}) => (
  <Card style={{ width: '46rem' }} className="shadow rounded">
    <Card.Body>
      <Form className="mt-2">
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Col md={9}>
            <div className="search-container">
              <BsSearch className="search-icon" />
              <input
                type="text"
                placeholder="article or name"
                className="search-input"
                onChange={handleChangeSearch}
                
              />
            </div>
            {error && <span className="text-danger">{error}</span>}
          </Col>
          <Col md={2}>
            <input
              type="submit"
              value="search"
              className="mt-2  xs-w-100"
              onClick={handleSubmit}
            />
          </Col>
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

export default Search;
