import React from 'react'
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import ownTypes from '../../ioc/ownTypes'
import { observer } from 'mobx-react'
import { useInjection } from '../../ioc/ioc.react'
import ResourceStore from '../../stores/ResourceStore'
import ResourceCard from '../../components/ResourceCard'
import { useTranslation } from 'react-i18next';
import Error from '../../components/Error'
import ButtonSpinner from '../../components/ButtonSpinner'

const User = observer(() => {
  const store = useInjection<ResourceStore>(ownTypes.resourceStore);
  const { t } = useTranslation(['resource']);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <InputGroup className="mb-2">
            <FormControl
              type="number"
              value={store.queryString}
              onChange={(ev)=> {store.changeQueryString(ev.target.value)}}
              isInvalid={!!store.error}
              placeholder={t('placeholder')}
            />
            <ButtonSpinner
                query={store.queryString}
                onClick={store.search}
                isLoading={store.isLoading}
                text={`${t('submit')}`}
            />
          </InputGroup>
          
          {!!store.error && (
            <Error error={store.error}/>
          )}

          <ResourceCard resource={store.resource} />
        </Col>
      </Row>
    </Container>
  )
});

export default User
