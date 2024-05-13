function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
     
     // Perbaikan penggunaan removeItem
}

$(document).ready(function() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html"; // Alihkan ke login jika tidak login
    } else {
        var userEmail = localStorage.getItem("userEmail");

        // Tampilkan loading spinner dan sembunyikan tabel
        $('#loading').show();
        $('#userTable').hide();

        // Ambil data pengguna menggunakan AJAX
        $.ajax({
            url: `https://script.google.com/macros/s/AKfycbwnzRlqT194nt0Jm7aW3gnbfPpm8nZYyuzkzG1qceiplughUTufvUflBzqlV7wtV1QV/exec?id=${userEmail}`,
            type: 'GET',
            success: function(response) {
                if (response.output) {
                    var userData = response.output[0];
                    //localStorage.setItem("userFoto", userData.foto); // Simpan URL foto ke localStorage


  //localStorage.setItem("guestLink", userData.linktamu); // Simpan URL tamu ke localStorage

//localStorage.setItem("linkWebsite", userData.linkwebsite); // Simpan URL website ke localStorage
                    
                    
                    // Ganti profil image di navbar
                    $('#profileImage').attr('src', userData.foto).addClass("profile-image");
$('#nama').text(userData.namapasangan);

                    $('#profileCard').attr('src', userData.foto).addClass("profile-card");
                    $('#nama').text(userData.namapasangan);
                    
                    $('#namapas').text(userData.namapasangan);
                    $('#namainput').val(userData.nama);
                    $('#emailinput').val(userData.email);
                    $('#linkwebsite').val(userData.linkwebsite);
                    
                   // Mengambil data dari API
                   fetch('https://qobilto.my.id/alakadar.json')
                   .then(response => response.json())
                   .then(data => {
                   // Mengisi detail paket
                   document.getElementById('namapaket').textContent = data.namapaket;
                   document.getElementById('hargapaket').textContent = data.hargapaket;
                   document.getElementById('masaaktif').textContent = '' + data.masaaktif;
                   
                   const itempaket = document.getElementById('itempaket');
                   
                   // Buat string HTML untuk daftar item
                   let itemHtml = '';
                   data.itempaket.forEach(item => {
                   itemHtml += `
                   
                   <div class="image-with-text mt-5 subtitle">
                   <img src="images/check.png" alt="Icon"> <!-- Placeholder image -->
                   <span>${item.item}</span>
                   </div>
                  
                  `;
                   });
                   
                   // Sisipkan HTML ke dalam div
                   itempaket.insertAdjacentHTML('beforeend', itemHtml);
                   })
                   .catch(error => console.error('Error fetching data:', error));
 




                    var linkTamu = userData.linktamu;
                    //fetch(`${linkTamu}?action=read`, { method: 'GET' 
                    //})
                        //.then(response => response.json())
                        //.then(data => {
                            //if (data.records) {
                                //let totalGuests = data.records.length; // Hitung total tamu
                                //$('#guestCount').text(totalGuests + ' Orang'); // Tampilkan total tamu di Card 1
                            //}
                        //})
                        //.catch(error => {
                            //console.error("Error retrieving guest data:", error);
                    //});
                        
                   
                   
                   
                   
                   

                }
            },
            error: function(xhr, status, error) {
                console.error("Error retrieving user data:", error);
            }
        });
    }
});