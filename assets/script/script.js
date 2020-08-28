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
      //imprimir data
      $("#card").append(generarCard(response));
      console.log(generarCard(response));
    },
  });
};

 generarCard =(personaje) =>{
  var card = `
    <div class="col-sm-12 col-md-4"
        <div class="card" style="width: 50%;">
            <img src="${personaje.sprites.front_default}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <div>Weight: ${personaje.weight}</div>
                <div>Weight: ${personaje.height}</div>
                <div>Type: ${personaje.types[0].type.name}</div>
            </div>
        </div>
    </div>`;
  return card;
};

 validacion =(id)=>{
    var expresion = /\b([1-9]|[1-9][0-9]|1[01][0-9]|15[0-1]|14[0-9]|13[0-9])\b/;  //regex para 151 pokemon
    if(!expresion.test(id)){
        alert("Solo numeros del 1 - 151");
        $("input_busqueda").focus();
        return false
    }
    return true;
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
  $("#card").empty();
  $("#input_busqueda").focus();
}