import React from 'react';
import PokemonList from "./PokemonList";

import 'rbx/index.css'
import { Content, Notification } from "rbx";

function App() {
  return (
    <Content>
      <Notification color='info'>
        Search information on <strong>first generation</strong> Pokemons
      </Notification>
      <PokemonList />
    </Content>
  );
}

export default App;
