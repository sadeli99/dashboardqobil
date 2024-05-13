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
                    localStorage.setItem("userFoto", userData.foto); // Simpan URL foto ke localStorage

localStorage.setItem("guestLink", userData.linktamu); // Simpan URL tamu ke localStorage

localStorage.setItem("linkWebsite", userData.linkwebsite); // Simpan URL website ke localStorage
                    
                    
                    // Ganti profil image di navbar
                    $('#profileImage').attr('src', userData.foto).addClass("profile-image");
$('#nama').text(userData.namapasangan);

                    // Dapatkan tanggal masa aktif dalam format Indonesia
                    var masaAktif = new Date(userData.masaaktif * 1000);
                    var masaAktifString = masaAktif.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                    
                    // Tampilkan tanggal masa aktif di Card 2
                    $('#masaAktif').text(masaAktifString);

                    // Tambahkan countdown ke Card 3
                    var countdownElement = document.getElementById('countdown');

                    // Fungsi untuk menghitung mundur
                    function updateCountdown() {
                        var now = new Date().getTime();
                        var timeLeft = masaAktif.getTime() - now;

                        if (timeLeft > 0) {
                            var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                            var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                            countdownElement.textContent = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
                        } else {
                            countdownElement.textContent = "Waktu telah habis";
                            $('#masaAktifHabisModal').modal('show'); // Tampilkan modal dialog
                            clearInterval(countdownInterval); // Hentikan interval
                        }
                    }

                    // Set interval untuk update setiap detik
                    var countdownInterval = setInterval(updateCountdown, 1000);




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
                        
                   
                   // Fetch data untuk menghitung kehadiran
                   fetch(`${linkTamu}?action=read`)
                   .then(response => response.json())
                   .then(data => {
                   let records = data.records;
                   
                   if (Array.isArray(records)) {
                   // Hitung jumlah kehadiran
                   let hadir = records.filter(record => record.kehadiran === 'Hadir').length;
                   let berhalangan = records.filter(record => record.kehadiran === 'Berhalangan').length;
                   let tidakMenjawab = records.filter(record => record.kehadiran === 'Konfirmasi kehadiran').length;
                   
                   // Isi teks card dengan jumlah yang dihitung
                   document.getElementById('hadir-count').innerText = `${hadir} Orang`;
                   document.getElementById('berhalangan-count').innerText = `${berhalangan} Orang`;
                   document.getElementById('tidak-menjawab-count').innerText = `${tidakMenjawab} Orang`;
                   } else {
                   console.error("Data kehadiran tidak dalam format array.");
                   }
                   })
                   .catch(error => {
                   console.error('Error fetching data:', error);
                   });
                   
                   
                   

                }
            },
            error: function(xhr, status, error) {
                console.error("Error retrieving user data:", error);
            }
        });
    }
});