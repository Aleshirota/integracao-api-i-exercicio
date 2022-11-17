import React, {  useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios"

function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [nome, setNome] = useState("")

    const getAllPlaylists = () =>{
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
          headers:{
            Authorization: "Shirota-ammalA"
          }
        })
        .then((resposta)=>{
          setPlaylists(resposta.data.result.list)
        })
        .catch((erro)=>{
          console.log(erro)
        })
      }
      useEffect(()=>{
        getAllPlaylists()
      },[])
    
    const criaPlaylist = ()=>{
         const body = {
             name: nome
         }

         const headers= {
             headers:{
                 Authorization: "Shirota-ammalA"
             }
         }

         axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", body, headers)
         .then((resposta)=>{
            console.log(resposta)
         })
         .catch((erro)=>{
            console.log(erro)
         })
     }
  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas 
                key={playlist.id} 
                playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;
