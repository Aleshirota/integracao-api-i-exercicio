import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nome, setNome] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")

    const getPlaylistTracks = ()=>{

        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,{
            headers:{
                Authorization: "Shirota-ammalA"
            }
        })
        .then((resposta)=>{
            setMusicas(resposta.data.result.tracks)
            
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }
    useEffect(()=>{
        getPlaylistTracks()
    },[])

    const addTrackToPlaylist = ()=>{
        const body = {
            name: nome,
            artist: artista,
            url: url
        }
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, {
            headers:{
                Authorization: "Shirota-ammalA"
            }
        })
        .then((resposta)=>{
            console.log(resposta)
            getPlaylistTracks()
        })
        .catch((erro)=>{
            console.log(erro.response.data)
        })
    }

    const removeTrackFromPlaylist = (id)=>{
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,{
            headers:{
                Authorization: "Shirota-ammalA"
            }
        })
        .then((resposta)=>{
            console.log(resposta)
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
             {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>)
            })} 
            <ContainerInputs>
                <InputMusica 
                placeholder="artista" 
                value={artista}
                onChange={(event)=>setArtista(event.target.value)}
                />
                <InputMusica placeholder="musica" 
                value={nome}
                onChange={(event)=>setNome(event.target.value)}
                />
                <InputMusica placeholder="url" 
                value={url}
                onChange={(event)=>setUrl(event.target.value)}
                />
                <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

