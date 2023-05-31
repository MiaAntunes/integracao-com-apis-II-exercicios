import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { AUTH_TOKEN } from "../../constants/AUTH_TOKEN";

function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [nome, setNome] = useState("")

    // Não esqueça do useefect
    useEffect(()=>{
        receberPlaylist()
    },[])

    const receberPlaylist = async () =>{
        try{
            const resposta = await axios.get(`${BASE_URL}`,{
                headers:{
                    Authorization: AUTH_TOKEN
                }
            })
            console.log(resposta.data.result.list)
            // Para receber a resposta coloca o que está mapeando, no caso o playist
            setPlaylists(resposta.data.result.list)
        }
        catch(erro){
            console.log(erro)
        }
    }
    const pesquisarPlayist = async () =>{
        try{
            const resposta = await axios.get(`${BASE_URL}/search?name=${nome}`, {
                headers: {
                    Authorization: AUTH_TOKEN
                }
            })
            console.log(resposta.data.result.playlist)
            setPlaylists(resposta.data.result.playlist)
        }
        catch(error){
            console.log(error.resposta)
        }
    }

    const deletarPlayist = async (playlistId) =>{
        try{
            const resposta = await axios.delete(`${BASE_URL}/${playlistId}`, {
            headers: {
                Authorization: AUTH_TOKEN
            }
        })
        console.log(resposta)
        receberPlaylist()
        }
        catch(error){
            console.log(error)
        }
    } 

    return (
        <div>
            <div>
                <label>Nome:</label>
                <input type="text" value={nome} onChange={(event)=>setNome(event.target.value)}/>
                <button onClick={pesquisarPlayist}>Pesquisar</button>
            </div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} receberPlayist={receberPlaylist} playlist={playlist} deletarPlayist={deletarPlayist}/>
            })}

        </div>
    );
}

export default Playlists;
