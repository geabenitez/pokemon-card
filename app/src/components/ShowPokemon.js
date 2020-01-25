import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { useParams } from "react-router-dom";

import 'rbx/index.css'
import { Notification, Card, Image, Media, Title, Content } from "rbx";

export default function ShowPokemon() {
  const { name } = useParams()
  const POKEMON = gql`
    query Pokemon($name: String!) {
      pokemon(name: $name) {
        id
        number
        name
        image
        height {
          minimum
          maximum
        }
        weight {
          minimum
          maximum
        }
        attacks {
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        }

      }
    }
  `
  return (
    <Query query={POKEMON} variables={{ name }}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <Notification color='warning'>Getting pokemon information</Notification>
          )
        }
        if (error) {
          return (
            <Notification color='danger'>An error has occured. Sorry pal.</Notification>
          )
        }
        const pokemon = data.pokemon
        console.log(pokemon)
        return (
          <Card>
            <Card.Image>
              <Image.Container size="4by3">
                <Image src={pokemon.image} />
              </Image.Container>
            </Card.Image>
            <Card.Content>
              <Media>
                <Media.Item as="figure" align="left">
                  <Image.Container as="p" size={64}>
                    <Image src={pokemon.image} />
                  </Image.Container>
                </Media.Item>
                <Media.Item>
                  <Title as="p" size={4}>{pokemon.name}</Title>
                  <Title as="p" subtitle size={6}>{pokemon.number}</Title>
                </Media.Item>
                <Media.Item>
                  <Title as="p" size={4}>Weight</Title>
                  <Title as="p" subtitle size={6}>{pokemon.weight.minimum} - {pokemon.weight.maximum}</Title>
                </Media.Item>
                <Media.Item>
                  <Title as="p" size={4}>Height</Title>
                  <Title as="p" subtitle size={6}>{pokemon.height.minimum} - {pokemon.height.maximum}</Title>
                </Media.Item>
              </Media>
              {Object.keys(pokemon.attacks).map(attack => {
                if (attack !== '__typename') {
                  return (
                    <div>
                      <Title as="p" size={5}>{attack.toUpperCase()}</Title>
                      {pokemon.attacks[attack].map(attack => {
                        return (
                          <div>
                            <Content>
                              <Title as="span" size={6}>{attack.name}</Title><br />
                              <Title as="span" subtitle size={7}>{attack.type} - {attack.damage}</Title>
                            </Content>
                          </div>
                        )
                      })}
                      <br />
                    </div>
                  )
                }
              })}
            </Card.Content>
          </Card>
        )
      }}
    </Query>
  )
}
