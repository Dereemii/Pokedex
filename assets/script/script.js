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
                <div>ID: ${personaje.id}</div>
                <div>Tipo: ${personaje.types[0].type.name}</div>
                <div>Peso: ${personaje.weight}</div>
                <div>Altura: ${personaje.height}</div>
            </span>   `
                //Grafico CANVAS
    var hp =  personaje.stats[0].base_stat;
    var atk = personaje.stats[1].base_stat;
    var def = personaje.stats[2].base_stat;
    var sat = personaje.stats[3].base_stat;
    var sdf = personaje.stats[4].base_stat;
    var spd = personaje.stats[5].base_stat;
    var pokest = [];
     pokest.push(hp, atk, def, sat, sdf, spd);


      var chart = new CanvasJS.Chart("pokemon-grafico", { 
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title:{
          text: "Stats"
        },
        data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: "column",
          dataPoints: [
            { label: "HP",  y:parseFloat(hp)  },
            { label: "Ataque", y: parseFloat(atk)  },
            { label: "Defensa", y: parseFloat(def) },
            { label: "Ataque Especial",  y: parseFloat(sat) },
            { label: "Defensa Especial",  y: parseFloat(sdf)  },
            { label: "Velocidad",  y: parseFloat(spd)  }
          ]
        }
        ]
      });
      chart.render();
  return pokecard; 
}

 validacion =(id)=>{
 if(id >807 || id <0 || id ==="") {
        alert("Solo numeros del 1 - 807")
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