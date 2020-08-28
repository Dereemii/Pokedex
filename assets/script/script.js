$(function () {
  $("#buscar").click((e) => {
      buscarPersonaje();
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

function generarCard(personaje) {
  var card = `
    <div class="col-sm-12 col-md-4"
        <div class="card" style="width: 20%;">
            <img src="${personaje.sprites.front_default}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <div>Weight: ${personaje.weight}</div>
            </div>
        </div>
    </div>`;
  return card;
};

function validacion(id){
    var expresion = /\b([1-9]|[1-9][0-9]|1[01][0-9]|15[1])\b/;  //regex para 151 pokemon
    if(!expresion.test(id)){
        alert("input invalido");
        $("input_busqueda").focus();
        return false
    }
    return true;
};

function buscarPersonaje() {
    var id_personaje = $("#input_busqueda").val();
    //validación
    if(validacion(id_personaje)){
        getPersonaje(id_personaje);
        $("#input_busqueda").val("");
        $("#input_busqueda").focus();
    }
};

