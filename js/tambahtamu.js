function logout() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userFoto");
        localStorage.removeItem("guestLink");
        localStorage.removeItem("linkWebsite");
        
        // Perbaikan penggunaan removeItem
        }
        
        
        $(document).ready(function() {
        var userFoto = localStorage.getItem("userFoto"); // Ambil URL foto dari localStorage
        if (userFoto) { // Jika data tersedia
        $('#profileImage').attr('src', userFoto); // Setel URL gambar
        } else {
        console.warn("No photo URL found in localStorage");
          }
        });
        
        
        $(document).ready(function() {
        if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html"; // Alihkan ke login jika tidak login
        } else {
        var userEmail = localStorage.getItem("userEmail");
        //$('#userEmail').text(userEmail);
        
        }
        });
        
        
        
        
        function setInitialContent() {
            var userWebsite = localStorage.getItem("linkWebsite"); 
            
            //$('#link').text(userWebsite);
            var defaultUrl = userWebsite + "?to=";
            var defaultTemplate = `
Kepada Yth.
Bapa/Ibu/Saudara/i
*{nama_tamu}*
_di tempat_

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Resepsi Pernikahan Kami

*Mempelai Pria & Wanita*

* Hari/Tgl : 
* Pukul : 
* Tempat :

Info lebih lengkap klik link di bawah ini 👇👇👇
${defaultUrl}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Kami yang berbahagia,
*Keluarga Kedua Mempelai*

Mohon maaf perihal undangan hanya dibagikan melalui pesan ini dikarenakan keterbatasan jarak dan waktu.
`;

            document.getElementById("templatePesan").value = defaultTemplate;
            document.getElementById("urlAcara").value = defaultUrl;
        }

        function updateTemplate() {
            var userWebsite = localStorage.getItem("linkWebsite"); 
         
            var namaTamu = document.getElementById("namaTamu").value;
            var urlAcara = userWebsite + "?to=" + encodeURIComponent(namaTamu);

            var updatedTemplate = `
Kepada Yth.
Bapa/Ibu/Saudara/i
*${namaTamu}*
_di tempat_

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i uuntuk menghadiri acara Resepsi Pernikahan Kami

*Mempelai Pria & Wanita*

* Hari/Tgl : 
* Pukul : 
* Tempat :

Info lebih lengkap klik link di bawah ini 👇👇👇
${urlAcara}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Kami yang berbahagia,
*Keluarga Kedua Mempelai*

Mohon maaf perihal undangan hanya dibagikan melalui pesan ini dikarenakan keterbatasan jarak dan waktu.
`;

            document.getElementById("templatePesan").value = updatedTemplate;
            document.getElementById("urlAcara").value = urlAcara;
        }

        function copyToClipboard() {
            var userWebsite = localStorage.getItem("linkWebsite"); 
            var templatePesan = document.getElementById("templatePesan");
            templatePesan.select();
            document.execCommand("copy");
            alert("Pesan undangan telah disalin ke clipboard");

            document.getElementById("namaTamu").value = "";
            document.getElementById("urlAcara").value = userWebsite + "?to=";
        }

        function shareInvitation() {
            var templatePesan = document.getElementById("templatePesan").value;

            if (navigator.share) {
                navigator.share({
                    title: 'Undangan Resepsi Pernikahan',
                    text: templatePesan,
                    url: document.getElementById("urlAcara").value
                })
                .then(() => console.log('Berhasil berbagi'))
                .catch((error) => console.log('Gagal berbagi:', error));
            } else {
                alert("Fitur berbagi tidak didukung di browser Anda.");
            }
        }
        
        
        
        var modal = document.getElementById("fullscreenModal");
        modal.addEventListener("shown.bs.modal", setInitialContent);