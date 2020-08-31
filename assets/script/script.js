$(function () {
  $("#buscar").click((e) => {
      buscarPersonaje();
  })

  $("#limpiar").click(e=>{
    limpiar();
  })

  //Tecla enter detectar
  $(document).keypress(function (e) { 
      if(e.which == 13){
          buscarPersonaje();
      }
  });
});

function getPersonaje(id) {
  $.ajax({
    type: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    success: function (response) {
      console.log("response=>", response);
      $("#pokecard").empty();
      $("#pokecard").append(generarCard(response));
      console.log(generarCard(response));
    },
  });
};

generarCard =(personaje) =>{
  var pokecard = `
            <span class="d-inline-block bg-light m-0">
                <img class="pokeImg" src="${personaje.sprites.front_default}" >
            </span>
            <span class="d-inline-block bg-light m-0">
                <div class="tituloPoke">${personaje.name}</div>
                <div>Tipo: ${personaje.types[0].type.name}</div>
                <div>Peso: ${personaje.weight}</div>
                <div>Altura: ${personaje.height}</div>
            </span>   
            
            
            `
            ;
  return pokecard; 
}

 validacion =(id)=>{
 if(id >807 || id <0 || id ==="") {
        alert("Solo numeros del 1 - 151")
        $("input_busqueda").focus();
      }
      else{
        return true 
      }

};

buscarPersonaje =() => {
    var id_personaje = $("#input_busqueda").val();
    //validación
    if(validacion(id_personaje)){
        getPersonaje(id_personaje);
        $("#input_busqueda").val("");
        $("#input_busqueda").focus();
    }
};

 limpiar =() =>{
  $("#pokecard").empty();
  $("#input_busqueda").focus();
}