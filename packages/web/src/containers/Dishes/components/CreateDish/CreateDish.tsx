import React from 'react'

import ContentContainer from 'components/ContentContainer'
import Section from 'components/Section'

type CreateDishProps = {}

const CreateDish: React.FC<CreateDishProps> = () => {
  return (
    <ContentContainer maxWidth="sm">
      <Section title="Thêm món ăn mới">Giao diện thêm món ăn mới nè</Section>
    </ContentContainer>
  )
}

export default CreateDish
