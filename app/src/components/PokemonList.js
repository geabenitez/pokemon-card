import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import 'rbx/index.css'
import { Column, List, Notification, Button } from "rbx";
import Home from "./Home";
import ShowPokemon from "./ShowPokemon";

export default function PokemonList() {
  const POKEMONS = gql`
    {
      pokemons(first: 10) {
        id
        name
      }
    }
  `
  return (
    <Query query={POKEMONS}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <Notification color='warning'>Getting list of pokemons</Notification>
          )
        }
        if (error) {
          return (
            <Notification color='danger'>An error has occured. Sorry pal.</Notification>
          )
        }
        const pokemons = data.pokemons
        return (
          <Router>
            <Column.Group>
              <Column size="one-quarter">
                <Button fullwidth as={Link} to="/" state="hovered" color="primary" key="primary">
                  Home
                </Button>
                <List>{pokemons.map(link => <List.Item as={Link} to={`/pokemon/${link.name.toLowerCase()}`} key={link.id}>{link.name}</List.Item>)}</List>
              </Column>
              <Column>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/pokemon/:name">
                    <ShowPokemon />
                  </Route>
                </Switch>
              </Column>
            </Column.Group>
          </Router>
        )
      }}
    </Query>
  )
}
