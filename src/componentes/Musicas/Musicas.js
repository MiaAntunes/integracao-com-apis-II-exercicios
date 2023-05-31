import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios';
import { BASE_URL } from "../../constants/BASE_URL";
import { AUTH_TOKEN } from "../../constants/AUTH_TOKEN";

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [name, setName] = useState("")
    const [artist, setArtist] = useState("")
    const [url, setUrl] = useState("")

    useEffect(()=>{
        receberAMusica()
    },[])

    const receberAMusica = async () =>{
        try{
            const resposta = await axios.get(`${BASE_URL}/${props.playlist.id}/tracks`,{
                headers:{
                    Authorization: AUTH_TOKEN
                }
            })
            console.log(resposta.data.result.tracks)
            setMusicas(resposta.data.result.tracks)
        }
        catch(erro){
            console.log(erro)
        }
    }

    const adicionarMusica = async () =>{
       try{
        const body = {
            name: name,
            artist: artist,
            url: url
        };
        const resposta = await axios.post(`${BASE_URL}/${props.playlist.id}/tracks`,body, {
            headers:{
                Authorization: AUTH_TOKEN
            }
        })
        console.log(resposta.data)
        receberAMusica()
        setArtist("")
        setName("")
        setUrl("")
       }
       catch(error){
        console.log(error)
       }
    }

    const deleteMusica = async (playlistId, musicaId) =>{
        try{
            const resposta = await axios.delete(`${BASE_URL}/${playlistId}/tracks/${musicaId}`, {
                headers: {
                    Authorization: AUTH_TOKEN
                }
            })
            console.log(resposta)
            receberAMusica()
        }
        catch(erro){
            console.log(erro)
        }
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            <button onClick={()=>props.deletarPlayist(props.playlist.id)}>X</button>
            {musicas.map((musica) => {
                console.log(musica)
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>deleteMusica(props.playlist.id, musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica value={artist} onChange={(event)=>setArtist(event.target.value)} placeholder="artista" />
                <InputMusica  value={name} onChange={(event)=>setName(event.target.value)} placeholder="musica" />
                <InputMusica  value={url} onChange={(event)=>setUrl(event.target.value)} 
                placeholder="url" />
                <Botao onClick={adicionarMusica}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

