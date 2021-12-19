import { observer } from 'mobx-react';
import React from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import RegisterStore from '../../stores/RegisterStore';
import { useTranslation } from 'react-i18next';
import Error from '../../components/Error'

const Register = observer(() => {
  const store = useInjection<RegisterStore>(ownTypes.registerStore);
  const { t } = useTranslation(['register']);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={4} md={6} xs>
          <Form onSubmit={(ev)=>{ ev.preventDefault();
                                  store.register();
                                }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('placeholder.email')}
                value={store.email}
                onChange={(ev)=> {store.changeEmail(ev.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.password')}
                value={store.password}
                onChange={(ev)=> {store.changePassword(ev.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('placeholder.passwordConfirm')}
                value={store.passwordConfirm}
                onChange={(ev)=> {store.changeConfirmPassword(ev.target.value)}}
              />
            </Form.Group>

            {!!store.error && (
              <Error error={store.error}/>
            )}

            <Button variant="primary" type="submit">
              {store.isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                `${t('submit')}`
              )}
            </Button>

            {!!store.token && (
              <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{t('success', { token: store.token, id: store.id } )}</p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
});

export default Register
