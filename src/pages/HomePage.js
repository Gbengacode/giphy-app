import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ReactPaginate from 'react-paginate';
import Spinner from 'react-bootstrap/Spinner';
import { debounce } from 'lodash';
import Search from '../components/Search';
import Cards from '../components/Cards';
import fetchPhoto from '../api/photo';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const dataPerPage = 9;
  const pageVisited = pageNumber * dataPerPage;
  const selectedData = data.slice(pageVisited, pageVisited + dataPerPage);
  const pageCount = Math.ceil(data.length / dataPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleChangeSearch = debounce((e) => {
    setSearchTerm(e.target.value);
    setError('');
  }, 1000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return setError('Please enter a search term');
    setSearchTerm(searchTerm);
    setIsLoading(true);
    const data = await fetchPhoto(searchTerm);
    setData(data);
    setIsLoading(false);
  };

  const hotSearch = async (searchTerm) => {
    setIsLoading(true);
    const data = await fetchPhoto(searchTerm);
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    hotSearch(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <div className="d-flex justify-content-center align-item-center mt-5">
        <Search
          handleChangeSearch={handleChangeSearch}
          handleSubmit={handleSubmit}
          error={error}
        />
      </div>
      <div className="mt-5">
        <Container>
          <Row>
            {selectedData
              && selectedData.map((item) => (
                <Col key={item.id} md={4} className="g-0">
                  <Cards item={item} />
                  {' '}
                </Col>
              ))}
            {isLoading && (
              <div className="text-center d-flex justify-content-center">
                {' '}
                <Spinner animation="border" variant="info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                {' '}
              </div>
            )}
          </Row>
        </Container>
      </div>
      {selectedData.length > 0 && (
        <div className="m-5 d-flex justify-content-center align-item-center">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="paginationBttns"
            previousLinkClassName="previousBttn"
            nextLinkClassName="nextBttn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
