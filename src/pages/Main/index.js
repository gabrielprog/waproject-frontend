import React, { useState, useEffect } from 'react';

import { 
  Flex,
  Button,
  Skeleton
 } from '@chakra-ui/react'

import CardFilm from '../../components/CardFilm';

import apiFIlms from '../../services/apiFIlms';

function Main() {

  const indicatePagination = []

  const [films, setFilms] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const updateDatabaseAndGetFilms = async () => { 
    setIsLoading(false)

    if(currentPage === 1) {
      const requestUpdateDatabase = await apiFIlms("films/update")

      if(!requestUpdateDatabase.data?.status) return
    }

    const requestGetFilms = await apiFIlms(`films?page=${currentPage}`)
    
    if(requestGetFilms.status !== 200) return
    
    setFilms(requestGetFilms.data.resultDataFilms)
    setTotalPage(requestGetFilms.data.total_page)

    setIsLoading(true)
  }

  const handlesPagination = (e) => setCurrentPage(e.target.dataset.page)

  useEffect(() => { updateDatabaseAndGetFilms() }, [currentPage])

  for(let countPagination = 1; countPagination <= totalPage; countPagination++) {
    indicatePagination.push(countPagination)
  }

  return (
    <Flex 
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    w="100vw"
    h="100%"
    p={5}
    gap={2}
    >
        {films.length > 0 && (
        <Button 
        onClick={() => setCurrentPage(1)} 
        p={5}
        color="white" 
        bg="#282a36" 
        >Atualizar filmes</Button>
        )}
        

        {films?.map(item => {
          return(
            <Skeleton 
            w="50%"
            isLoaded={isLoading}  
            borderRadius={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
              <CardFilm
              key={item.id}
              banner={item.movie_banner_url}
              title={item.title}
              director={item.director}
              producer={item.producer}
              describe={item.description}
              />
            </Skeleton>
          )
        })}

        {films.length > 0 && (
          <Flex mt={5} gap={5}>
          {indicatePagination.map(item => (
          <Button 
          color="white" 
          bg="#282a36" 
          data-page={item} 
          onClick={(e) => handlesPagination(e)}>{item}</Button>))}
          </Flex>
        )}
        
    </Flex>
  );
}

export default Main;