//JavaScript code for two sprint application
(function(){

    /*
       readJSONFrom(url)
       lee los datos del archivo json y estos se los pasa a la función cards(data)
     */
     function readJSONFrom(url) {
        return fetch(url)
            .then(response => response.json())
            .then(cards);
     }

     /*
        cards(data)
        los datos del json se almacenan en un objeto creando propiedades, ademas invocar la funcion
        viewProfiles(objects,content) y realizar la actualizacion de perfiles, usando la funcion
        search(objects)
     */
     function cards(data) {
         const nameSearch = document.querySelector('#txtNameProfile');
         const content = document.querySelector('.content-carrusel-cards');
         const btnSearch =document.querySelector('#btn-show-filters');

         const objects = data.map( profiles => {
             if(profiles.hasOwnProperty("noPerfil")) {
                 return {
                     profileNumber : profiles.noPerfil,
                     name : profiles.nombre,
                     age : profiles.edad,
                     description : profiles.descripcion,
                     position : profiles.puesto,
                     cell : profiles.celula,
                     skillSet : profiles.skills,
                     profileImage : profiles.fotos.perfil,
                     avatarImage : profiles.fotos.avatar,
                     representativeImage: profiles.fotos.representativa,
                     hobbies : profiles.gustos.personales,
                     professionalInterests : profiles.gustos.profesionales,
                     userFacebook : profiles.mediosContacto.facebook,
                     userTwitter : profiles.mediosContacto.twitter,
                     userInstagram : profiles.mediosContacto.instagram
                }
            }
         })

         viewProfiles(objects,content);

         nameSearch.addEventListener('keyup',function(e){

             content.innerHTML = '';
             const profileFilter = search(objects);
             if(profileFilter.length >0){
              viewProfiles(profileFilter,content);
             }else{
               content.innerHTML+=`<h1>doesn't exist profile</h1>`;
             }
         })
     }


    /*
      search(profiles)
      Realiza la busqueda de los objetos de acuerdo a lo que se escriba en la caja de texto,
      regresa el resultado en un nuevo objeto
    */
     function search(profiles){
         let nameSearch = document.querySelector('#txtNameProfile').value;
         nameSearch = nameSearch.toLowerCase();
         const cellSearch = document.querySelector('#selectteam').value;
         const profileFilter = profiles.filter(profile => {
             return profile.name.indexOf(nameSearch) >-1 || profile.cell.indexOf(nameSearch) >-1 || profile.position.indexOf(nameSearch)>-1;
         })
         return profileFilter;
     }

     /*
       viewProfiles(data,content)
       Pinta la información en la vista
     */
     function viewProfiles(data,content) {
         data.forEach(element => {
           firstName = element.name.split(' ');
           firstName = firstName[0].toUpperCase()+" "+firstName[1].toUpperCase();
             content.innerHTML+=`

             <div class="wrap">
                <div class="tarjeta-wrap">
                  <div class="tarjeta">
                    <div class="adelante card1">
                      <img src="${element.profileImage}" alt="profile" class="img-profile">
                       <div class="information-basic">
                         <h4 id="profile_name" class="profile-elements item_name">${firstName}</h4>
                         <p id="profile_puesto" class="profile-elements item_puesto">${element.position}</p>
                         <p id="profile_team" class="profile-elements item_team">${element.cell}</p>
                         <p id="profile_age" class="profile-elements item_age">${element.age} años.</p>
                       </div>
                    </div>
                    <div class="back-card">
                        <img src="${element.representativeImage}" alt="" class="representative-photo" id="representativePhoto">
                        <p><span class="titles-information-card" id="showHideDescription">&#62;Descripción</span>
                        <span id="profile-descripción">${element.description}</span></p>
                        <p><!-- Desplgear gustos -->
                          <span class="titles-information-card"  id="showHideLikes">&#62; Gustos</span>
                        </p>
                        <div class="show-my-likes"><!-- Lo que se mostrará  -->
                              <ul id="likes-profiles">
                                <!---->
                              </ul>
                        </div>
                          <p><!--Desplegar los skills-->
                              <span class="titles-information-card"  id="showHideSkills">&#62; Skills</span>
                          </p>
                        <div class="show-my-skills">
                            <ul id="skills-profile">
                              <!---->
                            </ul>
                        </div>
                        <p>
                          <span class="titles-information-card">&#62; Contacto</span>
                        </p>
                        <div class="content-social-networks">
                                    <span class="icons-networks"><img src="https://www.gratistodo.com/wp-content/uploads/2016/11/pikachu-1-800x533.jpg"></span>
                                    <span class="icons-networks"><img src="https://www.gratistodo.com/wp-content/uploads/2016/11/pikachu-1-800x533.jpg"> </span>
                                    <span class="icons-networks"><img src="https://www.gratistodo.com/wp-content/uploads/2016/11/pikachu-1-800x533.jpg"> </span>
                                    <span class="icons-networks"><img src="https://www.gratistodo.com/wp-content/uploads/2016/11/pikachu-1-800x533.jpg"> </span>
                        </div>
                    </div>
                  </div>
                </div>
            </div>

             `;
         });
     }

     readJSONFrom('http://localhost:3000/perfil');
})();
