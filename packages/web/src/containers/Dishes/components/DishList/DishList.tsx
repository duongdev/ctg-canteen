import React from 'react'

import ButtonLink from 'components/ButtonLink'
import ContentContainer from 'components/ContentContainer'

type DishListProps = {}

const DishList: React.FC<DishListProps> = () => {
  return (
    <ContentContainer>
      <ButtonLink to="/dishes/create" variant="contained" color="primary">
        Thêm món ăn
      </ButtonLink>
    </ContentContainer>
  )
}

export default DishList
