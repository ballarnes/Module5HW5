import React from 'react'
import { Card } from 'react-bootstrap'

interface Props {
  resource: {
    name: string,
    year: number,
    color: string,
    pantone_value: string
  } | null
}

const ResourceCard = (props: Props) => {
  if (!props.resource) {
    return null
  }
  const { name, year, color, pantone_value } = props.resource

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
        <hr style={{ color: color, height: '200px' }}/>
          {year} {pantone_value}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ResourceCard
