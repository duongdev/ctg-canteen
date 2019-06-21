import React from 'react'

import PageHeader from 'components/PageHeader'
import { Route, Switch } from 'react-router'
import CreateDish from './components/CreateDish'
import DishList from './components/DishList'

type DishesProps = {}

const Dishes: React.FC<DishesProps> = () => {
  return (
    <>
      <PageHeader withHelmet title="Quản lý món ăn" />

      <Switch>
        <Route path="/dishes/create" component={CreateDish} />
        <Route component={DishList} />
      </Switch>
    </>
  )
}

export default Dishes
