
//api katalog

 async function getUsers() {
 
 let url = 'https://qobilto.my.id/katalog.json';

 try {
 
 let res = await fetch(url);
 return await res.json();

 } catch (error) {
 
 console.log(error);
 
    }
}
 
 async function renderUsers() {
 let users = await getUsers();
 let html = '';
 
 users.map(katalogs => {
 let htmlSegment = `
 
 <!-- Kartu 1 -->
 <div class="col">
 <div class="card custom-card1">
 <img src="${katalogs.thumb}" class="card-img-top" alt="Card Image 1">
 <div class="card-body">
 <h5 class="card-title" style="white-space: nowrap; margin-right: 40px;">${katalogs.title}</h5>
 <div>
 <a href="#" class="custom-button-pesan">Pesan
 <i class="bi bi-arrow-up-right-circle-fill" style="font-size: 22px;"></i>
 </a>
 <a href="#" class="custom-button-demo mt-2">Preview
 <i class="bi bi-arrow-up-right-circle-fill" style="font-size: 22px;"></i>
 </a>
 </div>
 </div>
 </div>
 </div>
 

 `;
 html += htmlSegment;
 });
 
document.getElementById('listkatalog').innerHTML = html;

 }
 
 
 renderUsers();
 
 
 //api testimoni
 
 async function getUserstesti() {
 
 let urltesti = 'https://qobilto.my.id/testmoni.json';
 
 try {
 
 let res = await fetch(urltesti);
 return await res.json();
 
 } catch (error) {
 
 console.log(error);
 
 }
 }
 
 async function renderUserstesti() {
 let userstesti = await getUserstesti();
 let htmltesti = '';
 
 userstesti.map(testipost => {
 let htmlSegmenttesti = `
      <div class="swiper-slide">
      <div class="card1-testi">
      <div class="ceritaku-text">
      <div class="shadows shadows--bottom"></div>
      <div class="ceritaku-content">
      <h5 class="text-testi">${testipost.ucapan}</h5>
      </div>
      </div>
      
      <div class="profile1">
      <div class="profile-image1">
      <img src="${testipost.avatar}" alt="Gambar Pengantin">
      </div>
      
      <div class="profile-container1">
      <h3>${testipost.nama}</h3>
      <p style="color: #ADABAB;">${testipost.subnama}</p>
      </div>
      </div>
      </div>
      </div>
 
 
 `;
 htmltesti += htmlSegmenttesti;
 });
 
 document.getElementById('listtestimoni').innerHTML = htmltesti;
 
 
 }
 
 renderUserstesti();