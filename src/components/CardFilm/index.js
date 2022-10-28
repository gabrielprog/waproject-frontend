import React from 'react';
import { 
    Flex,
    Image,
    Text
} from '@chakra-ui/react'

function CardFilm({ banner, title, director, producer, describe }) {
  return (
    <Flex 
    bg='#282a36' 
    w='100%' 
    p={4}
    borderRadius={12}
    color='white'
    flexDirection="column"
    gap={5}
  >
        <Image 
        src={banner} 
        alt={title}
        width="100%"
        />
        <Text>Titulo: {title}</Text>

        <Text>Diretor: {director}</Text>

        <Text>Produtor: {producer}</Text>

        <Text>Descrição: {describe}</Text>
    </Flex>
  );
}

export default CardFilm;