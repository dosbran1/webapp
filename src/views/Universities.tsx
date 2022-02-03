import { capitalize, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router'
import API from '../api/API';
import { Paises } from '../interfaces/reqRes';

export const Universities = () => {
    const [university, setUniversity] = useState<Paises[]>([]);
    const [ordenAZ, setOrdenAZ] = useState(false);
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('');
    const history = useHistory();
    const router = history.location.search;

    useEffect(()=>{
        axios.get<Paises[]>(API+router)
        .then(resp => {
            const prueba: Paises[] = resp.data
             setUniversity(prueba);
        })
        .catch(console.log)
    },[])

    const arregloDeArreglos: Paises[] = []

    const LONGITUD_PEDAZOS = 3; 

    
        for (let i = 0; i < university.length; i += LONGITUD_PEDAZOS) {
            let paginas: Paises[] = university.slice(i, i + LONGITUD_PEDAZOS);
            arregloDeArreglos.push(paginas[page]);

        }

    const ordenarFiltrar = () => {
       
        const filtrados = arregloDeArreglos.filter(element => element.name.includes(capitalize(search)));
        return filtrados
       
   }

    
   const filOrd = ordenarFiltrar()

    const renderItem = (pais: Paises) => {
        return( 
             <TableRow key={pais.name}>
                 <TableCell>{pais.name}</TableCell>
                 <TableCell>{pais.domains}</TableCell>
                 <TableCell>{pais.web_pages}</TableCell>
                 <TableCell>{pais.domains}</TableCell>
                 <TableCell>{pais['state-province'] === null ? 'No Hay Datos' : pais['state-province']}</TableCell>
             </TableRow>
          )
      }

      const onSearchChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        
        setSearch(target.value)
    }


    const regresar = () => {
        history.push('/')
    }

    const ordenAcendente = () => {
        setOrdenAZ(!ordenAZ)
     }

    const orden = () => {
        if(ordenAZ === false ){
            const desendente = filOrd.sort((a,b) => (a.country > b.country ? -1 : a.country < b.country ? 1 :0))
            return desendente.map(renderItem)
        }else{
            const acendente = filOrd.sort((a,b) => (a.country > b.country ? 1 : a.country < b.country ? -1 :0))
            return acendente.map(renderItem)
        }
    }

    return (


        <div className="container">
            <div></div>
            <h1 className='text-center'>Universidades de {router.slice(25,)}</h1>

            <div className='d-flex justify-content-center mb-3'>
            <input
                placeholder='Buscar universidad'
                value={search}
                onChange={onSearchChange}
                
            />
            
            &nbsp;

            <button className='btn btn-primary ' onClick={regresar}>Regresar a Paises</button>
            </div>
            
            
            <Table  aria-label="customized table">
                <TableHead className='bg-primary text-light'>
                    <TableRow>
                        <TableCell className='text-light'>Universidad 
                            <button style={{
                                color: '#fff',fontWeight: 'bold', 
                                fontSize:25, backgroundColor: 'blue', 
                                border: 'none'}} onClick={ordenAcendente}>↑↓
                            </button></TableCell>
                        <TableCell className='text-light'>Dominio</TableCell>
                        <TableCell className='text-light'>Paginas Web</TableCell>
                        <TableCell className='text-light'>Dominio</TableCell>
                        <TableCell className='text-light'>Provincia</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                     orden()  
                    }  
                </TableBody>
            </Table>
            <Pagination
                count={2}
                color="primary"
                shape="rounded"

                hideNextButton={true}
                hidePrevButton={true}
                onChange={(event, value) =>{setPage(value -1)}}
            />
        </div>
    )
}

export default Universities;
