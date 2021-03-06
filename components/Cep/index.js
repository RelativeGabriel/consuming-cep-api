import React, { useState } from 'react';

import axios from 'axios';

import { Container,
         Text, 
         Label, 
         Input, 
         Card,
         Error, 
         Button, 
         GroupButtons,
         NoneDiv } from './style';

const Cep = () => {
  const [ cep, setCep ] = useState('');
  const [ localidade, setLocalidade ] = useState('')
  const [ bairro, setBairro ] = useState('')
  const [ uf, setUf ] = useState('')
  const [ ddd, setDdd ] = useState('')
  const [ conf, setConf ] = useState('')

  function cleanState () {
    setCep('')
    setLocalidade('')
    setBairro('')
    setUf('')
    setDdd('')
    setConf('')
  }

  function errorState () {
    cleanState

    setConf('Not found')
  }
  
  async function searchWithCep () {
    const URL_CEP = `https://viacep.com.br/ws/${ cep }/json`

    let response;
    
    try {
      response = await axios.get(URL_CEP);

      let { bairro, localidade, uf, ddd } = response.data;

      setBairro(bairro)
      setLocalidade(localidade)
      setUf(uf)
      setDdd(ddd)
    } catch (e) {
      errorState

      console.log(`Erro encontrado: ${ e }`)
    }
  }

  return (
    <Container>
      <Label>
        CEP <Input value={ cep } onChange={ e => setCep(e.target.value) } type="text" />
      </Label>

      <GroupButtons>
        <Button value="Pesquisar" type="submit" onClick={ searchWithCep } />
        <Button value="Limpar" type="submit" onClick={ cleanState } />
      </GroupButtons>

      <Card>
        <Text>UF: { uf }</Text>
        <Text>Localidade: { localidade }</Text>
        <Text>Bairro: { bairro }</Text>
        <Text>DDD: { ddd }</Text>
      </Card>

      { conf ? <Error>O CEP não foi encontrado</Error> : <NoneDiv>BAU</NoneDiv> }
    </Container>
  )
}

export default Cep;
