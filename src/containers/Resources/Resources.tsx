import React, { useEffect } from 'react'
import ResourceCard from '../../components/ResourceCard'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Pagination from '../../components/Pagination'
import { observer } from 'mobx-react'
import { useInjection } from '../../ioc/ioc.react'
import ResourcesStore from '../../stores/ResourcesStore'
import ownTypes from '../../ioc/ownTypes'

const Resources = observer(() => {
  const store = useInjection<ResourcesStore>(ownTypes.resourcesStore);

  useEffect(() => {
    const getResource = async () => {
      await store.init();
    }
    getResource()
  }, [store])

  return (
    <Container>
      <Row className="justify-content-center">
        {store.isLoading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {store.resources?.map((resource, key) => (
              <Col key={key} sm={6} md={4} lg={3} xl={2} className="mb-2 mt-2">
                <ResourceCard resource={resource} />
              </Col>
            ))}
          </>
        )}
      </Row>
      <Pagination total={store.totalPages} active={store.currentPage} onChange={(val) => { store.changePage(val) }}/>
    </Container>
  )
});

export default Resources
