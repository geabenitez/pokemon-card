import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import 'rbx/index.css'
import { List, Notification } from "rbx";

const POKEMONS = gql`
  {
    pokemons(first: 10) {
      id
      name
    }
  }
`

export default function PokemonList() {
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
          <List>
            {pokemons.map(link => <List.Item key={link.id}>{link.name}</List.Item>)}
          </List>
        )
      }}
    </Query>
  )
}
