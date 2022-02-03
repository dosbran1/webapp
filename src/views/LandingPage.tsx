import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../api/API';
import { Paises} from './../interfaces/reqRes';
import Table from "@mui/material/Table";
import {  capitalize, Pagination, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ReactCountryFlag from "react-country-flag";


import { Link } from 'react-router-dom';
import { border } from '@mui/system';




const LandingPage = () => {
    const [countries, setCountries] = useState<Paises[]>([]);
    const [page,setPage] = useState(0);
    const [search,setSearch] = useState('');
    const [ordenAZ, setOrdenAZ] = useState(false);
    const [loading, setLoading] = useState(false);
    
    

    useEffect(()=>{

        setLoading(true)

        axios.get<Paises[]>(API)
        .then(resp => {

            let hash: any = [];
            const prueba: Paises[] = resp.data.filter(prueba => {
                var exists = !hash[prueba.country];
                hash[prueba.country] = true;
                return exists;
            })

             setCountries(prueba);
            setLoading(false);
            
        })
        .catch(console.log)
    },[])
    
    const arregloDeArreglos: Paises[] = []

    const LONGITUD_PEDAZOS = 10; 

    
        for (let i = 0; i < countries.length; i += LONGITUD_PEDAZOS) {
            let paginas: Paises[] = countries.slice(i, i + LONGITUD_PEDAZOS);
            arregloDeArreglos.push(paginas[page]);

        }
        
   const ordenarFiltrar = () => {
       
        const filtrados = arregloDeArreglos.filter(element => element.country.includes(capitalize(search)));
        return filtrados
       
   }

    
   const filOrd = ordenarFiltrar()
    

    const onSearchChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setSearch(target.value)
    }

    console.log(filOrd.length)

    const renderItem = (pais: Paises) => {
       return( 
            <TableRow key={pais.country}>
                <TableCell align="left">{pais.country}</TableCell>
                <TableCell align="center">{pais.alpha_two_code}</TableCell>
                <TableCell align="center"><ReactCountryFlag style={{width:10, height:10}} countryCode={pais.alpha_two_code}/></TableCell>
                <TableCell align="center"><Link to={`/universidades?name=middle&amp;country=${pais.country}`} >Ver Universidades</Link></TableCell>
            </TableRow>
         )
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
        <div className="container" >

            <div>
                {
                    loading === true ?
                    <div className="alert alert-primary mt-300"> Cargando paises, espere por favor</div>:
                    ''
                }
            </div>
            
        
        <h1 className="text-center">Paises</h1>

        
           
        <Table aria-label="customized table">
        
            <TableHead className='bg-primary text-light'>
            <TableRow className='text-light'>
                <TableCell className='text-light'  align="left">Pais &nbsp;
                    <button style={{
                        color: '#fff',fontWeight: 'bold', 
                        fontSize:25, backgroundColor: 'blue', 
                        border: 'none'}} onClick={ordenAcendente}>↑↓
                    </button>
                </TableCell>
                <TableCell className='text-light'align="center" >Acronimo</TableCell>
                <TableCell className='text-light' align="center">Bandera</TableCell>
                <TableCell className='text-light' style={{width:30}} align="center">
                    <input
                        placeholder="buscar pais"
                        value={search}
                        onChange={onSearchChange}
                        style={{borderRadius: 10, border: 'none'}}
                    />
                </TableCell>
            
            </TableRow>
            
            </TableHead>
            <TableBody>
            {
                orden()
            }  
            </TableBody>

           
                
      </Table>
      <Pagination
                count={4}
                color="primary"
                shape="rounded"

                hideNextButton={true}
                hidePrevButton={true}
                onChange={(event,value) =>{setPage(value - 1)}}
            />
      
        </div>
    )
}

export default LandingPage


